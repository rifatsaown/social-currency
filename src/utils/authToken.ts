import { auth } from '../firebase/config';

// Get the current Firebase ID token
export const getAuthToken = async (): Promise<string | null> => {
  try {
    const user = auth.currentUser;

    if (!user) {
      return null;
    }

    const token = await user.getIdToken(true);
    localStorage.setItem('authToken', token);
    localStorage.setItem('firebase_token', token); // Store with the key expected by the API service
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Clear the stored token
export const clearAuthToken = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('firebase_token');
};

// Set up a token refresh mechanism
export const setupTokenRefresh = (): (() => void) => {
  // Firebase automatically refreshes the token when needed,
  // but we need to listen for auth state changes to update localStorage
  const unsubscribe = auth.onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem('authToken', token);
      localStorage.setItem('firebase_token', token); // Store with the key expected by the API service
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('firebase_token');
    }
  });

  return unsubscribe;
};
