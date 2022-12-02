import numbro from "numbro";

const capitalize = (string = "") => `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;

const formatToCurrency = (number = 0) =>
  numbro(Math.ceil(number)).format({
    thousandSeparated: true,
    prefix: "$"
  });

export { capitalize, formatToCurrency };
