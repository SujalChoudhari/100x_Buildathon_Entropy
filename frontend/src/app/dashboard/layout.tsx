import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
    <main className={`${inter.className} bg-neutral-100 text-neutral-700`}>
      
      <div className="flex h-screen w-screen ">
        <Sidebar />
        <div className="h-full py-2 pr-2 flex-1 ">
          <div className="bg-white border bg-[radial-gradient(circle_500px_at_50%_200px,#aee1ff,transparent)] border-neutral-200/90 rounded-2xl mask w-full h-full p-4 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </main>
 );
}
