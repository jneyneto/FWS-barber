import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { quickSearchOptions } from "../_constants/quick-searsh";
import Link from "next/link";
import Image from "next/image";

const MenuSideBar = () => {
  return (
    <SheetContent className="w-[85%] overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <section className="flex flex-row gap-2 items-center border-b border-solid py-5">
        <Avatar className="w-11 h-11 border-solid border-purple-400">
          <AvatarImage src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png" />
        </Avatar>
        <div className="">
          <h3 className="font-bold">José Ney</h3>
          <span className="text-xs text-gray-400">email.email.com</span>
        </div>
      </section>
      <section className="flex flex-col gap-2 py-5 border-b border-solid">
        <SheetClose asChild>
          <Button className="gap-2 justify-start" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              inicio
            </Link>
          </Button>
        </SheetClose>
        <Button className="gap-2 justify-start" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </section>
      <section className="flex flex-col py-5 gap-2 border-b border-solid">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.id}
            className="gap-2 justify-start"
            variant="ghost"
          >
            <Image
              size={18}
              alt={option.title}
              src={option.imageUrl}
              height={18}
              width={18}
            />
            {option.title}
          </Button>
        ))}
      </section>

      <section className="py-5">
        <Button variant="ghost" className="gap-2">
          <LogOutIcon size={18} />
          Sair da conta!
        </Button>
      </section>
    </SheetContent>
  );
};

export default MenuSideBar;
