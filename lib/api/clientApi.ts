import api from '@/lib/api/api';

import { User } from '@/types/user';

// register
export async function register(payload: {
  email: string;
  password: string;
}): Promise<User> {
  const { data } = await api.post<User>("/auth/register", payload);
  return data;
}

// fetchNotes
// fetchNoteById
// createNote
// deleteNotes
// login
// logout
// checkSession
// getMe
// updateMe
