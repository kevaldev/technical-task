import React, { Fragment } from "react";

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const FormSelect = ({ control, name, size = "medium", options, label, ...rest }) => {
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Fragment>
            <InputLabel id={name} error={error?.message?.length > 0 ? true : false}>
              {label}
            </InputLabel>
            <Select size={size} labelId={name} error={error?.message?.length > 0 ? true : false} label={label} {...field} {...rest}>
              {options.map((choice) => (
                <MenuItem key={choice.id} value={choice.value}>
                  {choice.value}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>{error?.message}</FormHelperText>
          </Fragment>
        )}
      />
    </FormControl>
  );
};

export default FormSelect;
