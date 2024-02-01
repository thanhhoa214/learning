"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import ReactPlayer from "react-player";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  link: z.string().min(2).max(50),
  type: z.enum(["audio", "video"], {
    required_error: "You need to select a download type.",
  }),
});

function downloadURI(uri: string, name: string) {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Home() {
  const [url, setUrl] = useState<string>();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { link: "", type: "video" },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const randomName = Math.random().toString(36).substring(2, 15);
    downloadURI(`/api?link=${values.link}&type=${values.type}`, randomName);
  }

  function onFileChange(file?: File) {
    if (!file) return;
    setUrl(URL.createObjectURL(file));
  }

  return (
    <section className="flex flex-col">
      <Card className="md:w-1/2 lg:w-3/4 p-4 m-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Download Youtube by link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full link" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-1"
                    >
                      {["video", "audio"].map((type) => (
                        <FormItem
                          key={type}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="font-normal">{type}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              variant="outline"
              type="button"
              size={"sm"}
              className="mr-4"
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                form.setValue("link", text);
              }}
            >
              Paste
            </Button>
            <Button type="submit" className="mr-4">
              Download
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => form.setValue("link", "")}
            >
              Clear text
            </Button>
          </form>
        </Form>
      </Card>
      <Card className="md:w-1/2 lg:w-3/4 p-4 m-4">
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
          <Label htmlFor="Video">Video</Label>
          <Input
            id="Video"
            type="file"
            onChange={(e) => onFileChange(e.target.files?.[0])}
            accept="video/*"
            width="100%"
          />
        </div>
        <div className="relative pt-[56.25%] rounded-md overflow-hidden">
          <ReactPlayer
            url={url}
            controls
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </div>
      </Card>
    </section>
  );
}
