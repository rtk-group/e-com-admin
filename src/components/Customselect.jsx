import React, { useState } from 'react'

const Customselect = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <div
                className="p-2 border rounded cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value}
            </div>
            {isOpen && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow-lg">
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onChange({ target: { value: opt.value } });
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Customselect;