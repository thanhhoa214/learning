import { differenceInMilliseconds } from "date-fns";
import fs from "fs";

import { generateId, saveDataTo } from "./util";

export interface Reservation {
  id: string;
  roomId: string;
  userId: string;
  start: string;
  end: string;
  createdAt: string;
}

const reservations = JSON.parse(
  fs.readFileSync("repository/database/reservations.json", "utf8")
) as Reservation[];

export const reservationsRepo = {
  getReservations: () => reservations,
  getById: (id: string) =>
    reservations.find((reservation) => reservation.id === id),
  getByUserId: (userId: string) =>
    reservations.filter((reservation) => reservation.userId === userId),
  getByRoomId: (roomId: string) =>
    reservations.filter((reservation) => reservation.roomId === roomId),

  create: (reservation: Omit<Reservation, "id" | "createdAt">) => {
    const startDate = new Date(reservation.start);
    const endDate = new Date(reservation.end);

    // Check the end date is after the start date
    if (differenceInMilliseconds(endDate, startDate) < 0) {
      throw new Error("End date must be after start date");
    }
    // Check the room is available by checking any reservation before intersecting with the new "start" and "end" dates
    if (
      reservations.some(
        (r) =>
          r.roomId === reservation.roomId &&
          differenceInMilliseconds(endDate, new Date(r.start)) < 0 &&
          differenceInMilliseconds(startDate, new Date(r.end)) > 0
      )
    ) {
      throw new Error("Room is not available");
    }

    const reservationWithId = {
      ...reservation,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    reservations.push(reservationWithId);
    saveDataTo("reservation")(reservations);
    return reservationWithId;
  },
  cancel: (id: string) => {
    const index = reservations.findIndex(
      (reservation) => reservation.id === id
    );
    reservations.splice(index, 1);
    saveDataTo("reservation")(reservations);
  },
};
