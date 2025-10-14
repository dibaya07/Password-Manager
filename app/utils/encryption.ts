import type { Details } from '../context/AuthContext'
import CryptoJS from "crypto-js";

export function encryptData(data: Details | null, accessCode: string): string {
  const jsonData = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonData, accessCode).toString();
  return encrypted;
}

export function decryptData<T = unknown>(data: string, accessCode: string): T {
  const bytes = CryptoJS.AES.decrypt(data, accessCode);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted) as T;
}
