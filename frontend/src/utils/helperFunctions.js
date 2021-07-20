// This function converts a number to an array of numbers
// starting from 1 to the number
// 20 => [1, 2, 3, ..., 20]
// Type: can be either string or number in order to return an
// array of either strings or numbers
export function numberToArray(number, type) {
  if (type === "string")
    return Array.from(Array(number).keys(), (n) => (n + 1).toString());
  return Array.from(Array(number).keys(), (n) => n + 1);
}

// Reuasable function that converts the keys of an object to Array
export function objectKeysToArray(object) {
  return Object.keys(object);
}

export function objectValuesToArray(object) {
  return Object.values(object);
}

// Reusable function for Flutterwave payment gateway
export function paymentGateway(amount, email, name) {
  return {
    public_key: "FLWPUBK_TEST-56c904ce3b5948bf8dc8b2e1e907f3b8-X",
    tx_ref: Date.now(),
    amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      // phonenumber: "08132690046",
      name,
    },
    customizations: {
      title: "NODE TRANSPORTATION",
      description: "Payment for bus seat reservation",
      // logo: "logo.png",
    },
  };
}
