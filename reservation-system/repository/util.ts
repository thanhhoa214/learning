export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function saveDataTo(type: "room" | "reservation" | "user") {
  return (data: unknown) => {
    const fs = require("fs");
    fs.writeFileSync(`repository/database/${type}s.json`, JSON.stringify(data));
  };
}
