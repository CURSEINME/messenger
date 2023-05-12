import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
 } from "firebase/auth";
import { 
  collection,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
  setDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore"

export async function signIn({email, password}) {
  await signInWithEmailAndPassword(auth, email, password)
}
export async function signUp({name, email, password, photoURL}) {
  await createUserWithEmailAndPassword(
    auth, email, password
  )
  await updateProfile(auth.currentUser, {
    displayName: name,
    photoURL
  })

  const usersRef = doc(db, "users", auth.currentUser.uid)
  const userChatsRef = doc(db, "userChats", auth.currentUser.uid)

  await setDoc(usersRef, {
    displayName: name,
    email,
    photoURL,
    uid: auth.currentUser.uid
  })
  
  await setDoc(userChatsRef,{})
}
export async function userSignOut() {
  await signOut(auth)
}
export async function searchUser(name) {
  const usersRef = collection(db, "users")
  const q = query(usersRef, where("displayName", "==", name))

  const usersSnapShot = await getDocs(q)

  return usersSnapShot
}
export async function createChat(combainedId, user) {
  console.log(user)
  const chatRef = doc(db, "chats", combainedId)
  const currentUserChatRef = doc(db, "userChats", auth.currentUser.uid)
  const userChatRef = doc(db, "userChats", user.uid)

  const chatsRes = await getDoc(chatRef)

  if (!chatsRes.exists()) {
    await setDoc(chatRef, {messages:[]})
  }

  await updateDoc(currentUserChatRef, {
    [combainedId + ".userInfo"]: {
      displayName: user.displayName, 
      photoURL: user.photoURL,
      uid: user.uid
    },
    [combainedId + ".date"]: serverTimestamp()
  })
  await updateDoc(userChatRef, {
    [combainedId + ".userInfo"]: {
      displayName: auth.currentUser.displayName, 
      photoURL: auth.currentUser.photoURL,
      uid: auth.currentUser.uid
    },
    [combainedId + ".date"]: serverTimestamp()
  })

}
export async function sendMessage(chatId, message, userId) {
  const chatRef = doc(db, "chats", chatId)
  const currentUserChatRef = doc(db, "userChats", auth.currentUser.uid)
  const userChatRef = doc(db, "userChats", userId)

  await updateDoc(chatRef, {
    messages: arrayUnion({
      message,
      senderId: auth.currentUser.uid,
      data: Timestamp.now()
    })
  })

  const time = serverTimestamp()
  
  await updateDoc(currentUserChatRef, {
    [chatId + ".lastMessage"]: message,
    [chatId + ".date"]: time
  })
  await updateDoc(userChatRef, {
    [chatId + ".lastMessage"]: message,
    [chatId + ".date"]: time
  })
}