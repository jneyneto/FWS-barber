import { BarbershopService } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="p-2">
      <CardContent className="flex items-center gap-2 p-0">
        <div className="relative min-w-[110px] min-h-[110px]">
          <Image
            alt={service.name}
            fill
            src={service.imageUrl}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="p-2 space-y-2">
          <h3 className="font-semobold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold text-sm">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </span>
            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
