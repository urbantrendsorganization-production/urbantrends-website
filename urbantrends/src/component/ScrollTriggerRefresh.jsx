import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerRefresh() {
  const location = useLocation();

  useEffect(() => {
    // Refresh ScrollTrigger after route changes
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }, [location.pathname]);

  return null;
}

export default ScrollTriggerRefresh;
