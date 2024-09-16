import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { isFuture, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
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

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date);

  return (
    <Card className="mt-2 min-w-[90%]">
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <h3 className="font-semibold">{booking.service.name}</h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.service.imageUrl} />
            </Avatar>
            <span className="text-sm">{booking.service.barbershop.name}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l p-5">
          <span className="text-sm capitalize">
            {format(booking.date, "MMMM", { locale: ptBR })}
          </span>
          <span className="text-2xl">
            {format(booking.date, "dd", { locale: ptBR })}
          </span>
          <span className="text-sm">
            {format(booking.date, "hh':'mm", { locale: ptBR })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
