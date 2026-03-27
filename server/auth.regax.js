export const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
export const nameRegex = /^(?:[a-z\u0621-\u064A]{3,})(?:\s[a-z\u0621-\u064A]{3,}){0,3}$/i;
export const usernameRegex = /^[a-z][a-z0-9_.]{3,}$/;