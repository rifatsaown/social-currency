import { User, UserCredential } from 'firebase/auth';
import { ReactNode } from 'react';


export interface CustomButtonProps {
    buttonText: string;
    onClick?: () => void;
    className?: string;
  }

export interface ParallaxEvent {
  clientX: number;
  clientY: number;
}

export interface FormField {
  name: string;
  value: string;
}

export interface Stats {
  totalParticipants: number;
  activeParticipants: number;
  inactiveParticipants: number;
}


export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  role?: 'admin' | 'participant' | 'brand';
  isActive?: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface SignupFormData {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  isAdmin: boolean;
  isLoading: boolean;
  signup: (formData: SignupFormData) => Promise<UserCredential>;
  login: (formData: LoginFormData) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  reauthenticate: (password: string) => Promise<void>;
}


// API response interface
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}