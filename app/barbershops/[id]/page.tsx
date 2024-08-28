import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopPageProps {
  params: {
    id: string;
  };
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <div>
      <section className="relative w-full h-[250px]">
        <Image
          alt={barbershop?.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </section>
      <section className="p-5 border-b border-solid">
        <h1 className="text-xl font-bold">{barbershop?.name}</h1>
        <div className="flex pt-3 gap-2 items-center">
          <MapPinIcon className=" text-primary" size={18} />
          <span className="text-sm">{barbershop?.address}</span>
        </div>
        <div className="flex pt-2 gap-2 items-center">
          <StarIcon className="fill-primary text-primary" size={18} />
          <span className="text-sm">5,0 (999 avaliações)</span>
        </div>
      </section>
      <section className="p-5 border-b border-solid space-y-2">
        <h2 className="text-xs text-gray-400 font-semibold uppercase">
          Sobre nós
        </h2>
        <p className="text-sm text-justify">{barbershop?.description}</p>
      </section>
      <section className="p-5 border-b border-solid">
        <h2 className="text-xs text-gray-400 font-semibold uppercase">
          serviços
        </h2>
      </section>
    </div>
  );
};

export default BarbershopPage;
