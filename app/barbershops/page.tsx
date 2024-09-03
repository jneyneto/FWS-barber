import BarbershopItem from "../_components/barbershop-item";
import BarbershopsSearch from "../_components/barbershop-search";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarbershopPageProps {
  searchParams: {
    title?: string;
    service?: string;
  };
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams?.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
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
          Resultados para &quot;{searchParams.title || searchParams.service}
          &quot;
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
