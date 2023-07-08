import React from "react";
import SwitchSelector from "react-switch-selector";

const SimpleSwitchButton = () => {
    const options = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
    ];

    const handleOptionChange = (value) => {
        console.log("Selected option:", value);
    };

    return (
        <SwitchSelector
            options={options}
            onChange={handleOptionChange}
            initialSelectedValue="option1"
        />
    );
};

export default SimpleSwitchButton;
