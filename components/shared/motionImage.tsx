import Image from "next/image";
import * as motion from "framer-motion/client";
import { forwardRef } from "react";

const Component = forwardRef<
  HTMLImageElement,
  React.ComponentProps<typeof Image>
>((props, ref) => <Image {...props} ref={ref} alt={props.alt} />);

export const MotionImage = motion.create(Component);
