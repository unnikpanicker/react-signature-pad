import React from 'react';

interface ToolbarProps {
  onClear: () => void;
  onSave: () => void;
  onUndo?: () => void;
  onPenColorChange?: (color: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onClear,
  onSave,
  onUndo,
  onPenColorChange
}) => {
  return (
    <div className="toolbar">
      <button onClick={onClear}>Clear</button>
      <button onClick={onSave}>Save</button>
      {onUndo && <button onClick={onUndo}>Undo</button>}
      <select onChange={(e) => onPenColorChange?.(e.target.value)}>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </select>
    </div>
  );
};

export default Toolbar;
