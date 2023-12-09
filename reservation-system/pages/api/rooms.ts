import { NextApiRequest, NextApiResponse } from "next";

import { roomsRepo } from "@/repository";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET" && req.query.id)
    return res.status(200).json(roomsRepo.getById(req.query.id as string));
  if (req.method === "GET") res.status(200).json(roomsRepo.getRooms());
}
