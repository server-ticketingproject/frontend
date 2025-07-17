import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
      
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access - please login again');
          break;
        case 403:
          console.error('Forbidden - you do not have permission');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error - please try again later');
          break;
        default:
          console.error('An error occurred');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}

export const post = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await http.post<T>(url, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};

// Types for events
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  // Add other event properties as needed
}

interface EventsResponse {
  events: Event[];
  // Add pagination or other response fields as needed
}

/**
 * Fetch user's events from the server
 * @returns Promise with user's events
 */
export const getMyEvents = async (): Promise<EventsResponse> => {
  try {
    const response = await http.get<EventsResponse>('/events/my');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user events:', error);
    throw error;
  }
};

export default {
  post,
  getMyEvents,
  instance: http,
};
