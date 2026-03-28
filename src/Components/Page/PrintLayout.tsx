import React, { forwardRef } from "react";
import useAuthStore from "../../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

interface Item { name: string; quantity: number; price: number; }
interface Invoice {
  uid: string; date: string;
  customer: string; email: string;
  items: Item[]; subtotal: number;
  discount: number; total: number;
  received: number; due: number;
  paymentType: string; description?: string;
}

const PrintLayout = forwardRef<HTMLDivElement>((props, ref) => {
  const { user } = useAuthStore();

  const fetchData = async (): Promise<Invoice> => {
    if (!user) throw new Error("User not found");
    const res = await api.get<Invoice>(`single/api/${user.id}`);
    return res.data;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["print", user?.id],
    queryFn: fetchData,
    enabled: !!user,
  });

  if (isLoading) return <div>Loading invoice...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div ref={ref} className="w-[210mm] min-h-[297mm] p-8 bg-white text-black">
      {/* ... rest of your invoice JSX ... */}
      <h1>Invoice: {data.uid}</h1>
    </div>
  );
});

export default PrintLayout;