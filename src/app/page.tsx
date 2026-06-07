"use client";

import QuestWindowFrame from "@/components/QuestWindowFrame";

import {useEffect, useRef, useState} from "react";



const quests = [
  { id: 1, name: "First Quest", description: "test1" },
  { id: 2, name: "Second Quest", description: "test2" },
]

export default function Page() {
  
  type Section = "navbar" | "questList" | "questDetail";

  const navItems = ["Overview", "Quests", "Map", "Sign in"];

  const [navOffset, setNavOffset] = useState(0);

  const visibleCount = 3;
  const itemWidth = 100/visibleCount;

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

          const rightEdge = navOffset + visibleCount -1;

          if (selectedNavIndex < rightEdge) {
            setSelectedNavIndex((current) => Math.min(current +1, navItems.length - 1));
          } else if (navOffset < navItems.length - visibleCount) {
            setNavOffset((current) => current +1);
            setSelectedNavIndex((current) => (current + 1));
          }
          return;
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();

          const leftEdge = navOffset;

          if (selectedNavIndex > leftEdge) {
            setSelectedNavIndex((current) => Math.max(current -1, 0));
          } else if (navOffset > 0) {
            setNavOffset((current) => current -1);
            setSelectedNavIndex((current) => current -1);
          }
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
      className="min-h-screen bg-[#4cf100] outline-none"
    >
      {/* <img 
        src="/main-quest-gone-in-the-quest-log-vanilla-se-pc-v0-guwvqystbdn81.webp"
        alt=""
        aria-hidden="true"
        className="fixed inset-0 w-full h-full"
      ></img> */}
      <div className="mx-auto flex items-center justify-center">
        <QuestWindowFrame>
            <div className="relative h-full w-full">
              <div className="absolute left-[9%] top-[1%] right-[9%] aspect-[983/40] [container-type:inline-size]">
                <header 
                  className={`flex h-full w-full px-[1cqw] py-0 text-[clamp(7px,5cqw,1.75cqw)] transition-colors duration-150 ${
                    activeSection === "navbar" 
                    ? "bg-gray-800 text-white" 
                    : "bg-transparent text-white"
                  }`}
                >
                  <div className="w-full h-full overflow-hidden">
                    <div 
                      className="flex h-full flex-nowrap transition-transform duration-300 ease-out py-[0.25cqh]"
                      style={{transform: `translateX(-${navOffset * (100/visibleCount)}%)`}}
                    >
                      {navItems.map((item, index) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSelectedNavIndex(index);
                          setActiveSection("navbar");
                        }}  
                        className={`inline-flex h-full shrink-0 basis-1/3 items-center justify-center whitespace-nowrap rounded px-2 leading-none ${
                          index === selectedNavIndex
                            ? "rounded bg-gray-100 px-3 py-1 font-bold text-black"
                            : "rounded px-3 py-1 hover:bg-gray-500"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                    </div>
                    
                  </div>
                </header>
              </div>
            
            <div className="absolute inset-x-[3.5%] top-[12%] h-[85%]">
              <main className="grid h-full pl-18 grid-cols-[22%_1fr] gap-x-22">
                {currentNavItem === "Quests" ? (
                  <>
                    <aside 
                      className={`h-full p-4 transition-colors duration-150 ${
                        activeSection === "questList" 
                        ? "bg-gray-800 text-white" 
                        : "bg-transparent text-white"
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
                      className={`h-full p-4 transition-colors duration-150 ${
                        activeSection === "questDetail" 
                        ? "bg-gray-800 text-white" 
                        : "bg-transparent text-white"
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
        </QuestWindowFrame>  
      </div>
    </div>
  );
}