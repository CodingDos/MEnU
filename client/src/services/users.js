import api from "./apiConfing.js";

export const getUser = async () => {
  try {
    const response = await api.get("/users");

    return response.data;
  } catch (error) {
    console.error("Error Getting all Users:", error);
  }
};


export const getUserById = async (id) => {
    try{
     const response = await api.get(`/users/id/${id}`)
     return response.data
    } catch(error){
     console.error("Error Getting the Users:", error)
    }
 }

 export const createUser = async (userData) => {
    try{
     const response = await api.post(`/users/`, userData)
     return response.data
    } catch(error){
     console.error("Error", error)
    }
 }

 export const editUser = async (id , userData) => {
    try{
     const response = await api.put(`/users/${id}`, userData)
     return response.data
    } catch(error){
     console.error("Error", error)
    }
 }

 export const deleteUser = async (id) => {
    try{
     const response = await api.delete(`/users/${id}`)
     return response.data
    } catch(error){
     console.error("Error", error)
    }
 }
