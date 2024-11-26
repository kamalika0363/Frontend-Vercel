import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    isInvalid?: boolean;
    errorMessage?: string;
  }
>(({ className, type, isInvalid, errorMessage, ...props }, ref) => {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
          {
            "border-red-500 text-red-500 focus:ring-red-500": isInvalid, // red border when invalid
            "border-neutral-400 dark:border-neutral-950": !isInvalid, // default border color
          },
          className,
        )}
        ref={ref}
        {...props}
      />
      {isInvalid && errorMessage && (
        <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
