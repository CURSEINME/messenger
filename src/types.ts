import { Timestamp } from "firebase/firestore";

export interface User {
  displayName: string;
  email: string;
  uid: string
  photoURL: string;
}

export interface ChatState{
  chatId: string | null;
  user: User | null;
}

export interface ChatAction {
  type: string;
  payload: User
}

export interface AuthAction {
  type: string;
  payload: User;
}

export interface AuthState {
  currentUser: User | null;
}

export interface FormData {
  message: string;
  img: File | null;
}

export interface ChatData {
  data: Date;
  lastMessage: string;
  userInfo: User;
}

export interface ChatInfo {
  0: string;
  1: ChatData
}

export interface ModalProps {
  active: boolean;
  setActive: (isActive: boolean) => void;
  children: any
}

export interface MessageInfo {
  message: string;
  senderId: string;
  data: Timestamp;
  photoURL: string | null;
}

export interface MessageProps {
  messageData: MessageInfo
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  img: File | null;
}

export interface SearchForm {
  name: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface CreateChat {
  combainedId: string;
  user: User;
}

export interface SendMessage {
  message: string;
  chatId: string;
  userId: string;
  img: File | null  
}