"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LyricPreview from "@/components/ui2/LyricPreview";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AppWindow, Loader, UploadCloud } from "lucide-react";
import { FormEventHandler, MouseEventHandler, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreateFormModel, createFormSchema } from "../api/create/util";

const lyricPlaceholder = `Tông gốc, Capo 5
===
Hạt bụi [Am]nào hóa kiếp thân tôi
Để một [Dm]mai vươn hình hài lớn dậy
`;

export default function CreatePage() {
  const [previewOpened, setPreviewOpened] = useState(false);
  const [alertOpened, setAlertOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateFormModel>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "Nothing gonna change my love for you",
      lyric: lyricPlaceholder,
    },
  });

  const openAlert = () => setAlertOpened(true);
  const onSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
    setLoading(true);
    await axios.post("/api/create", form.watch());
    setLoading(false);
    console.log("post successfully");
  };

  return (
    <>
      <div className="px-8 py-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Post your chord</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(openAlert)} className="space-y-4">
            <div className="flex items-start gap-8">
              <div className="w-full space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Song name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nothing's Gonna Change My Love for You"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lyric"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">
                        Lyric with chords
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="appearance-none inline-flex gap-1 underline underline-offset-2 hover:text-primary"
                              type="button"
                              onClick={() =>
                                form.watch("lyric") && setPreviewOpened(true)
                              }
                            >
                              <AppWindow size={16} />
                              Preview
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {
                              <p>
                                {form.watch("lyric")
                                  ? "Preview lyric"
                                  : "Nothing to preview"}
                              </p>
                            }
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={lyricPlaceholder}
                          className="h-80"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can use <strong>[Am]</strong> to indicate chord next
                        to the word
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-8 border border-dashed border-slate-400 rounded-md px-4 py-6 relative">
                <strong className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white border border-slate-400 rounded py-1 px-3 text-slate-700">
                  Optional fields
                </strong>
                <section className="flex flex-col gap-4 w-60">
                  <FormField
                    control={form.control}
                    name="composer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Composer</FormLabel>
                        <FormControl>
                          <Input placeholder="Beethoven" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <FormControl>
                          <Input placeholder="pop, acoustic" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
                <section className="flex flex-col gap-4 w-60">
                  <FormField
                    control={form.control}
                    name="artist.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Artist name</FormLabel>
                        <FormControl>
                          <Input placeholder="Alan Walker" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="artist.tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tone</FormLabel>
                        <FormControl>
                          <Input placeholder="Am, F, G, C" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="artist.musicLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Youtube, Spotify, ..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
              </div>
            </div>
            <Button type="submit">
              {loading ? <Loader className="animate-spin" /> : <UploadCloud />}
              <span className="ml-2">Submit</span>
            </Button>
          </form>
        </Form>
      </div>

      <Dialog open={previewOpened} onOpenChange={setPreviewOpened}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview your lyric with chords</DialogTitle>
            <DialogDescription>
              Every change further will be charged, please carefully review your
              song before submission.
            </DialogDescription>
          </DialogHeader>

          <div className="pt-10 border-t">
            <LyricPreview lyric={form.watch("lyric")} className="mx-auto" />
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertOpened} onOpenChange={setAlertOpened}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Did you careful review your submission?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently store your
              song on-chain and further changes will be costly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit}>
              Yes, I reviewed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
