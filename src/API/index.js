import axios from 'axios'

const baseUrl = "http://localhost:45209/api"


export const createApi = (endpoint) => {
    return { 
        fetchall : ()=> axios.get(baseUrl+endpoint),
        addNew : (newRecord)=>axios.post(baseUrl+endpoint,newRecord),
        updateUser:(userUpdate)=>axios.put(baseUrl+endpoint,userUpdate),
        deleteUser:(id)=>axios.delete(baseUrl+endpoint+id),
        search:(name)=>axios.get(baseUrl+endpoint+name)
    }
}
