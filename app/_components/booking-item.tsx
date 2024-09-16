"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { isFuture, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import ServiceDescription from "./service-description";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";

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

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cancelar reserva. Tente novamente!");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
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
                <span className="text-sm">
                  {booking.service.barbershop.name}
                </span>
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
      </SheetTrigger>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left"> Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="flex relative items-end h-[180px] w-full border-t mt-5">
          <Image
            alt="Mapa"
            src="/map.png"
            fill
            className="rounded-xl object-cover"
          />
          <Card className="z-50 mb-3 mx-5 w-full rounded-xl">
            <CardContent className="flex flex-row items-center gap-4 px-5 py-3">
              <Avatar>
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="text-sm font-bold">
                  {booking.service.barbershop.name}
                </h3>
                <span className="text-xs">
                  {booking.service.barbershop.address}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <section className="mt-5">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <div className="py-3">
            <ServiceDescription booking={booking} />
          </div>
          {booking.service.barbershop.phones.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </section>
        <SheetFooter className="mt-7">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    Cancelar Reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[80%] rounded-xl">
                  <DialogHeader>
                    <DialogTitle>Você quer cancelar sua reserva?</DialogTitle>
                    <DialogDescription>
                      Esta ação é irrevercível. Tem certeza que quer prosseguir
                      com o cancelamento?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="outline" className="w-full">
                        cancelar
                      </Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleCancelBooking}
                    >
                      confirmar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
