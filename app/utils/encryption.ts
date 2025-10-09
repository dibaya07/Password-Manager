import type {Details} from '../context/AuthContext'
import CryptoJS from "crypto-js";

export function encryptData(data: Details | null, secretKey: string): string {
  const jsonData = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
  return encrypted;
}

export function decryptData<T = unknown>(data: string, secretKey: string): T {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted) as T;
}
