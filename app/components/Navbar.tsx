import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="border py-3">
      <div className="mx-auto flex max-w-4xl items-center justify-between ">
        <Link href="/" className="text-xl font-bold">
          Job Flex
        </Link>
        <Button asChild>
          <Link href="/jobs/new">Post a job</Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
