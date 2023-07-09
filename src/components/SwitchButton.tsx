import React, { useState } from "react";
import SwitchSelector from "react-switch-selector";
import "./SwitchButton.css";

type SwitchButtonProps = {
  onUnitChange: (unit: string) => void;
};

const SwitchButton: React.FC<SwitchButtonProps> = ({ onUnitChange }) => {
  const options = [
    { label: "°C", value: "celsius" },
    { label: "°F", value: "fahrenheit" },
  ];

  const [selectedUnit, setSelectedUnit] = useState("celsius");

  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
    onUnitChange(value);
  };

  return (
    <div className="temp-selector">
      <SwitchSelector
        options={options}
        onChange={handleUnitChange}
        initialSelectedIndex={selectedUnit === "celsius" ? 0 : 1}
      />
    </div>
  );
};

export default SwitchButton;
