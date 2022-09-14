import axios from 'axios'
import userService from './user'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers:
      { Authorization: `bearer ${userService.getToken()}` },
  }
  console.log(config)
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
    headers:
      { Authorization: `bearer ${userService.getToken()}` },
  }

  const response = axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

export default { getAll, create, update, remove, addComment }