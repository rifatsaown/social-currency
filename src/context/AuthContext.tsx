import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

import { auth } from '../firebase/config';
import { userApi } from '../services/api';
import {
  clearAuthToken,
  getAuthToken,
  setupTokenRefresh,
} from '../utils/authToken';
import {
  AuthContextType,
  AuthProviderProps,
  LoginFormData,
  SignupFormData,
  UserData,
} from '../Interface/index';

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Signup function
  async function signup(formData: SignupFormData): Promise<UserCredential> {
    const result = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    // Update display name
    await updateProfile(result.user, { displayName: formData.displayName });

    // Create user document in MongoDB through API
    const newUserData: UserData = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: formData.displayName,
      // role: 'participant', // Default role
      // isActive: true,
    };

    // Get auth token first
    await getAuthToken();

    // Then create user in MongoDB
    try {
      await userApi.createUser(newUserData);
    } catch (error) {
      console.error('Error creating user in MongoDB:', error);
    }
    return result;
  }

  // Login function
  async function login(formData: LoginFormData): Promise<UserCredential> {
    const result = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    // Get auth token
    await getAuthToken();
    return result;
  }

  // Logout function
  async function logout(): Promise<void> {
    clearAuthToken();
    return signOut(auth);
  }

  // Reset password function
  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  }

  // Update user profile function
  async function updateUserProfile(displayName: string): Promise<void> {
    if (!currentUser) throw new Error('No user logged in');

    // Update Firebase profile
    await updateProfile(currentUser, { displayName });

    // Update user data in MongoDB through API
    if (userData) {
      try {
        const updatedUser = await userApi.updateUser(currentUser.uid, {
          displayName,
        });
        setUserData(updatedUser);
      } catch (error) {
        console.error('Error updating user in MongoDB:', error);
      }
    }
  }

  // Reauthenticate user function
  async function reauthenticate(password: string): Promise<void> {
    if (!currentUser || !currentUser.email)
      throw new Error('No user logged in or no email');
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    await reauthenticateWithCredential(currentUser, credential);
  }

  // Check if user is admin
  const isAdmin = userData?.role === 'admin';

  // Set up token refresh on component mount
  useEffect(() => {
    const unsubscribeTokenRefresh = setupTokenRefresh();

    // Clean up on unmount
    return () => {
      unsubscribeTokenRefresh();
    };
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Get auth token
        await getAuthToken();

        // Fetch user data from MongoDB through API
        try {
          const userDataFromServer = await userApi.getCurrentUser(user.uid);
          setUserData(userDataFromServer);
        } catch (error) {
          console.error('Error fetching user data from API:', error);

          // If the user doesn't exist in MongoDB yet, create it
          if (user.email && user.displayName) {
            try {
              const newUserData: UserData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                // role: 'participant', // Default role
                // isActive: true,
              };
              const createdUser = await userApi.createUser(newUserData);
              setUserData(createdUser);
            } catch (createError) {
              console.error('Error creating user in MongoDB:', createError);
            }
          }
        }
      } else {
        setUserData(null);
        clearAuthToken();
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    isAdmin,
    isLoading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    reauthenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
// Custom hook to use the auth context
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
