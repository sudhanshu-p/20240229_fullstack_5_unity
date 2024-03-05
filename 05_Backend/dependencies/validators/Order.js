/** Helper function to validate Order Status */
function orderStatusValidator(status) {
  // Check for string
  if (typeof status !== "string") {
    return false;
  }

  // Check for enums
  const validStatuses = [
    "received",
    "packed",
    "shipped",
    "out-for-delivery",
    "delivered",
  ];
  if (!validStatuses.includes(status)) {
    return false;
  }

  return true;
}

module.exports = {
  orderStatusValidator,
};
