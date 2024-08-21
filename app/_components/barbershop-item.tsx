import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="w-[159px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        <div className="relative h-[159px] w-full">
          <Image
            alt={barbershop.name}
            src={barbershop.imageUrl}
            fill
            className="object-cover rounded-2xl"
          />
          <Badge className="absolute top-2 left-2" variant="secondary">
            <StarIcon size={12} className="fill-primary text-primary" />
            <span className="text-xs font-semibold"> 5,0</span>
          </Badge>
        </div>
        <div className="px-1 py-3">
          <h3 className="font-semibold truncate">{barbershop.name}</h3>
          <p className="text-xm text-gray-400 truncate">{barbershop.address}</p>
          <Button variant="secondary" className="w-full mt-3">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
