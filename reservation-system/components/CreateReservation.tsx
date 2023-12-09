"use client";
import { useEffect, useState } from "react";

import { Room } from "@/repository";

export default function CreateReservation() {
  const [roomId, setRoomId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, userId: "2", start, end }),
    }).then((response) => {
      // TODO: Use state management to update the UI
      if (response.ok) location.reload();
      else response.json().then((r) => alert(r.error));
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Create Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roomId" className="block font-semibold mb-1 mt-4">
            Room
          </label>
          <select
            id="roomId"
            name="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="start" className="block font-semibold mb-1 mt-4">
            Start
          </label>
          <input
            id="start"
            type="datetime-local"
            name="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="end" className="block font-semibold mb-1 mt-4">
            End
          </label>
          <input
            id="end"
            type="datetime-local"
            name="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
        <button type="submit" className="mt-4 w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
