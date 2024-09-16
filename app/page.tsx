import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/quick-searsh";
import BookingItem from "./_components/booking-item";
import BarbershopsSearch from "./_components/barbershop-search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({});
  const popularbarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  const user = await getServerSession(authOptions);

  const bookings = user?.user
    ? await db.booking.findMany({
        where: {
          userId: (user.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : [];

  return (
    <div className="">
      <Header />
      <div className="p-5">
        <section>
          <h2 className="text-xl font-bold">Olá, Ney!</h2>
          <span>data ...</span>
          <BarbershopsSearch />
          <div className="mt-6 gap-3 flex w-full overflow-auto [&:: -webkit-scrollbar]:hidden">
            {quickSearchOptions.map((option) => (
              <Button
                key={option.id}
                variant="secondary"
                className="gap-2"
                asChild
              >
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image alt="" src={option.imageUrl} width={16} height={16} />
                  {option.title}
                </Link>
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
        {bookings.length > 0 && (
          <section className="mt-6">
            <span className="uppercase text-gray-400 font-bold text-xs">
              Agendamentos
            </span>
            <div className="gap-4 flex w-full overflow-auto [&:: -webkit-scrollbar]:hidden">
              {bookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </section>
        )}
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
