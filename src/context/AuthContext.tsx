import type { User } from '@/App';
import { createContext } from 'react';

export const AuthContext = createContext<User | null>(null);
