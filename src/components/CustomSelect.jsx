import { useState } from "react";

const CustomSelect = ({ onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const options = [
    { value: "1", label: "Новый" },
    { value: "2", label: "В работе" },
    { value: "3", label: "Почти завершен" },
    { value: "4", label: "Успешно" },
    { value: "4", label: "Провал" },
  ];

  const handleSelect = (value) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="custom-select">
      <div
        className={`custom-select-header ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || placeholder}
      </div>
      {isOpen && (
        <ul className="custom-select-list">
          {options.map((option) => (
            <li
              key={option.label}
              className='custom-select-item'
              onClick={() => handleSelect(option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;