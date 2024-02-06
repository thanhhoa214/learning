"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";

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
} from "@/components/ui/alert-dialog";
import {
  AppWindow,
  ExternalLink,
  Loader2,
  UploadCloud,
  XCircle,
} from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { useContractWrite } from "wagmi";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreateFormModel, createFormSchema } from "../api/create/util";
import { chordchainContractConfig } from "@/lib/chordchain-contract";
import { toast } from "sonner";
import { SimulateContractErrorType } from "viem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const lyricPlaceholder = `If I [C]had to [G/B]live my life [Am]without you near me
The days would [C]all be empty
The nights [C]would seem so long
 
With you, I see forever oh so clearly
I might have been [G]in love before
But it [Am]never felt this strong`;

export default function CreatePage() {
  const [previewOpened, setPreviewOpened] = useState(false);
  const [alertOpened, setAlertOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const { writeAsync } = useContractWrite({
    ...chordchainContractConfig,
    functionName: "safeMint",
  });
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

    const { data } = await axios.post<CreateFormModel, AxiosResponse<string>>(
      "/api/create",
      form.watch()
    );
    try {
      const { hash } = await writeAsync({ args: [data] });
      setLoading(false);
      toast(
        `Your song has been submitted. It may take a while due to network traffic.`,
        {
          action: {
            label: (
              <span className="inline-flex items-center gap-1">
                Etherscan <ExternalLink size={12} />
              </span>
            ),
            onClick: () =>
              window.open(`https://goerli.etherscan.io/tx/${hash}`, "_blank"),
          },
        }
      );
    } catch (e) {
      const error = e as SimulateContractErrorType;

      setLoading(false);
      toast(error.name, {
        description: (
          <code className="bg-slate-800 text-slate-100 block max-h-20 overflow-auto p-2 rounded">
            {error.message}
          </code>
        ),
        icon: <XCircle size={24} className="mt-1" />,
        className: "!text-red-500 !items-start",
      });
    }
  };

  return (
    <main className="min-h-screen p-8">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>Post your chord</CardTitle>
          <CardDescription>
            Post your chord to the chain in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                          You can use <strong>[Am]</strong> to indicate chord
                          next to the word
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Card className="flex gap-8 border border-dashed border-slate-400 rounded-md px-4 py-6 relative">
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
                </Card>
              </div>
              <Button type="submit">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <UploadCloud />
                )}
                <span className="ml-2">Submit</span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

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
    </main>
  );
}
