"use server";

import { endOfDay, startOfDay } from "date-fns";
import { db } from "../_lib/prisma";

interface GetBookingsProp {
  serviceId: string;
  date: any;
}

export const getBookings = ({ date }: GetBookingsProp) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
};
