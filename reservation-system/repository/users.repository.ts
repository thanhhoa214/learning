import fs from "fs";

export interface User {
  id: string;
  name: string;
}

const users = JSON.parse(
  fs.readFileSync("repository/database/users.json", "utf8")
) as User[];

export const usersRepo = {
  getUsers: () => users,
  getById: (id: string) => users.find((user) => user.id === id),
};
