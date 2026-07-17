"use client";

export function Background() {
  return (
    <>
      {/* Aurora */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-25 bg-[radial-gradient(circle,#f97316_0%,transparent_70%)] animate-aurora-1" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[55vw] h-[55vw] rounded-full blur-[100px] opacity-25 bg-[radial-gradient(circle,#ea580c_0%,transparent_70%)] animate-aurora-2" />
        <div className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-25 bg-[radial-gradient(circle,#fb923c_0%,transparent_70%)] animate-aurora-3" />
      </div>

      {/* Squares */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute w-20 h-20 left-[10%] border border-brand-500 rounded-md opacity-0 animate-float-square-1" />
        <div className="absolute w-[120px] h-[120px] left-[30%] border border-brand-500 rounded-md opacity-0 animate-float-square-2" style={{ animationDelay: "-5s" }} />
        <div className="absolute w-16 h-16 left-[60%] border border-brand-500 rounded-md opacity-0 animate-float-square-3" style={{ animationDelay: "-10s" }} />
        <div className="absolute w-[100px] h-[100px] left-[80%] border border-brand-500 rounded-md opacity-0 animate-float-square-1" style={{ animationDelay: "-15s" }} />
        <div className="absolute w-[140px] h-[140px] left-[50%] border border-brand-500 rounded-md opacity-0 animate-float-square-2" style={{ animationDelay: "-20s" }} />
      </div>

      {/* Noise */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </>
  );
}
