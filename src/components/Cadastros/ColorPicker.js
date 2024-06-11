import React, { useState } from 'react';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#000000');

  const handleChange = (event) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
  };

  return (
    <div>
      <input type="color" value={selectedColor} onChange={handleChange} />
      <p>Cor selecionada: {selectedColor}</p>
    </div>
  );
};

export default ColorPicker;
