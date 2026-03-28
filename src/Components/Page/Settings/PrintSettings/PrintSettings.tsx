import axios from "axios";
import React, { useState } from "react";

export default function PrintSettings() {
  const [layout, setLayout] = useState("1");

  const saveLayout = async () => {
    await axios.post(
      "api/print-settings",
      { layout },
      { withCredentials: true },
    );
  };
  return (
    <div>
      <select required onChange={(e) => setLayout(e.target.value)}>
        <option aria-required value=""></option>
        <option value="1">Layout 1</option>
        <option value="2">Layout 2</option>
        <option value="3">Layout 3</option>
        <option value="4">Layout 4</option>
      </select>
      <button onClick={saveLayout}> </button>
    </div>
  );
}
