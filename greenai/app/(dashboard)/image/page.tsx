"use client";

import { useState } from 'react';

import axios from 'axios';
import Image from 'next/image';
import { CreateImageRequestSizeEnum } from 'openai';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import * as ImageApi from '@/models/api/image';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  formSchema,
  getWidthFromImageSize,
  ImagePromptSchema,
  MAX_IMAGE_COUNT,
  MIN_IMAGE_COUNT,
} from './util';

export default function ImagePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ImageApi.PostResponse | null>(null);

  const form = useForm<ImagePromptSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      numberOfImages: 1,
      pixelSize: "256x256",
    },
  });

  async function onSubmit({
    prompt,
    numberOfImages,
    pixelSize,
  }: ImagePromptSchema) {
    try {
      setResponse(null);
      setIsLoading(true);

      const params: ImageApi.PostParams = {
        prompt,
        amount: numberOfImages,
        size: pixelSize,
      };

      const { data } = await axios.post<ImageApi.PostResponse>(
        "/api/image",
        params
      );
      setResponse(data);
    } catch (error: unknown) {
      console.log((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap items-start gap-4 md:flex-nowrap"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Input placeholder="Funny shiba dog in universe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfImages"
            render={({ field }) => (
              <FormItem className="flex-shrink-0 w-44">
                <FormLabel>Number of images</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Choose number of images"
                    type="number"
                    min={MIN_IMAGE_COUNT}
                    max={MAX_IMAGE_COUNT}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pixelSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pixel size</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[8rem]">
                      <SelectValue placeholder="Choose pixel size" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(CreateImageRequestSizeEnum).map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-8">
            Generate
          </Button>
        </form>
      </Form>

      <section className="mt-8 flex gap-4">
        {isLoading &&
          Array(form.getValues("numberOfImages"))
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="rounded-lg"
                style={{
                  width: getWidthFromImageSize(form.getValues("pixelSize")),
                  height: getWidthFromImageSize(form.getValues("pixelSize")),
                }}
              />
            ))}
        {!isLoading &&
          response &&
          response.data.data
            .filter((img) => !!img.url)
            .map((img) => (
              <Card key={img.url} className="w-fit">
                <Image
                  src={img.url || ""}
                  width={getWidthFromImageSize(response.params.size)}
                  height={getWidthFromImageSize(response.params.size)}
                  alt={form.getValues("prompt")}
                  className="rounded-md object-cover"
                />
              </Card>
            ))}
      </section>
    </main>
  );
}
