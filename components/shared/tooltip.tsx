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
              "flex h-fit w-fit select-none items-center justify-center rounded-full bg-zinc-800 px-4 py-1 text-xs text-zinc-100 will-change-[transform,opacity]",
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
