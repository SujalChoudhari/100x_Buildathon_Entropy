import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import ThemeBasedImage from "@/components/theme-based-image";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import Link from "next/link";

type Props = HTMLAttributes<HTMLDivElement>;

const Header = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "container px-4 flex flex-col md:flex-row items-center gap-20 my-[100px] md:my-[160px]",
        className
      )}
      {...props}
    >
      <div className="w-full md:max-w-[500px] text-center md:text-start">

        <h4 className="mt-4 text-5xl font-bold text-secondary-foreground">
          Start Your Sales Process with Our{" "}
          <p className="scroll-m-20 text-4xl text-black font-extrabold tracking-tight lg:text-5xl dark:drop-shadow-[0_0_0.3rem_#2b15ed] dark:invert">
            Cleo
          </p>
        </h4>
        <p className="text-lg font-medium text-secondary-foreground my-7">
          CLEO is a revolutionary tool designed to streamline the sales process by gathering customer data and generating tailored sales proposals efficiently.
        </p>
        <Link href="/login">
          <button className="mt-4 group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
            <span className="absolute left-0 top-0 size-full rounded-md border border-dashed border-red-50 shadow-inner shadow-white/30 group-active:shadow-white/10"></span>
            <span className="absolute left-0 top-0 size-full rotate-180 rounded-md border-red-50 shadow-inner shadow-black/30 group-active:shadow-black/10"></span>
            Get started
          </button>

        </Link>


        
      </div>

      <div className="flex justify-center rounded-lg md:justify-end">
        <ThemeBasedImage
          width={2000}
          height={2000}
          lightSrc="/"
          darkSrc="/cleo.png"
          alt="shadcnkit"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Header;
