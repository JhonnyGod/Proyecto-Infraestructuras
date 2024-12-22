import React from "react";
import "./toggle.css"; // Asegúrate de incluir los estilos para el toggle button

function ToggleButton({ label, isActive, onToggle }) {
  return (
    <label className="toggle-label">
      <div className={`toggle-button ${isActive ? "active" : ""}`} onClick={onToggle}>
        <div className="toggle-switch" />
      </div>
      {label}
    </label>
  );
}

export default ToggleButton;