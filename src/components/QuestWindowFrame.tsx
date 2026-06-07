import type {ReactNode} from "react";

type QuestWindowFrameProps = {
  children: ReactNode;
};

export default function QuestWindowFrame({children}: QuestWindowFrameProps) {
  return (
    <div className="relative mx-auto w-full max-w-6xl aspect-[16/9]">
      <img 
        src="/skyrim_log_kontura.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-o h-full w-full select-none object-contain"  
      />

      <div className="absolute inset-0 z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}