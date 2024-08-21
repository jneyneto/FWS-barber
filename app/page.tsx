import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({});
  const popularbarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div className="">
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Ney!</h2>
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
        <div className="mt-6">
          <span className="uppercase text-gray-400 font-bold text-xs">
            Agendamentos
          </span>
          <Card className="mt-2">
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge className="w-fit">Confirmado</Badge>
                <h3 className="font-semibold">Corte de cabelo</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png" />
                  </Avatar>
                  <span className="text-sm">Barbearia FSW</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center border-l p-5">
                <span className="text-sm">agosto</span>
                <span className="text-2xl">01</span>
                <span className="text-sm">09:00</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <span className="uppercase text-gray-400 font-bold text-xs">
            Recomendados
          </span>
          <div className="mt-2 gap-4 flex w-full overflow-auto [&:: -webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
        <div className="mt-6">
          <span className="uppercase text-gray-400 font-bold text-xs">
            Populares
          </span>
          <div className="mt-2 gap-4 flex w-full overflow-auto [&:: -webkit-scrollbar]:hidden">
            {popularbarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
