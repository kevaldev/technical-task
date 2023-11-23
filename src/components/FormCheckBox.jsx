import React from "react";

import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const FormCheckBox = ({ name, control, ...rest }) => {
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, ...restFields }, fieldState: { error } }) => (
          <FormControlLabel {...restFields} control={<Checkbox checked={value} />} {...rest} />
        )}
      />
    </FormControl>
  );
};

export default FormCheckBox;
