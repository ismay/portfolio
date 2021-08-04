import * as Panelbear from "@panelbear/panelbear-js";
import { useRouter } from "next/router";
import { useEffect } from "react";

const defaultConfig = {};

export default function usePanelbear(site, config = defaultConfig) {
  const router = useRouter();

  useEffect(() => {
    Panelbear.load(site, config);
    Panelbear.trackPageview();

    const handleRouteChange = () => Panelbear.trackPageview();
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [config, router.events, site]);
}
