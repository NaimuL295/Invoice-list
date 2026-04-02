import { useQuery } from "@tanstack/react-query";
import { pdf } from "@react-pdf/renderer";
import { Printer, Loader2 } from "lucide-react";
import api from "../../../../lib/axios";

import LayoutOne from "./LayoutPdf/LayoutOne";
import LayoutTwo from "./LayoutPdf/LayoutTwo";
import LayoutThree from "./LayoutPdf/LayoutThree";
import LayoutFour from "./LayoutPdf/LayoutFour";
import type { Invoice } from "../../../../types/type";

interface LayoutProps {
  data: Invoice;
  title?: string;
}

type PrintPreviewProps = {
  invoiceId: string;
};

const layoutMap: Record<string, React.FC<LayoutProps>> = {
  "1": LayoutOne,
  "2": LayoutTwo,
  "3": LayoutThree,
  "4": LayoutFour,
};

const PrintPreview: React.FC<PrintPreviewProps> = ({ invoiceId }) => {
  const { data, isLoading, isError } = useQuery<Invoice>({
    queryKey: ["invoice", invoiceId],
    queryFn: async () => {
      const res = await api.get(`/api/invoice/${invoiceId}`, {
        withCredentials: true,
      });
      return res.data.data;
    },
    enabled: !!invoiceId,
  });

  const handlePrint = async () => {
    if (!data) return;

    // Get the layout based on user preference, fallback to LayoutOne
    const layoutKey = data.user.printLayout;
    console.log(layoutKey, data);

    const LayoutComponent = layoutMap[layoutKey] || LayoutOne;

    // Step 3: Pass both data and title to satisfy the component's requirements
    const doc = <LayoutComponent data={data} />;

    try {
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);

      // Open in new tab
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const printWindow: Window | null = window.open(url);

      // Safety: Revoke URL after a minute to prevent memory leaks
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (err) {
      console.error("Could not generate PDF", err);
      alert("Failed to generate invoice print view.");
    }
  };

  if (isLoading)
    return <Loader2 className="animate-spin text-gray-400" size={20} />;
  if (isError)
    return <span className="text-red-500 text-xs">Error loading invoice</span>;

  return (
    <button
      onClick={handlePrint}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      title="Print Invoice"
    >
      <Printer size={20} className="text-gray-600" />
    </button>
  );
};

export default PrintPreview;
