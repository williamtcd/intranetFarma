const firebaseConfig = {
}

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { addDoc, collection, doc, getDocs, getDoc, query, where, updateDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

async function listCollection(path: string) {
  const querySnapshot = await getDocs(collection(db, path));
  let list : any = []
  querySnapshot.forEach((doc) => {
    const item = {
      id: doc.id,
      ...doc.data()
    }
    list.push(item)
  });
  return list
}
async function showItemOfCollection(path: string, id: string) {
  const search = await getDoc(doc(db, path, id))
  const response = search.data()
  return response
}

async function createItem(path: string, data: Object) {
  const response = await addDoc(collection(db, path), data);
  return response
}

async function updateItem(path: string, id: string, data: object) {
  const response =  await updateDoc(doc(db, path, id), data)
  return response
}

async function uploadDocument(path: string, file: any) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return path
}
async function getUrlDocument(path: string) {
  const url = await getDownloadURL(ref(storage, path))
  return url
}

async function listDocuments(path: string){
  const listRef = ref(storage, path)
  let list: any = []
  await listAll(listRef)
    .then((res) => {
      // BUSCA PASTAS
      // res.prefixes.forEach((folderRef) => {
      //   console.log(folderRef.fullPath)
      // });
      //BUSCA ARQUIVOS
      res.items.forEach(async (itemRef) => {
        // console.log(itemRef.fullPath)
        const path = itemRef.fullPath
        // let item = await downloadDocumentos(path)
        list.push(path)

        // All the items under listRef.
      });
    }).catch((error) => {
      console.log(error)
      // Uh-oh, an error occurred!
    });
  // console.log(list)
  return list
}

// async function findItem(path, idCliente: string) {
//   const busca = query(collection(db, path), where("idCliente", "==", idCliente))
//   const querySnapshot = await getDocs(busca);
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   })
// }

export {
  db,
  storage,
  ref,
  uploadBytes,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  listAll,
  getDownloadURL,
  updateDoc,
  listCollection,
  showItemOfCollection,
  createItem,
  updateItem,
  uploadDocument,
  getUrlDocument,
  listDocuments
}