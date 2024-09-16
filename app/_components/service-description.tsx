import { Prisma } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ServiceDescriptionProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

const ServiceDescription = ({ booking }: ServiceDescriptionProps) => {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{booking.service.name}</h3>
          <h3 className="text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(booking.service.price))}
          </h3>
        </div>
        <div className="flex items-center justify-between pt-3">
          <h3 className="text-sm text-gray-400">Dia</h3>
          <h3 className="text-sm">
            {format(booking.date, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </h3>
        </div>
        <div className="flex items-center justify-between pt-3">
          <h3 className="text-sm text-gray-400">Horario</h3>
          <span className="text-sm">
            {format(booking.date, "hh':'mm", { locale: ptBR })}
          </span>
        </div>
        <div className="flex items-center justify-between pt-3">
          <h3 className="text-sm text-gray-400">Barbearia</h3>
          <h3 className="text-sm">{booking.service.barbershop.name}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceDescription;
