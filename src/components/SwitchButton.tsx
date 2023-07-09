import React, { useState } from "react";
import SwitchSelector from "react-switch-selector";
import "./SwitchButton.css";

type SwitchButtonProps = {
  onUnitChange: (unit: string) => void;
};

const SwitchButton: React.FC<SwitchButtonProps> = ({ onUnitChange }) => {
  const options = [
    { label: "°C", value: "celsius", selectedBackgroundColor: "#0097e6" },
    { label: "°F", value: "fahrenheit", selectedBackgroundColor: "#0097e6" }
  ];

  const [selectedUnit, setSelectedUnit] = useState("celsius");

  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
    onUnitChange(value);
  };

  return (
    <div className="temp-selector">
      <SwitchSelector
        border={0}
        fontSize={35}
        fontColor={"#000000"}
        selectedFontColor={"#000000"}
        wrapperBorderRadius={5}
        optionBorderRadius={5}
        options={options}
        onChange={handleUnitChange}
        initialSelectedIndex={selectedUnit === "celsius" ? 0 : 1}
      />
    </div>
  );
};

export default SwitchButton;
