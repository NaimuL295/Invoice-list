import React from "react";
import { useQuery } from "@tanstack/react-query";
import { pdf } from "@react-pdf/renderer";
import { Printer } from "lucide-react";
import api from "../../../../lib/axios";

// Layout imports
import LayoutOne from "./LayoutPdf/LayoutOne";
import LayoutTwo from "./LayoutPdf/LayoutTwo";
import LayoutThree from "./LayoutPdf/LayoutThree";
import LayoutFour from "./LayoutPdf/LayoutFour";

const layoutMap: Record<string, React.FC<{ data: any }>> = {
  "1": LayoutOne,
  "2": LayoutTwo,
  "3": LayoutThree,
  "4": LayoutFour,
};

type PrintPreviewProps = {
  invoiceId: string;
};

const PrintPreview: React.FC<PrintPreviewProps> = ({ invoiceId }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: async () => {
      const res = await api.get(`/api/invoice/${invoiceId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!invoiceId,
  });

  if (isLoading) return <p className="text-center mt-10">Loading invoice...</p>;
  if (isError) return <p className="text-center mt-10">Error loading invoice</p>;
  if (!data) return null;

  const LayoutComponent = layoutMap[data.layout] || LayoutOne;

  const handlePrint = async () => {
    const doc = <LayoutComponent data={data} />;
   
    
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url); // Opens PDF in new tab
  };

  return (
    <div className="">
      <button
        onClick={handlePrint}
      >
        <Printer size={20} /> 
      </button>
    </div>



  );
};

export default PrintPreview;