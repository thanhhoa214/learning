"use client";
import { useEffect, useState } from "react";

import { format, isValid } from "date-fns";

import { Room, User } from "@/repository";

import { Reservation } from "../repository/reservations.repository";

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const fetchReservations = () => {
    fetch("/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data));
  };

  useEffect(() => {
    fetchReservations();
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleCancel = async (reservationId: string) => {
    await fetch(`/api/reservations?id=${reservationId}`, {
      method: "DELETE",
    });
    fetchReservations();

    alert(`Reservation ${reservationId} has been cancelled successfully`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Reservations</h1>
      <table
        border={1}
        className="table-auto border-collapse border border-slate-400 border-spacing-1.5"
      >
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Room</th>
            <th>Start</th>
            <th>End</th>
            <th>Booked by</th>
            <th>Created at</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr
              key={reservation.id}
              className="border-collapse border border-slate-300"
            >
              <td>{reservation.id}</td>
              <td>{getRoomName(reservation.roomId, rooms)}</td>
              <td>{formatDate(reservation.start)}</td>
              <td>{formatDate(reservation.end)}</td>
              <td>{getUserName(reservation.userId, users)}</td>
              <td>{formatDate(reservation.createdAt)}</td>
              <td>
                <button
                  onClick={() => handleCancel(reservation.id)}
                  className="text-red-500"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function formatDate(date: string) {
  if (!date) return "";
  const parsedDate = new Date(date);

  if (isValid(parsedDate)) return format(parsedDate, "HH:mm dd/MM/yyyy");
  return "";
}

function getUserName(userId: string, users: User[]) {
  const user = users.find((user) => user.id === userId);
  if (user) return user.name;
  return "";
}

function getRoomName(roomId: string, rooms: Room[]) {
  const room = rooms.find((room) => room.id === roomId);
  if (room) return room.name;
  return "";
}
