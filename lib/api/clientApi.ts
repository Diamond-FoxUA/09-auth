import nextServer from '@/lib/api/api';

import { User } from '@/types/user';

// register
export type RegisterRequest = {
  email: string;
  password: string;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}

// login
export type LoginRequest = {
  email: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

// fetchNotes
// fetchNoteById
// createNote
// deleteNotes
// logout
// checkSession
// getMe
// updateMe
