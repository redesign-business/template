import { useEffect, useLayoutEffect, useState } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(query: string, defaultValue = false): boolean {
  const getMatches = () => (IS_SERVER ? defaultValue : window.matchMedia(query).matches);
  const [matches, setMatches] = useState(getMatches);

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    const handleChange = () => setMatches(matchMedia.matches);
    handleChange();
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
