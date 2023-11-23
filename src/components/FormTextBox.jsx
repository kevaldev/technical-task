import React from "react";

import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextBox = ({ name, control, type, required, label, size = "medium", varient = "outlined", ...rest }) => {
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, ...restFields }, fieldState: { error } }) => (
          <>
            <TextField
              type={type}
              variant={varient}
              label={required ? label + "*" : label}
              value={value === null ? "" : value}
              error={error?.message?.length > 0 ? true : false}
              size={size}
              {...restFields}
              {...rest}
            />
            <FormHelperText error>{error?.message}</FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};

export default TextBox;
