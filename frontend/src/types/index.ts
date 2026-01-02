export interface User {
  id: number;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  username: string;
  email: string;
  role: string;
}

export interface Poll {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  options: Option[];
  hasVoted: boolean;
  totalVotes: number;
}

export interface Option {
  id: number;
  text: string;
  voteCount: number;
}

export interface PollRequest {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  options: string[];
}

export interface VoteRequest {
  pollId: number;
  optionId: number;
}