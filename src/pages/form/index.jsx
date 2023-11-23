import React, { Fragment, useMemo } from "react";

import { Box, Button, Card,  Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormSelect, FormTextBox, FormCheckBox } from "../../components/index";
import { getCurrentDate, getFormattedISODateTime } from "../../shared/func";
import { generateFormValidationSchema } from "../../shared/validations";

import FORMFIELDS from "../../data/formJson.json";

import "./styles.css";

/***
 * @description Default values generated from the JSON data which is passed in react-hook-form
 */
const getDefaultValues = (formFieldData) => {
  if (!formFieldData.length) {
    return {};
  }

  const defaultValues = {};

  formFieldData.forEach(({ field }) => {
    field.forEach(({ field_slug, data_type }) => {
      switch (data_type) {
        case "text":
        case "email":
        case "select":
          defaultValues[field_slug] = "";
          break;

        case "number":
        case "phone":
        case "decimal":
          defaultValues[field_slug] = null;
          break;

        case "checkbox":
          defaultValues[field_slug] = false;
          break;

        case "datetime":
          defaultValues[field_slug] = getFormattedISODateTime();
          break;

        case "date":
          defaultValues[field_slug] = getCurrentDate();
          break;

        default:
          return;
      }
    });
  });

  return defaultValues;
};

const Form = () => {
  const validationSchema = useMemo(() => generateFormValidationSchema(FORMFIELDS.result), [FORMFIELDS.result]);

  const defaultValues = useMemo(() => getDefaultValues(FORMFIELDS.result), [FORMFIELDS.result]);

  const { control, getValues, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const handleFormSubmit = () => {
    const formData = { fields: [] };

    formData.fields.push(getValues());

    console.log(formData);
  };

  /**
   * @description Renders each form fields to the screen
   */
  const renderFields = (fields) => {
    const sortedFields = fields?.sort((a, b) => a.display_order - b.display_order);

    if (!sortedFields?.length) return;

    return sortedFields.map((field) => {
      if (!field.display) {
        return null;
      }

      const { field_name, field_slug, data_type, enum_values, required } = field;

      switch (data_type) {
        case "text":
        case "email":
        case "date":
          return <FormTextBox key={field_slug} control={control} name={field_slug} type={data_type} required={required} label={field_name} />;

        case "datetime":
          return <FormTextBox key={field_slug} control={control} name={field_slug} type={"datetime-local"} required={required} label={field_name} />;

        case "number":
        case "phone":
        case "decimal":
          return <FormTextBox key={field_slug} control={control} name={field_slug} type={"number"} required={required} label={field_name} />;

        case "select":
          return <FormSelect fullWidth key={field_slug} control={control} name={field_slug} options={enum_values.choices || []} label={field_name} />;

        case "checkbox":
          return <FormCheckBox key={field_slug} control={control} name={field_slug} label={field_name} />;

        default:
          return null;
      }
    });
  };

  const RenderForm = () => {
    return (
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack gap={1.5} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
          {FORMFIELDS.result.map((formBlock) => (
            <Fragment key={formBlock.block_id}>
              <Typography variant="h5" fontWeight={"bold"} gutterBottom>
                {formBlock.block}
              </Typography>
              {renderFields(formBlock?.field)}
            </Fragment>
          ))}
          <Button variant="contained" size="large" color="primary" type="submit">
            Submit
          </Button>
          <Button variant="outlined" size="large" color="primary" type="reset" onClick={() => reset(defaultValues)}>
            Reset
          </Button>
        </Stack>
      </form>
    );
  };

  return (
    <Box component={"main"} className="form-container">
      <Card sx={{ width: "100%", maxWidth: { xs: "85%", sm: "420px" }, overflow: "auto", p: { xs: 2, sm: 4 } }}>
        <RenderForm />
      </Card>
    </Box>
  );
};

export default Form;
