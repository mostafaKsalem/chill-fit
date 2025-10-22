import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const pathName = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathName]);
  return null;
}

export default ScrollToTop;
