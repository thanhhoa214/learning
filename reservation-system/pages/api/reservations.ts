import { NextApiRequest, NextApiResponse } from "next";

import { reservationsRepo } from "@/repository";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET" && req.query.id)
    return res
      .status(200)
      .json(reservationsRepo.getById(req.query.id as string));
  if (req.method === "GET")
    return res.status(200).json(reservationsRepo.getReservations());

  if (req.method === "POST") {
    try {
      const reservation = reservationsRepo.create(req.body);
      return res.status(200).json(reservation);
    } catch (error: any) {
      return res.status(403).json({ error: error.message });
    }
  }
  if (req.method === "DELETE" && req.query.id) {
    reservationsRepo.cancel(req.query.id as string);
    return res.status(200).json({});
  }
}
