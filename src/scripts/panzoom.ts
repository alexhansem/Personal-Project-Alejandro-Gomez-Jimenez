/**
 * Zoom y desplazamiento para planos e imágenes técnicas.
 *
 * Se cambia el tamaño real del elemento (no `transform: scale`) para que el
 * navegador vuelva a dibujar SVG y PDF nítidos a cualquier ampliación.
 * Admite rueda, arrastre, pellizco en pantallas táctiles, doble clic y teclado.
 */

export interface PanZoomOptions {
  /** Ampliación máxima respecto al tamaño natural. */
  maxScale?: number;
  /** Se llama cuando el zoom se detiene (para volver a renderizar un PDF, por ejemplo). */
  onZoomEnd?: (scale: number) => void;
  /** Se llama en cada cambio. */
  onChange?: (state: { scale: number; fitScale: number }) => void;
}

export class PanZoom {
  private stage: HTMLElement;
  private content: HTMLElement;
  private opts: PanZoomOptions;
  private baseW = 1;
  private baseH = 1;
  private _scale = 1;
  private fitScale = 1;
  private tx = 0;
  private ty = 0;
  private pointers = new Map<number, { x: number; y: number }>();
  private pinchStart: { dist: number; scale: number; cx: number; cy: number } | null = null;
  private dragStart: { x: number; y: number; tx: number; ty: number } | null = null;
  private zoomEndTimer: number | undefined;
  private ro: ResizeObserver;
  private fitted = true;
  private abort = new AbortController();

  constructor(stage: HTMLElement, content: HTMLElement, opts: PanZoomOptions = {}) {
    this.stage = stage;
    this.content = content;
    this.opts = opts;
    const signal = this.abort.signal;

    content.style.position = 'absolute';
    content.style.left = '0';
    content.style.top = '0';
    content.style.transformOrigin = '0 0';
    stage.style.touchAction = 'none';

    stage.addEventListener('wheel', (e) => this.onWheel(e), { passive: false, signal });
    stage.addEventListener('pointerdown', (e) => this.onPointerDown(e), { signal });
    stage.addEventListener('pointermove', (e) => this.onPointerMove(e), { signal });
    stage.addEventListener('pointerup', (e) => this.onPointerUp(e), { signal });
    stage.addEventListener('pointercancel', (e) => this.onPointerUp(e), { signal });
    stage.addEventListener('dblclick', (e) => this.onDoubleClick(e), { signal });

    this.ro = new ResizeObserver(() => {
      const prevFit = this.fitScale;
      this.computeFit();
      if (this.fitted || this._scale < this.fitScale) this.fit();
      else if (prevFit !== this.fitScale) this.apply();
    });
    this.ro.observe(stage);
  }

  get scale(): number {
    return this._scale;
  }

  setContentSize(w: number, h: number): void {
    this.baseW = Math.max(1, w);
    this.baseH = Math.max(1, h);
    this.computeFit();
    this.fit();
  }

  private get maxScale(): number {
    return Math.max(this.opts.maxScale ?? 4, this.fitScale * 2);
  }

  private get minScale(): number {
    return Math.min(this.fitScale, 1) * 0.5;
  }

  private computeFit(): void {
    const r = this.stage.getBoundingClientRect();
    const pad = 24;
    const sw = Math.max(1, r.width - pad * 2);
    const sh = Math.max(1, r.height - pad * 2);
    this.fitScale = Math.min(sw / this.baseW, sh / this.baseH);
  }

  fit(): void {
    this.fitted = true;
    this._scale = this.fitScale;
    this.center();
    this.apply();
    this.scheduleZoomEnd();
  }

  /** Tamaño natural (1 píxel de imagen = 1 píxel de pantalla). */
  actual(): void {
    const r = this.stage.getBoundingClientRect();
    this.zoomTo(1, r.width / 2, r.height / 2);
  }

  zoomBy(factor: number, cx?: number, cy?: number): void {
    const r = this.stage.getBoundingClientRect();
    this.zoomTo(this._scale * factor, cx ?? r.width / 2, cy ?? r.height / 2);
  }

  /** Zoom manteniendo fijo el punto (cx, cy) de la pantalla. */
  zoomTo(next: number, cx: number, cy: number): void {
    const s = Math.min(this.maxScale, Math.max(this.minScale, next));
    const k = s / this._scale;
    this.tx = cx - (cx - this.tx) * k;
    this.ty = cy - (cy - this.ty) * k;
    this._scale = s;
    this.fitted = Math.abs(s - this.fitScale) < 1e-3;
    this.apply();
    this.scheduleZoomEnd();
  }

  pan(dx: number, dy: number): void {
    this.tx += dx;
    this.ty += dy;
    this.apply();
  }

  private center(): void {
    const r = this.stage.getBoundingClientRect();
    this.tx = (r.width - this.baseW * this._scale) / 2;
    this.ty = (r.height - this.baseH * this._scale) / 2;
  }

