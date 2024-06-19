export class Preference {
  items: {
    id?: string;
    title?: string;
    category_id?: string;
    quantity?: number;
    unit_price?: number;
  }[];
  payer?: {
    name?: string;
    email?: string;
  };
}
