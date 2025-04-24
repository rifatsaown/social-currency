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
  influencers?: number;
  brands?: number;
  admins?: number;
}

export interface ActivityLog {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
  };
  action: string;
  details?: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export interface ChartData {
  statusDistribution: {
    active: number;
    inactive: number;
    pending: number;
    blocked: number;
  };
  monthlyRegistrations: {
    _id: {
      month: number;
      year: number;
    };
    count: number;
  }[];
}

export interface DashboardData {
  userStats: Stats;
  charts: ChartData;
  recentActivities: ActivityLog[];
}

export interface UserData {
  _id: string;
  fullName: string;
  email: string;
  displayName: string | null;
  role?: 'admin' | 'participant';
  status?: 'active' | 'inactive';
}

export interface Participant {
  _id: string;
  fullName: string;
  email: string;
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  instaHandle?: string;
  phoneNumber?: string;
  createdAt?: string;
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

// Campaign interfaces
export interface CampaignParticipant {
  _id: string;
  fullName: string;
  email: string;
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  instaHandle?: string;
}

export interface Campaign {
  _id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'draft';
  participants: CampaignParticipant[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface CreateCampaignData {
  name: string;
  description?: string;
  participants: string[]; // Array of participant IDs
}
