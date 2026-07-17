import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Subscriptions } from "./components/Subscriptions";
import { Proxies } from "./components/Proxies";
import { BypassTools } from "./components/BypassTools";
import { FAQ } from "./components/FAQ";
import { Team } from "./components/Team";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Subscriptions />
      <Proxies />
      <BypassTools />
      <FAQ />
      <Team />
    </>
  );
}
