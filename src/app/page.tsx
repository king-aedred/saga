"use client";



import QuestWindowFrame from "@/components/QuestWindowFrame";

import {useEffect, useRef, useState} from "react";



const quests = [
  { id: 1, name: "First Quest", description: "test1" },
  { id: 2, name: "Second Quest", description: "test2" },
]

export default function Page() {
  
  type Section = "navbar" | "questList" | "questDetail";

  const navItems = ["QUESTS", "GENERAL STATS", "SYSTEM"];

  const [activeSection, setActiveSection] = useState<Section>("questList");
  const [selectedNavIndex, setSelectedNavIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);

  const navIndicatorIndex = hoveredNavIndex ?? (activeSection === "navbar" ? selectedNavIndex : null);

  const[clickedNavIndex, setClickedNavIndex] = useState<number | null>(null);

  const [navAnimationToken, setNavAnimationToken] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const selectedQuest = quests[selectedIndex];
  const currentNavItem = navItems[selectedNavIndex];

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    switch(activeSection) {
      case "questList": {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setSelectedIndex((current) => Math.min(current + 1, quests.length -1 ));
          return;
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          if (selectedIndex > 0) {
            setSelectedIndex((current) => current -1);
          }
          return;
        }
        if (event.key === "ArrowRight" || event.key == "Enter") {
          event.preventDefault();
          setActiveSection("questDetail");
          return;
        }    
        if (event.key === "Escape") {
          event.preventDefault();
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
      className="relative min-h-screen bg-[#181414] outline-none overflow-hidden"
    >
      <img 
        src="/skyrim_test_bg.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-fill object-center opacity-0"
      />
      <div className="relative z-10 mx-auto flex items-center justify-center">
        <QuestWindowFrame>
            <div className="relative h-full w-full">
              <div className="absolute left-[9%] top-[0.60%] right-[9%] aspect-[983/40] [container-type:inline-size]">
                <header className={"flex h-full w-full px-[1cqw] py-0 text-[clamp(3cqw,4.5cqw,1.75cqw)] transition-colors duration-150"}>
                  <div className="w-full h-full overflow-hidden">
                    <div className="flex h-full w-full flex-nowrap py-[0.25cqh]">
                      {navItems.map((item, index) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSelectedNavIndex(index);
                          setNavAnimationToken((current) => current +1);
                        }}
                        className="relative inline-flex flex-1 items-center justify-center whitespace-nowrap px-2 leading-none focus:outline-none focus-visible:outline-none"
                        >
                        {index === selectedNavIndex && (
                          <>                            
                            <img
                              key={`left-${index}-${navAnimationToken}`}
                              src="/selection_button_left.svg"
                              alt=""
                              aria-hidden="true"
                              className="pointer-events-none absolute left-[clamp(1cqw,6cqw,6cqw)] top-1/2 h-[clamp(0.2rem,2cqw,3cqw)] w-[clamp(0.2,2cqw,3cqw)] -translate-y-1/2 animate-slide-in-left"                                 
                            />
                            <img
                              key={`right-${index}-${navAnimationToken}`}
                              src="/selection_button_right.svg"
                              alt=""
                              aria-hidden="true"
                              className="pointer-events-none absolute right-[clamp(1cqw,6cqw,6cqw)] top-1/2 h-[clamp(0.2rem,2cqw,3cqw)] w-[clamp(0.2,2cqw,3cqw)] -translate-y-1/2 animate-slide-in-right"
                            />
                          </>
                        )}

                        <span className="relative z-10 inline-block px-8   origin-center tracking-[0.04em] drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                          {item}
                        </span>
                      </button>
                    ))}
                    </div>
                    
                  </div>
                </header>
              </div>
            
            <div className="absolute inset-x-[3.5%] top-[12%] h-[85%] [container-type:inline-size]">
              <main className="grid h-full pl-[5.25cqw] grid-cols-[22%_1fr] gap-x-[8cqw]">
                {currentNavItem === "QUESTS" ? (
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