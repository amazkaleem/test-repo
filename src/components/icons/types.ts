import type { SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "width" | "height"> & {
  /** Pixel width and height (square icons). */
  size?: number;
};
