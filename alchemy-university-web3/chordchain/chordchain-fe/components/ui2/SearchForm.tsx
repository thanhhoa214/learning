"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import useChordchainAssets from "@/hooks/useChordchainAssets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "../ui/button";
import { SearchFormValue, searchFormSchema } from "@/app/api/chords/types";
import { useEffect } from "react";

export interface SearchFormProps {
  value?: SearchFormValue;
  onSubmit: (values: SearchFormValue) => void;
}

export default function SearchForm(props: SearchFormProps) {
  const assets = useChordchainAssets();
  const form = useForm<SearchFormValue>({
    resolver: zodResolver(searchFormSchema),
  });

  useEffect(() => {
    setTimeout(() => {
      form.setValue("query", props.value?.query);
      form.setValue("genre", props.value?.genre);
      form.setValue("tone", props.value?.tone);
    }, 100);
  }, [form, props.value]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className="flex gap-4 mb-6"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <Input
              placeholder="Search chords by song's name, lyric, composer, artist"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={
                    <span className="text-muted-foreground">Genre</span>
                  }
                />{" "}
              </SelectTrigger>

              <SelectContent>
                {assets.data?.genres.map((g, index) => (
                  <SelectItem value={`${index}`} key={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={
                    <span className="text-muted-foreground">Tone</span>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {assets.data?.tones.map((t, index) => (
                  <SelectItem value={`${index}`} key={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <Button className="gap-1">
          <Search size={20} /> Search
        </Button>
      </form>
    </Form>
  );
}
