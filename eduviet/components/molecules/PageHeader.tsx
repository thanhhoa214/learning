"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  CreditCard,
  LibrarySquare,
  LogOut,
  MousePointerClick,
  Settings,
  User,
  UserRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

function PageHeader() {
  const path = usePathname();

  return (
    <header className="flex h-14 md:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 sticky top-0 left-0 z-50 backdrop-blur-md">
      <div className="flex h-[60px] items-center border-b px-2">
        <Link className="flex items-center gap-1 font-semibold" href="/">
          <LibrarySquare />
          <span>EduViet</span>
        </Link>
      </div>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <div className="absolute left-2.5 top-2.5 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full md:w-2/3 lg:w-1/3"
              placeholder="Search quizzes..."
              type="search"
            />
          </div>
        </form>
      </div>

      <nav className="flex gap-4 justify-end items-center text-sm font-semibold">
        <Link
          href="/dashboard"
          className={
            path === "/dashboard" ? "underline underline-offset-2" : ""
          }
        >
          Dashboard
        </Link>
        <Link
          href="/quiz/create"
          className={
            path === "/quiz/create" ? "underline underline-offset-2" : ""
          }
        >
          {path === "/quiz/create" ? (
            "Create Quiz"
          ) : (
            <Button size="sm" className="gap-1">
              <MousePointerClick /> Create Quiz
            </Button>
          )}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="ml-auto h-8 w-8 relative"
              size="icon"
              variant="outline"
            >
              <UserRound size={16} />
              <span className="sr-only">User authentication</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}

export default PageHeader;
