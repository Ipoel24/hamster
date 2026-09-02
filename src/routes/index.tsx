import { createFileRoute } from "@tanstack/react-router";
import { HamsterHome } from "@/components/hamster-home";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <HamsterHome />;
}
