import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import BookingItem from "../_components/booking-item";

const Bookings = async () => {
  const user = await getServerSession(authOptions);
  if (!user?.user) {
    return notFound();
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (user.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (user.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <section className="p-5">
        <span className="uppercase text-gray-400 font-bold text-xs">
          Confirmados
        </span>
        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>
      <section className="px-5 pb-5">
        <span className="uppercase text-gray-400 font-bold text-xs">
          Finalizados
        </span>
        {concludedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>
    </>
  );
};

export default Bookings;
