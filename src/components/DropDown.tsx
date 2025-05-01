import React from 'react';
interface SelectDropdownProps {
    label?: string;
    onChange:(selectedValue: number) => void;
}

const mazeList = {
    "Лабиринт 1":1,
    "Лабиринт 2":2,
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ label = 'Select an option', onChange }) => {
    return (
        <div style= {{
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
        }}>
            {label && <label>{label}</label>}
        <select  style = {{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            flex: "1 1 auto",
            minWidth: "120px",
        }}  onChange={(val)=>{
            onChange(mazeList[val.target.value as keyof typeof mazeList])
        }}>
    {Object.keys(mazeList).map((option, index) => (
        <option key={index} value={option}>
        {option}
        </option>
    ))}
    </select>
    </div>
);
};

export default SelectDropdown;