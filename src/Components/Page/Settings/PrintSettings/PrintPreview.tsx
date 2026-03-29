import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../../store/useAuthStore";
import api from "../../../../lib/axios";

//  Layout
type LayoutProps = {
  title?: string;
};

//  Layout Components
const LayoutOne: React.FC<LayoutProps> = () => (
  <div style={{ border: "1px solid black", padding: 20 }}>Layout 1</div>
);

const LayoutTwo: React.FC<LayoutProps> = () => (
  <div style={{ border: "1px solid blue", padding: 20 }}>Layout 2</div>
);

const LayoutThree: React.FC<LayoutProps> = () => (
  <div style={{ border: "1px solid green", padding: 20 }}>Layout 3</div>
);

const LayoutFour: React.FC<LayoutProps> = () => (
  <div style={{ border: "1px solid red", padding: 20 }}>Layout 4</div>
);

// Layout map (Best Practice)
const layoutMap: Record<string, React.FC<LayoutProps>> = {
  "1": LayoutOne,
  "2": LayoutTwo,
  "3": LayoutThree,
  "4": LayoutFour,
};

const PrintPreview = () => {
  const { user } = useAuthStore();
  const [layout, setLayout] = useState<string>("1");
  const componentRef = useRef<HTMLDivElement>(null);
  const fetchPrint = async () => {
    const res = await api.get(`/api/invoice/${user?.id}`, {
      withCredentials: true,
    });
    return res.data;
  };
  const { data, isPending, isError } = useQuery({
    queryKey: ["PrintPreview", user?.id as number],
    queryFn: fetchPrint,
  });
  //  Fetch layout from backend
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await api.get("/api/print-settings", {
          withCredentials: true,
        });

        // safe check
        if (res.data?.layout) {
          setLayout(String(res.data.layout));
        }
      } catch (error) {
        console.error("Failed to fetch layout", error);
      }
    };

    fetchLayout();
  }, []);

  //  Print handler
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Invoice Print",
  });
  //Select layout safely
  const LayoutComponent = layoutMap[layout] || LayoutOne;

  return (
    <div>
      <div ref={componentRef}>
        <LayoutComponent />
      </div>

      <button
        onClick={handlePrint}
        style={{ marginTop: 20, padding: "8px 16px" }}
      >
        Print Preview
      </button>
    </div>
  );
};

export default PrintPreview;
