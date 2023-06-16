"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../utils/cn";

const Tooltip = ({
  children,
  text,
  position,
  hideArrow = false,
  offset = 5,
}) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={cn(
              "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
              "flex h-7 w-[90px] select-none items-center justify-center rounded-full bg-black p-2 text-xs text-gray-100 will-change-[transform,opacity]",
              "dark:bg-white dark:text-gray-950"
            )}
            sideOffset={offset}
            side={position}
          >
            {text}
            <TooltipPrimitive.Arrow
              className={hideArrow ? "fill-transparent" : "fill-black"}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
