import joi from "joi";
const { string, number, object } = joi;
const bookingValidationSchema = joi.object({
  mobile: joi.string().required().length(10),
  date: joi.date().required(),
  sheets: joi.array().items(
    joi
      .object({
        series: joi.string().required().min(1),
        number: joi.number().min(1).required(),
      })
      .required()
  ),
});

export { bookingValidationSchema };
