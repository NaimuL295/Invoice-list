interface Invoice {
  uid: string;
  user_name: string;
  email: string;
  date: string;
  customer: string;
  items: any[];
  subtotal: number;
  discount: number;
  total: number;
  received: number;
  due: number;
  description: string;
  paymentType: string;
}