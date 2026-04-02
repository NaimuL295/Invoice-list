// interface Invoice {
//   uid: string;
//   user_name: string;
//   email: string;
//   date: string;
//   customer: string;
//   items: any[];
//   subtotal: number;
//   discount: number;
//   total: number;
//   received: number;
//   due: number;
//   description: string;
//   paymentType: string;
// }





export interface User {
  id: number;
  user_name: string;
  email: string;
  password: string | null;
  googleId: string | null;
  printLayout: "1" | "2" | "3" | "4"; // your layout keys
  address: string | null;
  phone: string | null;
  createdAt: string;
}

export interface Item {
  id: number;
  item_name: string;
  quantity: number;
  unit: string;
  price: number;
  invoiceId: number;
}

export interface Invoice {
  id: number;
  user_name:string;
  companyEmail:string
  uid: string;
  email:string
  customer: string;
  date: string;
  subtotal: number;
  total: number;
  discount: number;
  due: number;
  received: number;
  paymentType: string;
  description: string;
  userId: number;
  createdAt: string;
 user: User;
  items: Item[];
}


export interface subItem {
  id: number;
  item_name: string;
  unit: string;
  quantity: number;
  price: number;
}