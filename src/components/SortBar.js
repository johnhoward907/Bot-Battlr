import React from "react";

function SortBar({ sortBy, onSortChange, selectedClasses, onClassToggle }) {
  const classes = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"];

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h4>Sort By:</h4>
      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">None</option>
        <option value="health">Health</option>
        <option value="damage">Damage</option>
        <option value="armor">Armor</option>
      </select>

      <h4>Filter by Class:</h4>
      {classes.map((cls) => (
        <label key={cls} style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            value={cls}
            checked={selectedClasses.includes(cls)}
            onChange={() => onClassToggle(cls)}
          />
          {cls}
        </label>
      ))}
    </div>
  );
}

export default SortBar;
