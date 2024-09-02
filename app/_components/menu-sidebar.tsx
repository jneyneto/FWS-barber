import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
// import { Avatar, AvatarImage } from "./ui/avatar";
import { quickSearchOptions } from "../_constants/quick-searsh";
import Link from "next/link";
import Image from "next/image";
import {
  DialogDescription,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const MenuSideBar = () => {
  return (
    <SheetContent className="w-[85%] overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <section className="flex flex-row gap-2 items-center border-b border-solid py-5">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-bold">Olá, faça seu login!</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <LogInIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[80%] min-h-[150px] items-center rounded-lg">
              <DialogHeader className="gap-4">
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                  Conecte-se usando sua conta Google.
                </DialogDescription>
              </DialogHeader>
              <Button
                className="gap-2 items-center font-semibold"
                variant="outline"
              >
                <Image
                  alt="Login com Google"
                  src="/google.svg"
                  width={18}
                  height={18}
                />
                Google
              </Button>
            </DialogContent>
          </Dialog>
        </div>
        {/* <Avatar className="w-11 h-11 border-solid border-purple-400">
          <AvatarImage src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png" />
        </Avatar>
        <div className="">
          <h3 className="font-bold">José Ney</h3>
          <span className="text-xs text-gray-400">email.email.com</span>
        </div> */}
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
