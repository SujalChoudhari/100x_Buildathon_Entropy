import Footer from "@/components/landings/footer";
import LandingNavbar from "@/components/landings/landing-navbar";
import Demos from "@/components/landings/demos";
import Header from "@/components/landings/header";


import Pricing from "@/components/landings/pricing";
import SkewedInfiniteScroll from "@/components/scroll";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Page() {
  return (
    <main>
      <Spotlight
        className="-top-40 left-20 md:left-0 md:-top-20"
        fill="#0099ff"
      />
      <Header />
      <SkewedInfiniteScroll/>
      <Demos />
      <Footer />
    </main>
  );
}