import axios from 'axios'
const USER_BASE_REST_API_URL='http://localhost:8080/api/v1/users';

class UserService{
    
    getAllUsers(){
        return axios.get(USER_BASE_REST_API_URL+'/') //get method
    }
    Loginuser(user){
        return axios.post(USER_BASE_REST_API_URL+'/userLogin',user) //post method
    }
    createuser(user){
        return axios.post(USER_BASE_REST_API_URL+'/newuser',user) //post method
    }
    getuserbyID(id){
        return axios.get(USER_BASE_REST_API_URL+'/'+id) //get method
    }
    updateuser(id,user){
        return axios.put(USER_BASE_REST_API_URL+'/'+id,user) //put method
    }
    promoteuser(id){
        return axios.put(USER_BASE_REST_API_URL+'/promote/'+id) //put method
    }
    deleteuser(id){
        return axios.delete(USER_BASE_REST_API_URL+'/'+id) //delete method
    }
}

export default new UserService();