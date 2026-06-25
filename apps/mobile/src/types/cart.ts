export type CartLineKind = 'slopes' | 'dining' | 'spa';

export interface CartLineItem {
  id: string;
  kind: CartLineKind;
  title: string;
  amount: number;
}

export interface Cart {
  id: string;
  lines: CartLineItem[];
}
