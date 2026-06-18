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
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);

  const navIndicatorIndex = hoveredNavIndex ?? (activeSection === "navbar" ? selectedNavIndex : null);

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
      className="min-h-screen bg-[#040c00] outline-none"
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
              <div className="absolute left-[9%] top-[0.60%] right-[9%] aspect-[983/40] [container-type:inline-size]">
                <header 
                  className={`flex h-full w-full px-[1cqw] py-0 text-[clamp(3cqw,4.5cqw,1.75cqw)] transition-colors duration-150 ${
                    activeSection === "navbar" && "bg-transparent text-white" 
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
                        className="relative inline-flex h-full shrink-0 basis-1/3 items-center justify-center whitespace-nowrap rounded px-2 leading-none [containter-type:inline-size]"
                      >
                        {index === selectedNavIndex && (
                          <>
                            <img
                              src="/selection_button_left.svg"
                              alt=""
                              aria-hidden="true"
                              className="pointer-events-none absolute left-[clamp(1cqw,5cqw,5cqw)] top-1/2 h-[clamp(1cqw,2cqw,4cqw)] w-[clamp(1cqw,2cqw,4cqw)] -translate-y-1/2"
                            />
                            <img
                              src="/selection_button_right.svg"
                              alt=""
                              aria-hidden="true"
                              className="pointer-events-none absolute right-[clamp(1cqw,5cqw,5cqw)] top-1/2 h-[clamp(1cqw,2cqw,4cqw)] w-[clamp(1cqw,2cqw,4cqw)] -translate-y-1/2"
                            />
                          </>
                        )}

                        <span className="inline-block px-8 translate-y-[0.09em]">{item}</span>
                      </button>
                    ))}
                    </div>
                    
                  </div>
                </header>
              </div>
            
            <div className="absolute inset-x-[3.5%] top-[12%] h-[85%] [container-type:inline-size]">
              <main className="grid h-full pl-[5.25cqw] grid-cols-[22%_1fr] gap-x-[8cqw]">
                {currentNavItem === "Quests" ? (
                  <>
                    <aside 
                      className={`h-full overflow-hidden pt-[2cqw] transition-colors duration-150 ${
                        activeSection === "questList" 
                        ? "bg-gray-800 text-white" 
                        : "bg-transparent text-white"
                      }`}
                      >
                      {/* <h2 className="text-[clamp(7px,1.4cqw,18px)] font-semibold leading-none">Quests</h2> */}
                        <div className="mt-[1cqw] flex flex-col gap-[0.8cqw]">
                            {quests.map((quest, index) => (
                              <button
                              type="button"
                              role="option"
                              key={quest.id}
                              onClick={() => {setSelectedIndex(index); setActiveSection("questList");}}
                              className={
                                index === selectedIndex
                                  ? "inline-flex min-h-[clamp(28px,3.2cqw,44px)] items-center text-left font-bold bg-gray-100 px-[1xqw] text-[clamp(11px,1.2cqw,16px)] rounded leading-none text-black"
                                  : "inline-flex min-h-[clamp(28px,3.2cqw,44px)] items-center text-left rounded px-[1xqw] text-[clamp(11px,1.2cqw,16px)] hover:bg-gray-500"
                              }
                              >
                                {quest.name ?? quest.description}
                              </button>
                            ))}
                          </div>  
                    </aside>
                    <section 
                      className={`h-full overflow-hidden transition-colors duration-150 opacity-95 ${
                        activeSection === "questDetail" 
                        ? "bg-gray-800 text-white" 
                        : "bg-transparent text-white"
                      }`}
                    >
                      <div className="relative left-[32%] right-[32%] mt-[2.55%] h-[6%] w-[16.1vw] [container-type:size] grid place-items-center overflow-hidden">
                        <h3 className="w-full px-[4%] text-center font-medium leading-none whitespace-nowrap text-[clamp(10px,70cqh,42px)]">{selectedQuest?.name}</h3>
                      </div>
                      <h2 className="text-[clamp(7px,1.4cqw,18px)] font-semibold leading-none">Details</h2>
                      <div className="mt-[1cqw]">
                        <p className="mt-[0.8cqw] text-[clamp(10px,1.05cqw,14px)] text-gray-700">{selectedQuest?.description}</p>
                      </div>
                    </section>
                  </>
                ) : (
                  <>
                  <section className="col-span-2 p-[2cqw]">
                    <h2 className="text-[clamp(7px,1.4cqw,18px)] font-semibold">{currentNavItem}</h2>
                    <p className="mt-[1cqw] text-[clamp(10px,1.05cqw,14px)] text-gray-700">
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