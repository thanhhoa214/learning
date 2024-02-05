import { NextRequest } from "next/server";
import { CreateFormModel } from "./util";
import PinataSDK from "@pinata/sdk";

export async function POST(request: NextRequest) {
  const formModel: CreateFormModel = await request.json();
  const pinata = new PinataSDK({
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataSecretApiKey: process.env.PINATA_SECRET_KEY,
  });

  const { IpfsHash } = await pinata.pinJSONToIPFS(formModel);

  return Response.json(IpfsHash);
}
