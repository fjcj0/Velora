declare const emailRegex: RegExp = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
declare const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
declare const nameRegex: RegExp = /^(?:[a-z\u0621-\u064A]{3,})(?:\s[a-z\u0621-\u064A]{3,}){0,3}$/i;
declare const usernameRegex: RegExp = /^[a-z][a-z0-9_.]{3,}$/;