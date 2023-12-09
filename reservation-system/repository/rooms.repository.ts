import fs from "fs";

import { generateId, saveDataTo } from "./util";

export interface Room {
  id: string;
  name: string;
  capacity: number;
}

const rooms = JSON.parse(
  fs.readFileSync("repository/database/rooms.json", "utf8")
) as Room[];

export const roomsRepo = {
  getRooms: () => rooms,
  getById: (id: string) => rooms.find((room) => room.id === id),
  create: (room: Omit<Room, "id">) => {
    rooms.push({ ...room, id: generateId() });
    saveDataTo("room")(rooms);
  },
  cancel: (id: string) => {
    const index = rooms.findIndex((room) => room.id === id);
    rooms.splice(index, 1);
    saveDataTo("room")(rooms);
  },
};
