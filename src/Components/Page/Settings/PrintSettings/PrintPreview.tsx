import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

// Example layouts
const LayoutOne = () => <div style={{ border: "1px solid black", padding: 20 }}>Layout 1</div>;
const LayoutTwo = () => <div style={{ border: "1px solid blue", padding: 20 }}>Layout 2</div>;
const LayoutThree = () => <div style={{ border: "1px solid green", padding: 20 }}>Layout 3</div>;
const LayoutFour = () => <div style={{ border: "1px solid red", padding: 20 }}>Layout 4</div>;

const PrintPreview = () => {
  const [layout, setLayout] = useState("1");
  const componentRef = useRef<HTMLDivElement>(null);

  // fetch selected layout from backend
  useEffect(() => {
    const fetchLayout = async () => {
      const res = await axios.get("/api/print-settings", { withCredentials: true });
      setLayout(res.data.layout);
    };
    fetchLayout();
  }, []);

  // react-to-print handler
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice Print",
  });

  let LayoutComponent;
  if (layout === "1") LayoutComponent = LayoutOne;
  else if (layout === "2") LayoutComponent = LayoutTwo;
  else if (layout === "3") LayoutComponent = LayoutThree;
  else if (layout === "4") LayoutComponent = LayoutFour;

  return (
    <div>
      <div ref={componentRef}>
        <LayoutComponent />
      </div>
      <button onClick={handlePrint} style={{ marginTop: 20, padding: "8px 16px" }}>
        Print Preview
      </button>
    </div>
  );
};

export default PrintPreview;