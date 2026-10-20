import type { Actor, Comparison, MethodRecord, Provenance, TimeValue, WorkflowStep } from '../content/types';

const rank: Record<Provenance, number> = { medido: 0, estimado: 1, pendiente: 2 };

/** La procedencia más débil de un conjunto (un total es tan fiable como su peor sumando). */
export function weakest(...values: Provenance[]): Provenance {
  return values.reduce<Provenance>((acc, v) => (rank[v] > rank[acc] ? v : acc), 'medido');
}

export function hasValue(t: TimeValue | undefined): t is TimeValue & { minutes: number } {
  return !!t && t.provenance !== 'pendiente' && typeof t.minutes === 'number';
}

export function formatMinutes(minutes: number): string {
  const m = Math.round(minutes);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest ? `${h} h ${rest} min` : `${h} h`;
}

export function formatTime(t: TimeValue | undefined): string {
  return hasValue(t) ? formatMinutes(t.minutes) : 'Pendiente';
}

export const provenanceLabel: Record<Provenance, string> = {
  medido: 'Medido',
  estimado: 'Estimado',
  pendiente: 'Pendiente de medir',
};

/** Total de un método: el medido directamente o la suma de generación + revisión. */
export function totalOf(m: MethodRecord): TimeValue {
  if (m.total) return m.total;
  if (hasValue(m.generation) && hasValue(m.review)) {
    return {
      minutes: m.generation.minutes + m.review.minutes,
      provenance: weakest(m.generation.provenance, m.review.provenance),
      note: 'Suma de generación y revisión.',
    };
  }
  return { provenance: 'pendiente' };
}

export type ComparisonStatus = 'valida' | 'no-comparable' | 'pendiente';

export interface ComparisonResult {
  status: ComparisonStatus;
  /** Motivo legible cuando no se calcula la diferencia. */
  reason?: string;
  referenceTotal?: TimeValue;
  usedTotal: TimeValue;
  /** Minutos ahorrados (positivo) o añadidos (negativo). Solo si `status === 'valida'`. */
  differenceMinutes?: number;
  /** Variación porcentual respecto a la referencia. Solo si `status === 'valida'`. */
  differencePct?: number;
}

/**
 * Evalúa una comparativa. La diferencia y el porcentaje solo se calculan cuando
 * los dos tiempos totales existen y son medidos. Con una estimación o un dato
 * pendiente, la comparación se muestra pero sin cifras derivadas.
 */
export function evaluateComparison(c: Comparison): ComparisonResult {
  const usedTotal = totalOf(c.used);
  if (!c.reference) {
    return {
      status: 'pendiente',
      reason: 'No existe una referencia convencional medida para esta tarea.',
      usedTotal,
    };
  }
  const referenceTotal = totalOf(c.reference);
  if (!hasValue(referenceTotal) || !hasValue(usedTotal)) {
    return {
      status: 'pendiente',
      reason: 'Falta el tiempo total de uno de los dos métodos.',
      referenceTotal,
      usedTotal,
    };
  }
  if (referenceTotal.provenance !== 'medido' || usedTotal.provenance !== 'medido') {
    return {
      status: 'no-comparable',
      reason:
        'Al menos uno de los totales es una estimación. No se calcula el ahorro hasta tener ambos tiempos medidos.',
      referenceTotal,
      usedTotal,
    };
  }
  const differenceMinutes = referenceTotal.minutes - usedTotal.minutes;
  const differencePct = referenceTotal.minutes > 0 ? (differenceMinutes / referenceTotal.minutes) * 100 : undefined;
  return { status: 'valida', referenceTotal, usedTotal, differenceMinutes, differencePct };
}

export interface WorkflowSummary {
  /** Tiempo por actor (solo pasos con valor). */
  byActor: Record<Actor, number>;
  generation: TimeValue;
  review: TimeValue;
  total: TimeValue;
  /** Pasos sin tiempo registrado. */
  missing: number;
  steps: number;
}

function sumSteps(steps: WorkflowStep[]): TimeValue {
  if (!steps.length) return { provenance: 'pendiente' };
  if (steps.some((s) => !hasValue(s.time))) return { provenance: 'pendiente' };
  const values = steps.map((s) => s.time as TimeValue & { minutes: number });
  return {
    minutes: values.reduce((acc, v) => acc + v.minutes, 0),
    provenance: weakest(...values.map((v) => v.provenance)),
  };
}

/** Resume los tiempos de una secuencia de trabajo. Si falta un paso, el total queda pendiente. */
export function summarizeWorkflow(steps: WorkflowStep[]): WorkflowSummary {
  const byActor: Record<Actor, number> = { ia: 0, humano: 0, software: 0 };
  for (const s of steps) if (hasValue(s.time)) byActor[s.actor] += s.time.minutes;
  const gen = steps.filter((s) => (s.phase ?? 'generacion') === 'generacion');
  const rev = steps.filter((s) => s.phase === 'revision');
  return {
    byActor,
    generation: sumSteps(gen),
    review: rev.length ? sumSteps(rev) : { provenance: 'pendiente' },
    total: sumSteps(steps),
    missing: steps.filter((s) => !hasValue(s.time)).length,
    steps: steps.length,
  };
}

export const actorLabel: Record<Actor, string> = {
  ia: 'IA',
  humano: 'Criterio propio',
  software: 'Software',
};

export function formatPct(n: number): string {
  return `${Math.abs(n).toLocaleString('es-ES', { maximumFractionDigits: 0 })} %`;
}
