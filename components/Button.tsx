import Image from "next/image";
import React, { MouseEventHandler } from "react";
type Props = {
  title: string;
  type: "button" | "submit";
  LeftIcon?: string | null;
  RightIcon?: string | null;
  isSubmitting?: boolean;
  handleClick?: MouseEventHandler;
  bgColor?: string;
  textColor?: string;
};

const Button = ({
  title,
  type,
  LeftIcon,
  RightIcon,
  isSubmitting,
  bgColor,
  textColor,
  handleClick,
}: Props) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`flexCenter  gap-3 px-4 py-3 ${textColor || "text-white"}  ${
        isSubmitting ? "bg-black/50" : bgColor || "bg-primary-purple"
      } rounded-xl text-sm font-medium max-md:w-full`}
      onClick={handleClick}
    >
      {LeftIcon && <Image src={LeftIcon} width={14} height={14} alt="left" />}
      {title}
      {RightIcon && (
        <Image src={RightIcon} width={14} height={14} alt="right" />
      )}
    </button>
  );
};

export default Button;
