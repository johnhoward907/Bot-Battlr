import React from "react";
import "./BotCard.css";

function BotCard({ bot, onClick, onDelete }) {
  return (
    <div className="bot-card" onClick={onClick}>
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p><strong>Class:</strong> {bot.bot_class}</p>
      <p><em>"{bot.catchphrase}"</em></p>
      <p>Health: {bot.health} | Damage: {bot.damage} | Armor: {bot.armor}</p>
      {onDelete && (
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          X
        </button>
      )}
    </div>
  );
}

export default BotCard;