  private clamp(): void {
    const r = this.stage.getBoundingClientRect();
    const w = this.baseW * this._scale;
    const h = this.baseH * this._scale;
    const margin = 24;
    if (w <= r.width) this.tx = (r.width - w) / 2;
    else this.tx = Math.min(margin, Math.max(r.width - w - margin, this.tx));
    if (h <= r.height) this.ty = (r.height - h) / 2;
    else this.ty = Math.min(margin, Math.max(r.height - h - margin, this.ty));
  }

  private apply(): void {
    this.clamp();
    const w = this.baseW * this._scale;
    const h = this.baseH * this._scale;
    this.content.style.width = `${w}px`;
    this.content.style.height = `${h}px`;
    this.content.style.transform = `translate3d(${this.tx}px, ${this.ty}px, 0)`;
    const zoomable = this.maxScale > this.fitScale * 1.01;
    this.stage.dataset.zoomed = String(!this.fitted && zoomable);
    this.opts.onChange?.({ scale: this._scale, fitScale: this.fitScale });
  }

  private scheduleZoomEnd(): void {
    window.clearTimeout(this.zoomEndTimer);
    this.zoomEndTimer = window.setTimeout(() => this.opts.onZoomEnd?.(this._scale), 180);
  }

  private local(e: { clientX: number; clientY: number }): { x: number; y: number } {
    const r = this.stage.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();
    const p = this.local(e);
    if (e.ctrlKey || e.metaKey || Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
      // Rueda o pellizco del trackpad: zoom.
      const unit = e.deltaMode === 1 ? 16 : 1;
      const factor = Math.exp((-e.deltaY * unit) / (e.ctrlKey ? 100 : 400));
      this.zoomTo(this._scale * factor, p.x, p.y);
    } else {
      this.pan(-e.deltaX, -e.deltaY);
    }
  }

  private onPointerDown(e: PointerEvent): void {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button, a')) return;
    this.stage.setPointerCapture(e.pointerId);
    this.pointers.set(e.pointerId, this.local(e));
    if (this.pointers.size === 1) {
      const p = this.local(e);
      this.dragStart = { x: p.x, y: p.y, tx: this.tx, ty: this.ty };
      this.stage.dataset.dragging = 'true';
    } else if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      this.pinchStart = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        scale: this._scale,
        cx: (a.x + b.x) / 2,
        cy: (a.y + b.y) / 2,
      };
      this.dragStart = null;
    }
  }

  private onPointerMove(e: PointerEvent): void {
    if (!this.pointers.has(e.pointerId)) return;
    this.pointers.set(e.pointerId, this.local(e));
    if (this.pinchStart && this.pointers.size >= 2) {
      const [a, b] = [...this.pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const cx = (a.x + b.x) / 2;
      const cy = (a.y + b.y) / 2;
      this.zoomTo(this.pinchStart.scale * (dist / this.pinchStart.dist), cx, cy);
    } else if (this.dragStart) {
      const p = this.local(e);
      this.tx = this.dragStart.tx + (p.x - this.dragStart.x);
      this.ty = this.dragStart.ty + (p.y - this.dragStart.y);
      this.apply();
    }
  }

  private onPointerUp(e: PointerEvent): void {
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinchStart = null;
    if (this.pointers.size === 0) {
      this.dragStart = null;
      delete this.stage.dataset.dragging;
    } else if (this.pointers.size === 1) {
      const [p] = [...this.pointers.values()];
      this.dragStart = { x: p.x, y: p.y, tx: this.tx, ty: this.ty };
    }
  }

  private onDoubleClick(e: MouseEvent): void {
    const p = this.local(e);
    if (this.fitted) this.zoomTo(Math.max(this.fitScale * 2.5, 1), p.x, p.y);
    else this.fit();
  }

  /** Atajos de teclado. Devuelve `true` si la tecla se ha usado. */
  handleKey(e: KeyboardEvent): boolean {
    const step = 60;
    switch (e.key) {
      case '+':
      case '=':
        this.zoomBy(1.25);
        return true;
      case '-':
      case '_':
        this.zoomBy(0.8);
        return true;
      case '0':
        this.fit();
        return true;
      case '1':
        this.actual();
        return true;
      case 'ArrowUp':
        if (this.fitted) return false;
        this.pan(0, step);
        return true;
      case 'ArrowDown':
        if (this.fitted) return false;
        this.pan(0, -step);
        return true;
      case 'ArrowLeft':
        if (this.fitted) return false;
        this.pan(step, 0);
        return true;
      case 'ArrowRight':
        if (this.fitted) return false;
        this.pan(-step, 0);
        return true;
      default:
        return false;
    }
  }

  get isFitted(): boolean {
    return this.fitted;
  }

  destroy(): void {
    this.abort.abort();
    this.ro.disconnect();
    window.clearTimeout(this.zoomEndTimer);
  }
}
