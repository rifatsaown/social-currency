import { auth } from '../firebase/config';

// Force token refresh interval (20 minutes)
const TOKEN_REFRESH_INTERVAL = 20 * 60 * 1000;

// Get the current Firebase ID token with force refresh option
export const getAuthToken = async (
  forceRefresh = true
): Promise<string | null> => {
  try {
    const user = auth.currentUser;

    if (!user) {
      console.error('No user is currently logged in');
      clearAuthToken();
      return null;
    }

    // Force refresh ensures we get a fresh token from Firebase
    const token = await user.getIdToken(forceRefresh);

    if (!token) {
      console.error('Failed to obtain token from Firebase');
      return null;
    }

    // Store the token only once in localStorage for consistency
    localStorage.setItem('authToken', token);
    console.log('Auth token refreshed and stored');
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Clear the stored token
export const clearAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Set up a token refresh mechanism
export const setupTokenRefresh = (): (() => void) => {
  // Listen for auth state changes to update the token
  const authStateUnsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      await getAuthToken();
    } else {
      clearAuthToken();
    }
  });

  // Also set up a periodic refresh to ensure we always have a fresh token
  const intervalId = setInterval(async () => {
    if (auth.currentUser) {
      try {
        await getAuthToken(true);
        console.log('Periodic token refresh completed');
      } catch (error) {
        console.error('Periodic token refresh failed:', error);
      }
    }
  }, TOKEN_REFRESH_INTERVAL);

  // Return a function to clean up both listeners
  return () => {
    authStateUnsubscribe();
    clearInterval(intervalId);
  };
};
