import axiosClient from "./axiosClient";

export const ordersApi = {
  getAllOrders: async () => {
    const response = await axiosClient.get("/orders");
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await axiosClient.patch(`/orders/${orderId}/status`, {
      status,
    });
    return response.data;
  },

  getOrderById: async (orderId) => {
    const response = await axiosClient.get(`/orders/${orderId}`);
    return response.data;
  },

  placeOrder: async (cartItems) => {
    const payload = {
      items: cartItems.map((item) => ({
        menuItemId: String(item.id || item._id),
        quantity: Number(item.quantity),
      })),
    };
    const response = await axiosClient.post("/orders", payload);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await axiosClient.get("/orders/my");
    return response.data;
  },
};

export default ordersApi;
