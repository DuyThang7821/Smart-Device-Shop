import React, { memo } from "react";
import clsx from "clsx";
const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
  style,
  readOnly,
}) => {
  return (
    <div className={clsx("flex flex-col h-[78px] gap-2 mb-4", style)}>
      {label && <label className="font-medium" htmlFor={id}>{label + ':'}</label>}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={clsx(
          "form-input my-auto rounded-md outline-none p-3",
          fullWidth && "w-full",
          style
        )}
      />

      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
