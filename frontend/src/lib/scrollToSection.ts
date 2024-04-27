import { scroller } from "react-scroll";

export const scrollToSection = (className: string) => {
  scroller.scrollTo(className, {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};
