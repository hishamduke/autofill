import React from "react";
import { ModeToggle } from "@/components/toggle";
import Link from "next/link";

function Header() {
  return (
    <div className="my-6 flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="text-4xl font-black tracking-wider">Autofill gen</h1>
      </Link>
      <ModeToggle />
    </div>
  );
}

export default Header;
