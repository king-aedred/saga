"use client";

import {useEffect, useRef, useState} from "react";

const quests = [
  { id: 1, name: "First Quest", description: "test1" },
  { id: 2, name: "Second Quest", description: "test2" },
]

export default function Page() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const selectedQuest = quests[selectedIndex];

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      setSelectedIndex((current) => (current + 1) % quests.length);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      setSelectedIndex((current) => (current - 1 + quests.length) % quests.length);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      console.log("Activated:", selectedQuest);
    }
  }

  return(
    <div
      ref={containerRef}
      tabIndex ={0}
      onKeyDown={handleKeyDown}
      className="min-h-screen outline-none"
    >
      <div className="grid min-h-screen grid-rows-[64px_1fr]">
        <header className="border-b p-4">
          Upper bar
        </header>

        <main className="grid grid-cols-2">
          <aside className="border-r p-4">
            <h2 className="text-sm font-medium">Quests</h2>
            <div className="mt-4 flex flex-col gap-2">
              {quests.map((quest, index) => (
                <button
                 key={quest.id}
                 onClick={() => setSelectedIndex(index)}
                 className={
                  index === selectedIndex
                    ? "text-left font-bold bg-gray-100 p-2 rounded"
                    : "text-left p-2 rounded hover:bg-gray-50"
                 }
                >
                  {quest.name ?? quest.description}
                </button>
              ))}
            </div>
          </aside>

          <section className="p-6">
            <h2 className="text-lg font-semibold">Details</h2>
            <div className="mt-4">
              <h3 className="text-md font-medium">{selectedQuest?.name}</h3>
              <p className="mt-2 text-sm text-gray-700">{selectedQuest?.description}</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}