import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/quick-searsh";
import BookingItem from "./_components/booking-item";
import BarbershopsSearch from "./_components/barbershop-search";

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
        <section>
          <h2 className="text-xl font-bold">Olá, Ney!</h2>
          <span>data ...</span>
          <BarbershopsSearch />
          {/* <form className="flex items-center gap-2 mt-2">
            <Input placeholder="Faça sua busca ..."></Input>
            <Button>
              <Link>
              <SearchIcon />
              </Link>
            </Button>
          </form> */}
          <div className="mt-6 gap-3 flex w-full overflow-auto [&:: -webkit-scrollbar]:hidden">
            {quickSearchOptions.map((option) => (
              <Button key={option.id} variant="secondary" className="gap-2">
                <Image alt="" src={option.imageUrl} width={16} height={16} />
                {option.title}
              </Button>
            ))}
          </div>
        </section>
        <div className="relative w-full h-[150px] mt-6">
          <Image
            alt="Agende com os melhores!"
            src="/banner.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <section className="mt-6">
          <span className="uppercase text-gray-400 font-bold text-xs">
            Agendamentos
          </span>
          <BookingItem />
        </section>
        <section className="mt-6">
          <span className="uppercase text-gray-400 font-bold text-xs">
            Recomendados
          </span>
          <div className="mt-2 gap-4 flex w-full overflow-auto [&:: -webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>
        <section className="mt-6">
          <span className="uppercase text-gray-400 font-bold text-xs">
            Populares
          </span>
          <div className="mt-2 gap-4 flex w-full overflow-auto [&:: -webkit-scrollbar]:hidden">
            {popularbarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
