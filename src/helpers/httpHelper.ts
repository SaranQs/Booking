import axios from 'axios';
import {
  FMS_ADMIN_SERVICE,
  FMS_BOOKING_SERVICE,
  FMS_TRIP_SERVICE,
  FMS_PRICING_SERVICE,
  FMS_USER_SERVICE,
  FMS_AUTH_SERVICE,
  FMS_GATEWAY_SERVICE,
} from '@env'; // Import all environment variables

// Map of services to their base URLs
const serviceUrls = {
  admin: FMS_ADMIN_SERVICE,
  booking: FMS_BOOKING_SERVICE,
  trip: FMS_TRIP_SERVICE,
  pricing: FMS_PRICING_SERVICE,
  user: FMS_USER_SERVICE,
  auth: FMS_AUTH_SERVICE,
  gateway: FMS_GATEWAY_SERVICE,
};

// console.log('Service URLs:', serviceUrls);

// Optional: Add default headers (e.g., for auth)
const getHeaders = () => ({
  'Content-Type': 'application/json',
  // Add auth token if needed: 'Authorization': `Bearer ${token}`,
});

const httpHelper = {
  // GET request (e.g., fetch trip data)
  get: async (
    endpoint: string,
    params?: any,
    service: keyof typeof serviceUrls = 'admin' // Default to 'admin' service
  ) => {
    try {
      const baseUrl = serviceUrls[service];
      if (!baseUrl) throw new Error(`Unknown service: ${service}`);
      const response = await axios.get(`${baseUrl}${endpoint}`, {
        headers: getHeaders(),
        params, // Optional query params like ?distance=4.2
      });
      return response.data; // Return the data from backend
    } catch (error) {
      console.error(`GET Error for ${service} service:`, error);
      throw error; // Handle in your app (e.g., show error message)
    }
  },

  // POST request (e.g., book a ride)
  post: async (
    endpoint: string,
    body: any,
    service: keyof typeof serviceUrls = 'admin' // Default to 'admin' service
  ) => {
    try {
      const baseUrl = serviceUrls[service];
      if (!baseUrl) throw new Error(`Unknown service: ${service}`);
      const response = await axios.post(`${baseUrl}${endpoint}`, body, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`POST Error for ${service} service:`, error);
      throw error;
    }
  },

  // PUT (update, e.g., update rating)
  put: async (
    endpoint: string,
    body: any,
    service: keyof typeof serviceUrls = 'admin' // Default to 'admin' service
  ) => {
    try {
      const baseUrl = serviceUrls[service];
      if (!baseUrl) throw new Error(`Unknown service: ${service}`);
      const response = await axios.put(`${baseUrl}${endpoint}`, body, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`PUT Error for ${service} service:`, error);
      throw error;
    }
  },

  // DELETE (e.g., cancel ride)
  delete: async (
    endpoint: string,
    service: keyof typeof serviceUrls = 'admin' // Default to 'admin' service
  ) => {
    try {
      const baseUrl = serviceUrls[service];
      if (!baseUrl) throw new Error(`Unknown service: ${service}`);
      const response = await axios.delete(`${baseUrl}${endpoint}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`DELETE Error for ${service} service:`, error);
      throw error;
    }
  },
};

export default httpHelper;