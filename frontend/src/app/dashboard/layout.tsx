import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spotlight } from "@/components/ui/Spotlight";

const inter = Inter({ subsets: ["latin"] });

const Bg = () => {
  return (
    <div
      style={{ perspective: "1200px" }}
      className="w-full h-full absolute overflow-hidden"
    >
      <div
        style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
        className={[
          "absolute h-[50px] w-[200%] left-[-80%] top-[300px] w-full bg-red-100",
          "bg-gradient-to-bl from-cyan-400 via-cyan-600 to-cyan-800 opacity-50",
        ].join(" ")}
      ></div>

      <div
        style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
        className={[
          "absolute h-[30px] w-[200%] left-[-100%] top-[300px] w-full bg-red-100",
          "bg-gradient-to-bl from-cyan-400 via-cyan-600 to-cyan-800 opacity-25",
        ].join(" ")}
      ></div>

      <div
        style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
        className={[
          "absolute h-[100px] w-[200%] left-[-60%] top-[300px] w-full bg-red-100",
          "bg-gradient-to-bl from-cyan-400 via-cyan-600 to-cyan-800",
        ].join(" ")}
      >
        <div className="flex w-full h-full justify-end">
          <div className="w-[30%] h-[80%] rounded-full bg-gradient-to-l from-teal-100 to-transparent saturate-200"></div>
        </div>
      </div>

      <div
        style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
        className={[
          "absolute h-[50px] w-[200%] left-[-30%] top-[300px] w-full bg-red-100",
          "bg-gradient-to-bl from-cyan-400 via-cyan-600 to-cyan-800",
        ].join(" ")}
      ></div>

      <div
        style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
        className={[
          "absolute h-[50px] w-[200%] left-[10%] top-[300px] w-full bg-red-100",
          "bg-gradient-to-bl from-cyan-400 via-cyan-600 to-cyan-800",
        ].join(" ")}
      ></div>

      <div className="absolute w-full h-full backdrop-blur-[24px]"></div>
    </div>
  );
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
    <main className={`${inter.className} bg-neutral-100 text-neutral-700`}>
      
      <Spotlight
        className="-top-40 left-20 md:left-20 md:-top-20"
        fill="#0099ff"
      />
      <div className="flex h-screen w-screen bg-black">
        <div className="opacity-100  ">
          
          </div>
      
        <Sidebar />
        <div className="h-full py-2 pr-2 flex-1 ">
          <div className=" border bg-black   border-neutral-200/90 rounded-2xl mask w-full h-full p-4 overflow-y-auto">
          
            {children}
            
          </div>
        </div>
      </div>
    </main>
 );
}
