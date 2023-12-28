import { NextRequest } from "next/server";
import { deleteQuizById } from "../type";

export async function DELETE(request: NextRequest) {
  const id = request.url.split("/").pop();
  if (!id) return Response.json(new Error("Not found error"), { status: 404 });
  await deleteQuizById(id);
  return Response.json({ id });
}
