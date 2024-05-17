"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const Component = forwardRef<
  HTMLImageElement,
  React.ComponentProps<typeof Image>
>((props, ref) => <Image {...props} ref={ref} alt={props.alt} />);

export const MotionImage = motion(Component);
