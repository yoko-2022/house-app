import React, { useState } from "react";
import Report from "./Report";
import Form from "./Form";

const Tab = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div>
      <button onClick={() => setActiveTab("tab1")}>日々の記録</button>
      <button onClick={() => setActiveTab("tab2")}>月間レポート</button>
      {activeTab === "tab1" ? <Form /> : <Report />}
    </div>
  );
};

export default Tab;
