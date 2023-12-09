import { NextApiRequest, NextApiResponse } from "next";

import { usersRepo } from "@/repository";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") res.status(200).json(usersRepo.getUsers());
}
