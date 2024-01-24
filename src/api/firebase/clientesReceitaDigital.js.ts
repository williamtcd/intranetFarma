import { listCollection, showItemOfCollection, createItem, uploadDocument, getUrlDocument, listDocuments } from './firebase.js'

export async function cadastraCliente(data: object) {
  const path = "clientes"
  const response = await createItem(path, data)
  return response
}

export async function exibeCliente(idCliente: string) {
  const path = "clientes"
  const response = await showItemOfCollection(path, idCliente)
  return response
}

export async function listaClientes() {
  const path = "clientes"
  const response = await listCollection(path)
  console.log('lista cliente')
  return response
}

export async function uploadDocumentos(nomeDoc: string, idCliente: string, file: any) {
  const imgName = new Date().valueOf().toString() + file.name.replace(/[^A-Z0-9]/ig, '')
  const path = 'documentos/' + idCliente + '/' + imgName
  const response = await uploadDocument(path, file)
  const documento = {
      tipo: nomeDoc,
      url: response
  }
  await cadastraDocumento(idCliente, documento)
}

export async function cadastraDocumento(idCliente: string, data: object) {
  const path = "clientes/" + idCliente + '/documentos/'
  const response = await createItem(path, data)
  return response
}

export async function listarDocumentos(idCliente){
  const path = '/documentos/' + idCliente + '/'
  const response = await listDocuments(path)
  console.log(response)
  return response
}

export async function downloadDocumentos(path: string) {
  return getUrlDocument(path)
}

export default {
  listaClientes,
  exibeCliente,
  cadastraCliente,
  uploadDocumentos,
  listarDocumentos,
  downloadDocumentos
}
