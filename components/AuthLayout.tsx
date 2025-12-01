import LeftPanel from "./LeftPanel";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  //wrapper for having the left panel image for all the pages
  return (
    <main className="flex min-h-screen bg-background">
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <LeftPanel/>
      </div>
    
      <div className="flex-1 flex items-center justify-center">
       {children}
      </div>
    </main>
  );
}
