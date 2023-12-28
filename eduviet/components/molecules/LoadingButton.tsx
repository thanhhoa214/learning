import { Loader } from "lucide-react";
import React, { ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

export default function LoadingButton(
  props: ButtonProps & { isLoading?: boolean; icon?: ReactNode }
) {
  return (
    <Button {...props} className={cn(props.className, "gap-2")}>
      {props.isLoading ? (
        <Loader size={16} className="animate-spin" />
      ) : (
        props.icon
      )}
      {props.children}
    </Button>
  );
}
