export type ReservationKind = 'slopes' | 'dining' | 'spa';

export interface Reservation {
  id: string;
  title: string;
  kind: ReservationKind;
  timeLabel: string;
}
