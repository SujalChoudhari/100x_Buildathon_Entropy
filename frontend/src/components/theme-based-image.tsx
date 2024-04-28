"use client";

import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props extends Omit<ImageProps, "src"> {
  darkSrc: string;
  lightSrc: string;
}

const ThemeBasedImage = (props: Props) => {
  const { theme } = useTheme();
  const [imgUrl, setImgUrl] = useState<string>("");
  const { darkSrc, lightSrc, width, height, alt, ...leftProps } = props;

  useEffect(() => {
    setImgUrl(theme === "light" ? lightSrc : darkSrc);
  }, [theme, lightSrc, darkSrc]);

  return (
    <>
      {imgUrl ? (
        <Image
          alt={alt}
          src={imgUrl}
          width={width}
          height={height}
          {...leftProps}
        />
      ) : (
        <Skeleton
          className="rounded-xl bg-card"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      )}
    </>
  );
};

export default ThemeBasedImage;
