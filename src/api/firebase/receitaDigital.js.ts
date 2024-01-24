import { db, storage, ref, uploadBytes, addDoc, collection, doc, getDoc, getDocs, query, where, createItem } from './firebase.js'


export async function cadatraReceita(data: Object) {
  const path = "receitas"
  console.log(data)
  await createItem(path, data);
}

export async function exibeReceita(idCliente: string) {
  const busca = query(collection(db, "receitas"), where("idCliente", "==", idCliente))
  const querySnapshot = await getDocs(busca);
  querySnapshot.forEach((doc) => {
    console.log('eita')
    console.log(doc.id, " => ", doc.data());
  })
}
export async function uploadReceitas(idCliente: string, file: any) {
  // let mountainsRef = ref(storage, file);
  // const storage = getStorage();
  // const imgName = new Date().toString() + file.name
  console.log(idCliente)
  console.log(file.name)
  const storageRef = ref(storage, 'receitas/' + idCliente + '/' + file.name);
  console.log(storageRef)
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });

}
export async function listaReceitas(idCliente: number) {
  console.log(idCliente)
}

export default {
  cadatraReceita,
  exibeReceita,
  uploadReceitas,
  listaReceitas
}
