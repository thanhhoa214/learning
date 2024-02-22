import { createHash } from "crypto";
import { Configuration, OpenAIApi } from "openai";
import { readFile } from "fs/promises";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const supabaseApiKey = process.env.SUPABASE_API_KEY as string;
const supabaseUrl = process.env.SUPABASE_URL as string;
const openaiApiKey = process.env.OPENAI_API_KEY as string;

const openaiConfiguration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(openaiConfiguration);

export function getHashedUserId(userId: string) {
  return createHash("md5").update(userId).digest("hex");
}

export async function pushDataAsDocumentsToSupabase() {
  const file = await readFile(`${process.cwd()}/public/scrimba-info.txt`, {
    encoding: "utf8",
  });
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  const documents = await splitter.createDocuments([file]);
  const supabaseClient = createClient(supabaseUrl, supabaseApiKey);
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: openaiApiKey });
  await SupabaseVectorStore.fromDocuments(documents, embeddings, {
    client: supabaseClient,
    tableName: "documents",
  });
}

const supabaseClient = createClient(supabaseUrl, supabaseApiKey);
const embeddings = new OpenAIEmbeddings({ openAIApiKey: openaiApiKey });
const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
});
export const supabaseRetriver = vectorStore.asRetriever();
