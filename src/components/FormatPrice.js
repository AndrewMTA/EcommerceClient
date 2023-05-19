const FormatPrice = ({ price }) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

  }).format(price);
};

export default FormatPrice;
