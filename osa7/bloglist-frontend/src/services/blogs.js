import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id) => {
  const content = await axios.get(`${baseUrl}/${id}`)
  const blog = { ...content.data, likes: content.data.likes + 1 }
  const response = axios.put(`${ baseUrl }/${id}`, blog)
  return response.data
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, update, remove }