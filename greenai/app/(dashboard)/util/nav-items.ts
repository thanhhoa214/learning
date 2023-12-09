import {
  Code,
  ImageIcon,
  MessageSquare,
  MusicIcon,
  VideoIcon,
} from 'lucide-react';

export const navItems = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-500",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    href: "/music",
    color: "text-blue-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-emerald-500",
  },
  // {
  //   label: "Settings",
  //   icon: Settings,
  //   href: "/settings",
  //   color: "text-gray-500",
  // },
];
