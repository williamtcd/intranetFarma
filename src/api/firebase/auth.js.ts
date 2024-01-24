import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export async function login(login: string, senha: string) {
  const auth = getAuth()
  await signInWithEmailAndPassword(auth, login, senha)
  loadUser()
}

export function loadUser() {
  const user = getAuth().currentUser
  localStorage.setItem('currentUser', JSON.stringify(user))
}
export function checkStatus() {
  if (localStorage.getItem('currentUser')) {
    return true
  } else {
    return false
  }
}

export function logOut() {
  const auth = getAuth()
  signOut(auth)
  localStorage.removeItem('currentUser')
}

export default {
  login,
  logOut,
  checkStatus
}
