import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <Button href="/dashboard">Click me</Button>
    </div>
  );
}
