import * as yup from "yup";
/***
 * @description Generating dynamic validation schema from JSON
 */
export const generateFormValidationSchema = (formFieldData) => {
  const validationSchema = {};

  formFieldData.forEach(({ field }) => {
    field.forEach(({ field_slug, data_type, required, field_name }) => {
      let fieldValidator = data_type === "number" ? yup.number() : yup.string();

      if (required) {
        fieldValidator = fieldValidator.required(`${field_name} is required`);
      }

      switch (data_type) {
        case "email":
          fieldValidator = fieldValidator.email("Invalid email format");
          break;

        case "number":
          fieldValidator = fieldValidator.typeError("Must be a number").integer("Must be an integer");
          break;

        //TODO: Update below fields according to requirements
        // case "select":
        //  const choices = enum_values.choices.map((choice) => choice.value);
        //  fieldValidator = fieldValidator.oneOf(choices, "Invalid selection");
        // break;

        // case "checkbox":
        //  defaultValues[field_slug] = false;
        // break;

        // case "datetime":
        //  defaultValues[field_slug] = getFormattedISODateTime();
        // break;

        // case "date":
        //  defaultValues[field_slug] = getCurrentDate();
        // break;

        default:
          break;
      }

      validationSchema[field_slug] = fieldValidator;
    });
  });

  return yup.object(validationSchema);
};
