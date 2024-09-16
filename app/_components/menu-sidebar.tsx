"use client";

import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { quickSearchOptions } from "../_constants/quick-searsh";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { signOut, useSession } from "next-auth/react";
import SignInDialog from "./sign-in-dialog";

const MenuSideBar = () => {
  const { data } = useSession();
  const handleLogoutClick = () => signOut();

  return (
    <SheetContent className="w-[85%] overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <section className="flex flex-row gap-2 items-center border-b border-solid py-5">
        {!data?.user ? (
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <SignInDialog />
            </Dialog>
          </div>
        ) : (
          <>
            <Avatar className="w-11 h-11 border-solid border-purple-400">
              <AvatarImage src={data?.user.image ?? ""} />
            </Avatar>
            <div className="">
              <h3 className="font-bold">{data?.user?.name}</h3>
              <span className="text-xs text-gray-400">{data?.user?.email}</span>
            </div>
          </>
        )}
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
        <Button className="gap-2 justify-start" variant="ghost" asChild>
          <Link href="/bookings">
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>
      </section>

      <section className="flex flex-col py-5 gap-2 border-b border-solid">
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.id} asChild>
            <Button className="gap-2 justify-start" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </section>

      {data?.user && (
        <section className="py-5">
          <Button
            variant="ghost"
            className="justify-start gap-2 w-full"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} />
            Sair da conta!
          </Button>
        </section>
      )}
    </SheetContent>
  );
};

export default MenuSideBar;
