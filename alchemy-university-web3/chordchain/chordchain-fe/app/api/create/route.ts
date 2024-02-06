import { NextRequest } from "next/server";
import { CreateFormModel } from "./util";
import PinataSDK from "@pinata/sdk";
import { keccak256, toBytes } from "viem";

export async function POST(request: NextRequest) {
  const formModel: CreateFormModel = await request.json();
  const pinata = new PinataSDK({
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataSecretApiKey: process.env.PINATA_SECRET_KEY,
  });

  const hash = keccak256(toBytes(formModel.name)).slice(2, 12);

  const { IpfsHash } = await pinata.pinJSONToIPFS(
    { ...formModel },
    {
      pinataMetadata: { name: `${hash}.json` },
    }
  );

  return Response.json(IpfsHash);
}
