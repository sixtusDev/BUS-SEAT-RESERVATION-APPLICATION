import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Select, Button, Flex, FormLabel, FormControl } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import "react-datepicker/dist/react-datepicker.css";
import "./checkForm.css";

const CheckForm = ({ type, onCheck }) => {
  const [startDate] = useState(new Date());
  return (
    <React.Fragment>
      {type === "homePage" ? (
        <form className="form">
          <label htmlFor="from" className="label">
            From
          </label>
          <Select
            className="select"
            name="to"
            mb="4"
            focusBorderColor="teal.600"
          >
            <option value="option1" className="option">
              Option 1
            </option>
            <option value="option2" className="option">
              Option 2
            </option>
            <option value="option3" className="option">
              Option 3
            </option>
          </Select>
          <label htmlFor="to" className="label">
            TO
          </label>
          <Select
            className="select"
            name="to"
            mb="6"
            focusBorderColor="teal.600"
          >
            <option value="option1" className="option">
              Option 1
            </option>
            <option value="option2" className="option">
              Option 2
            </option>
            <option value="option3" className="option">
              Option 3
            </option>
          </Select>
          <Flex color="black">
            <DatePicker selected={startDate} />
          </Flex>
          <Button
            mt="8"
            leftIcon={<ArrowRightIcon />}
            colorScheme="teal"
            variant="solid"
            className="button"
          >
            CHECK AVAILABILITY
          </Button>
        </form>
      ) : (
        <form action="#">
          <Flex justify="space-between" mb="9">
            <FormControl id="from" maxW="47%" isRequired>
              <FormLabel>From</FormLabel>
              <Select
                className="select"
                name="from"
                mb="4"
                focusBorderColor="teal.600"
              >
                <option value="option1" className="option">
                  ---Select City---
                </option>
                <option value="option2" className="option">
                  Option 2
                </option>
                <option value="option3" className="option">
                  Option 3
                </option>
              </Select>
            </FormControl>
            <FormControl id="to" maxW="47%" isRequired>
              <FormLabel>To</FormLabel>
              <Select
                className="select"
                name="to"
                mb="4"
                icon={<ArrowRightIcon />}
                focusBorderColor="teal.600"
              >
                <option value="option1" className="option">
                  ---Select City---
                </option>
                <option value="option2" className="option">
                  Option 2
                </option>
                <option value="option3" className="option">
                  Option 3
                </option>
              </Select>
            </FormControl>
          </Flex>
          <Flex align="center" justify="center">
            <DatePicker selected={startDate} className="date-picker" />
            <Button
              leftIcon={<ArrowRightIcon />}
              colorScheme="teal"
              variant="solid"
              className="button"
              ml="8"
              onClick={onCheck}
            >
              CHECK AVAILABILITY
            </Button>
          </Flex>
        </form>
      )}
    </React.Fragment>
  );
};

export default CheckForm;
