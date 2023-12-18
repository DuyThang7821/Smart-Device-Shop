import React, {memo} from "react";

const Button = ({
  children,
  handleOnClick,
  style,
  iconsBefore,
  iconsAfter,
  fw,
  name,
  type ='button',
}) => {
  return (
    <button
      type={type}
      name={name}
      className={
        style
          ? style
          : `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {children}
    </button>
  );
};
export default memo(Button);
