// Import Statements
import Joi from "joi";
import { numberToArray } from "./helperFunctions";

// Check form Scema for validation
export const checkFormSchema = Joi.object({
  from: Joi.string().required().label("Departure Location"),
  to: Joi.string().required().label("Arrival Location"),
});

// Book bus seat schema
export function bookSchema(childCount, adultCount) {
  // Converts the values of the data object to array
  const childNumsArray = numberToArray(childCount, "number");
  const adultNumsArray = numberToArray(adultCount, "number");
  const schema = {};
  childNumsArray.forEach(
    (num) => (schema[`child${num}`] = Joi.string().required())
  );
  adultNumsArray.forEach(
    (num) => (schema[`adult${num}`] = Joi.string().required())
  );
  return Joi.object(schema);
}
