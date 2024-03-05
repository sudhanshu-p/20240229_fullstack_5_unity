// This file is used to define global variables / common data
// that can be used across the application.

const userRoles = {
  ADMIN: "admin",
  USER: "user",
  SELLER: "seller",
};

const orderStatus = {
  RECEIVED: "received",
  PACKED: "packed",
  SHIPPED: "shipped",
  OUT_FOR_DELIVERY: "out for delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

module.exports = { userRoles, orderStatus };
