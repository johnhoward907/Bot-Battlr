import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ bots, onRelease, onDelete }) {
  return (
    <div>
      <h2>Your Bot Army</h2>
      <div className="bot-army">
        {bots.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            onClick={() => onRelease(bot)}
            onDelete={() => onDelete(bot)}
          />
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;
