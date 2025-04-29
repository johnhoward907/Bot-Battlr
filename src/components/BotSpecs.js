import React from "react";
import "./BotCard.css";

function BotSpecs({ bot, onBack, onEnlist }) {
  return (
    <div className="bot-card">
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p><strong>Class:</strong> {bot.bot_class}</p>
      <p><em>"{bot.catchphrase}"</em></p>
      <p>Health: {bot.health} | Damage: {bot.damage} | Armor: {bot.armor}</p>
      <button onClick={onBack}>Back</button>
      <button onClick={() => onEnlist(bot)}>Enlist</button>
    </div>
  );
}

export default BotSpecs;
