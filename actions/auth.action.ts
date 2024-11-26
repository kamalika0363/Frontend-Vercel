"use server";

import { cookies } from "next/headers";
import { login } from '@/services/authService';

export const createAuthCookie = async (data: { 
  name: string; 
  email: string; 
  password: string; 
}) => {
  const response = await login(data);
  cookies().set("userAuth", response.token, { 
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });
};

export const deleteAuthCookie = async () => {
  cookies().delete("userAuth");
};

export const loginAction = async (credentials: { 
  email: string; 
  password: string 
}) => {
  try {
    const response = await login(credentials);
    await createAuthCookie(response.token);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Login failed' };
  }
};