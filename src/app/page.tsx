"use client";

import {useEffect, useRef, useState} from "react";

const quests = [
  { id: 1, name: "First Quest", description: "test1" },
  { id: 2, name: "Second Quest", description: "test2" },
]

export default function Page() {
  
  type Section = "navbar" | "questList" | "questDetail";

  const navItems = ["Overview", "Quests", "Map"];

  const [activeSection, setActiveSection] = useState<Section>("questList");
  const [selectedNavIndex, setSelectedNavIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const selectedQuest = quests[selectedIndex];
  const currentNavItem = navItems[selectedNavIndex];

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    switch(activeSection) {
      case "navbar": {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          setSelectedNavIndex((current) => (current + 1) % navItems.length);
          return;
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setSelectedNavIndex((current) => (current - 1 + navItems.length) % navItems.length);
          return;
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          if (navItems[selectedNavIndex] === "Quests") {
            setActiveSection("questList");
          } else {
            setActiveSection("questDetail");
          }
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault;
          setActiveSection("questList");
          return;
        }
        return;
      }

      case "questList": {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setSelectedIndex((current) => Math.min(current + 1, quests.length -1 ));
          return;
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          // go into nav if top element is most top quest
          if (selectedIndex === 0) {
            setActiveSection("navbar");
          } else {
            setSelectedIndex((current) => current -1);
          }
          return;
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          setActiveSection("questDetail");
          return;
        }    
        if (event.key === "Enter") {
          event.preventDefault();
          setActiveSection("questDetail");
          return;
        }
        if (event.key === "Escape") {
          event.preventDefault();
          setActiveSection("navbar");
          return;
        }
        return;
      }

      case "questDetail": {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setActiveSection("questList");
          return;
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setActiveSection("navbar");
          return;
        }
        if(event.key === "Escape") {
          event.preventDefault();
          setActiveSection("questList");
          return;
        }
        return;
      }

      default:
        return;
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
        <header 
          className={`border-b p-4 transition-colors duration-150 ${
            activeSection === "navbar" ? "bg-gray-800 text-white" : "bg-transparent text-white"
          }`}
        >
          <div className="flex gap-4">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedNavIndex(index);
                  setActiveSection("navbar");
                }}  
                className={
                  index === selectedNavIndex
                    ? "rounded bg-gray-100 px-3 py-1 font-bold text-black"
                    : "rounded px-3 py-1 hover:bg-gray-500"
                }
              >
                {item}
              </button>
            ))}
          </div>
        </header>

        <main className="grid grid-cols-2">
          {currentNavItem === "Quests" ? (
            <>
              <aside 
                className={`border-b p-4 transition-colors duration-150 ${
                  activeSection === "questList" ? "bg-gray-800 text-white" : "bg-transparent text-white"
              }`}
              >
                <h2 className="text-lg font-semibold">Quests</h2>
                <div className="mt-4 flex flex-col gap-2">
                    {quests.map((quest, index) => (
                      <button
                      type="button"
                      role="option"
                      key={quest.id}
                      onClick={() => {setSelectedIndex(index); setActiveSection("questList");}}
                      className={
                        index === selectedIndex
                          ? "text-left font-bold bg-gray-100 p-2 rounded text-black"
                          : "text-left p-2 rounded hover:bg-gray-500"
                      }
                      >
                        {quest.name ?? quest.description}
                      </button>
                    ))}
                  </div>  
              </aside>
              <section 
                className={`border-b p-4 transition-colors duration-150 ${
                  activeSection === "questDetail" ? "bg-gray-800 text-white" : "bg-transparent text-white"
                }`}
              >
                <h2 className="text-lg font-semibold">Details</h2>
                <div className="mt-4">
                  <h3 className="text-md font-medium">{selectedQuest?.name}</h3>
                  <p className="mt-2 text-sm text-gray-700">{selectedQuest?.description}</p>
                </div>
              </section>
            </>
          ) : (
            <>
            <section className="col-span-2 p-6">
              <h2 className="text-lg font-semibold">{currentNavItem}</h2>
              <p className="mt-4 text-sm text-gray-700">
                Placeholder content...
              </p>
            </section>
            </>
          )}
          
        </main>
      </div>
    </div>
  );
}