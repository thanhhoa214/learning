"use client";

import Image from 'next/image';

import {
  Prompt,
  PromptSchema,
} from '@/components/internal/prompt';

import inProgressIcon from '../../../public/in-progress.svg';

export default function VideoPage() {
  function onSubmit(values: PromptSchema) {
    console.log(values);
  }

  return (
    <>
      <Prompt
        placeholder="Tell me something about Viet Nam?"
        onSubmit={onSubmit}
      />

      <div className="w-full flex flex-col items-center gap-4 pt-16">
        <Image priority width={256} src={inProgressIcon} alt="In progress" />
        <p className="text-gray-400">Sorry, this is still in progress</p>
      </div>
    </>
  );
}
