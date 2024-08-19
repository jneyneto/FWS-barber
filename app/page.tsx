import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Header />
      <div className="p-5">
        <h2>Olá, Ney</h2>
        <span>data ...</span>
        <form className="flex items-center gap-2 mt-2">
          <Input placeholder="Faça sua busca ..."></Input>
          <Button>
            <SearchIcon />
          </Button>
        </form>
        <div className="relative w-full h-[150px] mt-6">
          <Image
            alt="Agende com os melhores!"
            src="/banner.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
