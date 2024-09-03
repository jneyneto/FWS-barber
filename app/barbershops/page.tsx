import BarbershopItem from "../_components/barbershop-item";
import BarbershopsSearch from "../_components/barbershop-search";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <div className="">
      <Header />
      <div className="mt-5">
        <BarbershopsSearch />
      </div>

      <section className="p-5">
        <h2 className="text-xs text-gray-400 uppercase font-bold">
          Resultados para &quot;{searchParams.search}&quot;
        </h2>

        <div className="grid grid-cols-2 gap-4 mt-2">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BarbershopPage;
