import type {ReactNode} from "react";

type QuestWindowFrameProps = {
  children: ReactNode;
};

export default function QuestWindowFrame({children}: QuestWindowFrameProps) {
  return (
    <div className="relative mx-auto mt-[6.5vh] w-[75vw] aspect-[463/242] overflow-hidden">
      <img 
        src="/skyrim_log_own_v1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 w-full h-full object-contain opacity-50"  
      />

      <div className="absolute inset-0 z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}