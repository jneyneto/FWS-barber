"use client";

import { BarbershopService } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { format, set } from "date-fns";
import { useSession } from "next-auth/react";
import createBooking from "../_actions/create-booking";
import { toast } from "sonner";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: string;
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<String | undefined>(
    undefined,
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelect = (time: String) => {
    setSelectedTime(time);
  };

  const clearSelections = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
  };

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return;
      const hour = Number(selectedTime.split(":")[0]);
      const minute = Number(selectedTime.split(":")[1]);
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      });
      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      });
      toast.success("Reserva criada com sucesso!");
    } catch {
      toast.error("Erro ao criar reserva!");
    }
  };

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

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!data}
                  onClick={clearSelections}
                >
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="px-0 pt-3.5">
                <SheetHeader className="items-start uppercase text-gray-400 pl-5 pb-7 font-bold border-b">
                  <h1>Fazer Reserva</h1>
                </SheetHeader>
                <section className="py-3 border-b">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </section>
                {selectedDay && (
                  <section className="border-b p-5 flex gap-2 overflow-auto [&:: -webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </section>
                )}
                {selectedTime && selectedDay && (
                  <section className="p-5">
                    <Card>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold">{service.name}</h3>
                          <h3 className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between pt-3">
                          <h3 className="text-sm text-gray-400">Dia</h3>
                          <h3 className="text-sm">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between pt-3">
                          <h3 className="text-sm text-gray-400">Horario</h3>
                          <h3 className="text-sm">{selectedTime}</h3>
                        </div>
                        <div className="flex items-center justify-between pt-3">
                          <h3 className="text-sm text-gray-400">Barbearia</h3>
                          <h3 className="text-sm">{barbershop}</h3>
                        </div>
                      </CardContent>
                    </Card>
                    <SheetFooter className="pt-5">
                      <SheetClose asChild>
                        <Button type="submit" onClick={handleCreateBooking}>
                          Confirmar
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </section>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
