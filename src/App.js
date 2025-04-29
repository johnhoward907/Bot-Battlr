import React, { useEffect, useState } from "react";
import "./App.css";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import BotSpecs from "./components/BotSpecs";
import SortBar from "./components/SortBar";

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);

  // Fetch bots from local JSON server
  useEffect(() => {
    fetch("http://localhost:3000/bots")
      .then((res) => res.json())
      .then(setBots)
      .catch((err) => console.error("Failed to fetch bots:", err));
  }, []);

  // Enlist a bot (core: prevent duplicates)
  const enlistBot = (bot) => {
    if (!army.find((b) => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  };

  // Release a bot
  const releaseBot = (bot) => {
    setArmy(army.filter((b) => b.id !== bot.id));
  };

  // Permanently delete a bot from server and army
  const deleteBot = (bot) => {
    fetch(`http://localhost:8001/bots/${bot.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setArmy(army.filter((b) => b.id !== bot.id));
        setBots(bots.filter((b) => b.id !== bot.id));
      })
      .catch((err) => console.error("Failed to delete bot:", err));
  };

  // Filter and sort bots
  const filteredBots = bots
    .filter(
      (bot) =>
        selectedClasses.length === 0 || selectedClasses.includes(bot.bot_class)
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      return b[sortBy] - a[sortBy];
    });

  // Toggle class filter
  const toggleClassFilter = (cls) => {
    if (selectedClasses.includes(cls)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== cls));
    } else {
      setSelectedClasses([...selectedClasses, cls]);
    }
  };

  return (
    <div className="App">
      <h1>Bot Battlr</h1>
      <YourBotArmy bots={army} onRelease={releaseBot} onDelete={deleteBot} />
      <SortBar
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedClasses={selectedClasses}
        onClassToggle={toggleClassFilter}
      />
      {selectedBot ? (
        <BotSpecs
          bot={selectedBot}
          onBack={() => setSelectedBot(null)}
          onEnlist={(bot) => {
            enlistBot(bot);
            setSelectedBot(null);
          }}
        />
      ) : (
        <BotCollection bots={filteredBots} onEnlist={setSelectedBot} />
      )}
    </div>
  );
}

export default App;
