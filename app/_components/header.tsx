import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { quickSearchOptions } from "../_constants/quick-searsh";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <Card>
        <CardContent className="p-5 flex items-center justify-between">
          <Image alt="FSW Barber" src="/Logo.svg" height={18} width={120} />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <MenuIcon />
              </Button>
            </SheetTrigger>
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
                  <Button
                    className="gap-2 justify-start"
                    variant="ghost"
                    asChild
                  >
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
          </Sheet>
        </CardContent>
      </Card>
    </>
  );
};

export default Header;
