import React, {useState} from 'react';
interface SelectDropdownProps {
    label?: string;
    onChange:(selectedValue: number) => void;
}

const mazeList = {
    "Лабиринт 1":1,
    "Лабиринт 2":2,
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ label = 'Select an option', onChange }) => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelect = (option: string) => {
        onChange(mazeList[option as keyof typeof mazeList]);
        setSelectedValue(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown" style={{display: "flex",
            flexDirection: "column",
            boxSizing: "border-box", position: 'relative'}}>
            <label>{label}</label>
            <button
                className="dropdown-toggle"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: "10px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    flex: "1 1 auto",
                    minWidth: "120px",
                }}>
                {selectedValue || label}
            </button>

            {isOpen && (
                <ul
                    className="dropdown-menu"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        boxSizing: "border-box",
                        top: '100%',
                        left: 0,
                        zIndex: 1000,
                        listStyle: 'none',
                        padding: 0,
                        margin: '4px 0 0',
                        backgroundColor: '#fff',
                        border: '1px solid rgba(0,0,0,.15)',
                        borderRadius: '4px',
                        boxShadow: '0 2px 5px rgba(0,0,0,.1)',
                        minWidth: '160px',
                    }}
                >
                    {Object.keys(mazeList).map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(option)}
                            style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectDropdown;