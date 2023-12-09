"use client";
import { useEffect, useState } from "react";

import CreateReservation from "@/components/CreateReservation";
import Reservations from "@/components/Reservations";
import Rooms from "@/components/Rooms";
import { User } from "@/repository";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      {/* Select box for switching between 2 users */}
      <select className="p-2 rounded-md">
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <div className="flex gap-4 px-8">
        <Reservations />
        <hr />
        <Rooms />
        <hr />
        <CreateReservation />
      </div>
    </div>
  );
}
