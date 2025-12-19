
export interface MeaslesDataItem {
  title: string;
  content: string;
  type: 'clinical' | 'diag' | 'factor';
  id: string;
}

export interface QuizQuestion {
  q: string;
  a: string[];
  c: number;
  e: string;
}

export interface Particle {
  id: string;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'clinical' | 'diag' | 'factor';
}
