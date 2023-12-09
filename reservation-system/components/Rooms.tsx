import { useEffect, useState } from "react";

import { Room } from "../repository/rooms.repository";

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Rooms</h1>
      <table
        border={1}
        className="table-auto border-collapse border border-slate-400 border-spacing-1.5"
      >
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Room Name</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr
              key={room.id}
              className="border-collapse border border-slate-300"
            >
              <td>{room.id}</td>
              <td>{room.name}</td>
              <td>{room.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
