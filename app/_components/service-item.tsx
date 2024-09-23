"use client";

import { BarbershopService, Booking } from "@prisma/client";
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
import { useEffect, useMemo, useState } from "react";
import { addDays, format, isPast, isToday, set } from "date-fns";
import { useSession } from "next-auth/react";
import createBooking from "../_actions/create-booking";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";
import { Dialog } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";

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

interface getTimeListProps {
  bookings: Booking[];
  selectedDay: Date;
}

const getTimeList = ({ bookings, selectedDay }: getTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);

    const timeListOnThePast = isPast(set(new Date(), { hours: hour, minutes }));
    if (timeListOnThePast && isToday(selectedDay)) {
      return false;
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    );

    if (hasBookingOnCurrentTime) {
      return false;
    }
    return true;
  });
};

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<String | undefined>(
    undefined,
  );
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false);

  useEffect(() => {
    if (!selectedDay) return;
    const fetch = async () => {
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };
    fetch();
  }, [selectedDay]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelect = (time: String) => {
    setSelectedTime(time);
  };

  const handleBookingClick = () => {
    if (!data) {
      return setSignInDialogIsOpen(true);
    }
  };

  const clearSelections = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBookings([]);
  };

  const handleBookingIfLogout = () => {
    handleBookingClick();
    clearSelections();
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
        date: newDate,
      });
      toast.success("Reserva criada com sucesso!");
    } catch {
      toast.error("Erro ao criar reserva!");
    }
  };

  const timeList = useMemo(() => {
    if (!selectedDay) return [];
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    });
  }, [dayBookings, selectedDay]);

  return (
    <>
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
                    onClick={data ? clearSelections : handleBookingIfLogout}
                  >
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="px-0 pt-3.5" hidden={!data}>
                  <SheetHeader className="items-start uppercase text-gray-400 pl-5 pb-7 font-bold border-b">
                    <h1>Fazer Reserva</h1>
                  </SheetHeader>
                  <section className="py-3 border-b">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      fromDate={addDays(new Date(), 0)}
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
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="rounded-full"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <span className="text-xs">
                          Não há horarios disponiveis para este dia.
                        </span>
                      )}
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
      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <SignInDialog />
      </Dialog>
    </>
  );
};

export default ServiceItem;
