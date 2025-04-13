import { ApiResponse, UserData } from '../utils/interfaces';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

/**
 * Helper function to make authenticated API requests
 **/
async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  // Get the firebase auth token from local storage
  const token = localStorage.getItem('firebase_token');

  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }

  return response.json();
}

/**
 * User API functions
 */
export const userApi = {
  // Create a new user
  createUser: async (userData: UserData): Promise<UserData> => {
    const response = await fetchWithAuth<UserData>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response.data;
  },

  // Get current user data
  getCurrentUser: async (id: string): Promise<UserData> => {
    const response = await fetchWithAuth<UserData>(`/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (
    id: string,
    userData: Partial<UserData>
  ): Promise<UserData> => {
    const response = await fetchWithAuth<UserData>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return response.data;
  },

  // Get all users (admin only)
  getAllUsers: async (): Promise<UserData[]> => {
    const response = await fetchWithAuth<UserData[]>('/users');
    return response.data;
  },

  // Get all participants (admin only)
  getAllParticipants: async (): Promise<UserData[]> => {
    const response = await fetchWithAuth<UserData[]>('/users/participants');
    return response.data;
  },
};
