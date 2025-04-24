import {
  ApiResponse,
  Campaign,
  CreateCampaignData,
  UserData,
} from '../Interface';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper function to make authenticated API requests
 **/
async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  // Get the firebase auth token from local storage
  const token = localStorage.getItem('authToken'); // Use 'authToken' instead of 'firebase_token'

  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  console.log(`Making request to: ${API_BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    body: options.body || null,
  });

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error('API Error Response:', responseData);
    throw new Error(
      responseData.message ||
        JSON.stringify(responseData) ||
        'API request failed'
    );
  }

  return responseData;
}

/**
 * Public API endpoints that don't require authentication
 */
async function fetchPublic<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const headers = {
    'Content-Type': 'application/json',
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
 * Submit eligibility check request (public endpoint)
 */
export const submitEligibilityRequest = async (data: {
  fullName: string;
  instagramHandle: string;
  mobileNumber: string;
  email: string;
  city: string;
}) => {
  const response = await fetchPublic('/users/eligibility-request', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data;
};

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

  // Update user status (active/inactive)
  updateUserStatus: async (
    userId: string,
    isActive: boolean
  ): Promise<UserData> => {
    const status = isActive ? 'active' : 'inactive';
    const response = await fetchWithAuth<UserData>('/users/update-status', {
      method: 'POST',
      body: JSON.stringify({ userId, status }),
    });
    return response.data;
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    const response = await fetchWithAuth<void>(`/users/${id}`, {
      method: 'DELETE',
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

  // Get all eligibility checks (admin only)
  getAllEligibilityChecks: async (): Promise<unknown[]> => {
    const response = await fetchWithAuth<unknown[]>(
      '/users/eligibility-checks'
    );
    return response.data;
  },

  // Process eligibility check (approve/reject) (admin only)
  processEligibilityCheck: async (
    id: string,
    status: 'approved' | 'rejected'
  ): Promise<unknown> => {
    const response = await fetchWithAuth<unknown>(
      '/users/eligibility-process',
      {
        method: 'POST',
        body: JSON.stringify({ id, status }),
      }
    );
    return response.data;
  },
};

/**
 * Campaign API functions
 */
export const campaignApi = {
  // Get all campaigns
  getAllCampaigns: async (): Promise<Campaign[]> => {
    const response = await fetchWithAuth<Campaign[]>('/campaigns');
    return response.data;
  },

  // Get a single campaign by ID
  getCampaignById: async (id: string): Promise<Campaign> => {
    const response = await fetchWithAuth<Campaign>(`/campaigns/${id}`);
    return response.data;
  },

  // Create a new campaign
  createCampaign: async (
    campaignData: CreateCampaignData
  ): Promise<Campaign> => {
    const response = await fetchWithAuth<Campaign>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
    return response.data;
  },

  // Update a campaign
  updateCampaign: async (
    id: string,
    campaignData: Partial<CreateCampaignData>
  ): Promise<Campaign> => {
    const response = await fetchWithAuth<Campaign>(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(campaignData),
    });
    return response.data;
  },

  // Delete a campaign
  deleteCampaign: async (id: string): Promise<void> => {
    const response = await fetchWithAuth<void>(`/campaigns/${id}`, {
      method: 'DELETE',
    });
    return response.data;
  },
};
