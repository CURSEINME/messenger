import { auth, db, storage } from "./firebase";
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
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export async function signIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
}
export async function signUp(name, email, password, img) {

  await createUserWithEmailAndPassword(
    auth, email, password
  )
  const storageRef = ref(storage, img.name)
  const usersRef = doc(db, "users", auth.currentUser.uid)
  const userChatsRef = doc(db, "userChats", auth.currentUser.uid)

  await uploadBytes(storageRef, img)

  const photoURL = await getDownloadURL(storageRef)

  await updateProfile(auth.currentUser, {
    displayName: name,
    photoURL
  })

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
export async function sendMessage(chatId, message, userId, img) {
  const chatRef = doc(db, "chats", chatId)
  const currentUserChatRef = doc(db, "userChats", auth.currentUser.uid)
  const userChatRef = doc(db, "userChats", userId)
  
  if (img) {
    const storageRef = ref(storage, img.name)

    await uploadBytes(storageRef, img)

    const photoURL = await getDownloadURL(storageRef)

    await updateDoc(chatRef, {
      messages: arrayUnion({
        photoURL,
        message,
        senderId: auth.currentUser.uid,
        data: Timestamp.now()
      })
    })
  } else {
    await updateDoc(chatRef, {
      messages: arrayUnion({
        message,
        senderId: auth.currentUser.uid,
        data: Timestamp.now()
      })
    })
  }

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