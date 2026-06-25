export type LiftStatus = 'open' | 'standby' | 'closed';

export interface Lift {
  id: string;
  name: string;
  status: LiftStatus;
  /** Estimated wait in minutes. Must be >= 0 — see KAN-52. */
  waitMinutes: number;
}
