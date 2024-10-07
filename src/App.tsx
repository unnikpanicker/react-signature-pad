import React from "react";
import SignaturePad from "./components/SignaturePad";
import "./styles.css";

const App: React.FC = () => {
  const handleSave = (dataURL: string) => {
    console.log("Saved Signature Data URL:", dataURL);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Signature Pad Demo</h1>
      <SignaturePad
        width={600}
        height={400}
        onCopy={handleSave}
        padStyles={{ width: "100px" }}
      />
    </div>
  );
};

export default App;
