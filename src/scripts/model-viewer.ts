/**
 * Visor 3D de modelos GLB (three.js). Se importa bajo demanda desde
 * ModelViewer.astro: three.js no se descarga hasta que se abre el modelo.
 *
 * El GLB trae un nodo por planta y material con nombre `<planta>__<material>`.
 * Con eso el visor puede ocultar las plantas superiores para ver la distribución.
 */
import {
  AmbientLight,
  Box3,
  Color,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  type Object3D,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export async function mountModel(root: HTMLElement): Promise<void> {
  const stage = root.querySelector<HTMLElement>('[data-mv-stage]')!;
  const status = root.querySelector<HTMLElement>('[data-mv-status]')!;
  const order = (root.dataset.storeys ?? '').split(',').filter(Boolean);

  const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  stage.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.background = new Color(getComputedStyle(root).getPropertyValue('--mv-bg').trim() || '#f3f1ea');
  scene.add(new HemisphereLight(0xffffff, 0xb8b2a6, 1.4));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const sun = new DirectionalLight(0xffffff, 1.6);
  sun.position.set(-12, 22, 16);
  scene.add(sun);
  const fill = new DirectionalLight(0xffffff, 0.5);
  fill.position.set(14, 8, -12);
  scene.add(fill);

  const camera = new PerspectiveCamera(32, 1, 0.1, 500);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.minDistance = 4;
  controls.maxDistance = 120;

  const gltf = await new GLTFLoader().loadAsync(root.dataset.src!);
  const model = gltf.scene;
  scene.add(model);

  const byStorey = new Map<string, Object3D[]>();
  model.traverse((o) => {
    if (!(o instanceof Mesh)) return;
    const key = o.name.split('__')[0];
    if (!byStorey.has(key)) byStorey.set(key, []);
    byStorey.get(key)!.push(o);
  });

  const box = new Box3().setFromObject(model);
  const size = box.getSize(new Vector3());
  const center = box.getCenter(new Vector3());
  const radius = size.length() / 2;

  // Se dibuja solo cuando algo cambia: sin bucle continuo que gaste batería.
  let queued = false;
  const render = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      renderer.render(scene, camera);
    });
  };
  controls.addEventListener('change', render);

  // vista inicial en perspectiva desde la esquina de la fachada principal (z positivo en el GLB)
  const resetView = () => {
    // en pantallas verticales se aleja la cámara para que quepa el ancho del edificio
    const d = radius * 2.8 * Math.max(1, 1.15 / camera.aspect);
    camera.position.set(center.x - d * 0.55, center.y + d * 0.42, center.z + d * 0.75);
    controls.target.copy(center);
    camera.updateProjectionMatrix();
    controls.update();
    render();
  };

  const showUpTo = (key: string) => {
    const limit = order.indexOf(key);
    for (const [k, objs] of byStorey) {
      const i = order.indexOf(k);
      objs.forEach((o) => (o.visible = limit < 0 || i <= limit));
    }
    render();
  };

  const resize = () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  };
  new ResizeObserver(resize).observe(stage);
  resize();
  resetView();

  root.querySelector<HTMLSelectElement>('[data-mv-storeys]')?.addEventListener('change', (e) => showUpTo((e.target as HTMLSelectElement).value));
  renderer.domElement.addEventListener('dblclick', () => resetView());

  render();
  status.hidden = true;
  root.dataset.state = 'ready';
}
