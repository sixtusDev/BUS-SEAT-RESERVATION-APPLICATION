// Import statements
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import {
  Button,
  Text,
  Input,
  FormLabel,
  Select,
  FormControl,
} from "@chakra-ui/react";

class Form extends Component {
  state = {
    startDate: new Date(),
    data: {},
    errors: {},
  };

  // Validate function
  validate = (schema) => {
    const { data } = this.state;
    const { error } = schema.validate(
      { ...data },
      {
        abortEarly: false,
      }
    );
    if (!error) return null;
    const errors = {};
    error.details.forEach((detail) => (errors[detail.path] = detail.message));
    return errors;
  };

  // This function handles key strokes on input form element
  handleChange = ({ currentTarget }) => {
    const name = currentTarget.name;
    const value = currentTarget.value;

    const clonedData = { ...this.state.data };
    // Computed property is being used here: clonedData[name]
    clonedData[name] = value;
    this.setState({ data: clonedData });
  };

  // This function handles the date picker event for selecting date
  handleDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  // This function handles form submission
  handleSubmit = (e) => {
    e.preventDefault();

    this.doSubmit();
  };

  // Renders a button component when called
  renderButton(label, colorScheme, variant, type) {
    return (
      <Button colorScheme={colorScheme} variant={variant} type={type}>
        {label}
      </Button>
    );
  }

  // Renders an Input component when called
  renderInput(
    name,
    placeholder,
    size,
    focusBorderColor,
    type = "text",
    label = false,
    isRequired = true
  ) {
    const { data, errors } = this.state;
    return (
      <FormControl isRequired={isRequired}>
        {label && <FormLabel>{label}</FormLabel>}
        <Input
          placeholder={placeholder}
          isInvalid={errors[name]}
          name={name}
          value={data[name] || ""}
          size={size}
          type={type}
          focusBorderColor={focusBorderColor}
          onChange={this.handleChange}
        />
        {errors[name] && <Text color="red">{errors[name]}</Text>}
      </FormControl>
    );
  }

  // Renders data picker on UI when it's being called
  renderDatePicker(dateFormat, className) {
    return (
      <DatePicker
        selected={this.state.startDate}
        className={className}
        onChange={this.handleDateChange}
        dateFormat={dateFormat}
      />
    );
  }

  // Renders a chakra Select component when called
  renderSelect(
    name,
    options,
    focusBorderColor,
    width,
    label = false,
    isRequired = true
  ) {
    const { errors } = this.state;
    return (
      <FormControl id={name} maxW={width} isRequired={isRequired}>
        {label && <FormLabel>{label}</FormLabel>}
        <Select
          name={name}
          focusBorderColor={focusBorderColor}
          onChange={this.handleChange}
        >
          <option value="option1" className="option">
            ---{label}---
          </option>
          {options.map((option) => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </Select>
        {errors[name] && <Text color="red">{errors[name]}</Text>}
      </FormControl>
    );
  }
}

//exports statent
export default Form;
