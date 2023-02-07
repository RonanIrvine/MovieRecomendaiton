import React,{useState,useEffect} from 'react'
import UserService from '../services/UserService'
import {Link, useNavigate, useParams }from 'react-router-dom'
import Select from 'react-select'
const AddUserComponet=()=>{
    const [email, setemail] = useState('')
    const [username, setUserName] = useState('')
    const [userpassword, setuserpassword] = useState('')
    const [confirmuserpassword, setconfirmpassword] = useState('')
    
    const navigate=useNavigate();
   
    const {id}=useParams();
    const usertypes = [
        { value: 'User', label: 'User' },
        {  value: 'Admin', label: 'Admin'}
      ];
    const saveOrUpdateUser=(e)=>{
       e.preventDefault();

        const user={email,username,userpassword}
        // console.log(user.usertype);//validate data
        if(id){
            UserService.updateuser(id,user).then((response)=>{
                console.log(response.data)
                console.log(response.data.usertype)
                navigate('/users')                
            }).catch(error=>{
                console.log(error)
            })

        }else{
            UserService.createuser(user).then((response)=>{
                console.log(response.data)
                navigate('/users')
            }).catch(error=>{
                console.log(error)
            })
        }

    }
    const checkTextInput = (e) => {
        //Check for the Email TextInput
        if (!email.trim()) {
          alert('Please Enter Email');
          return;
        }
        //Check for the Username TextInput
        if (!username.trim()) {
          alert('Please Enter Username');
          return;
        }
        if (!userpassword.trim()) {
            alert('Please Enter Password');
            return;
          }
         if (!userpassword.trim()) {
            alert('Please Enter Password');
            return;
         }
         if (confirmuserpassword!==userpassword) {
            alert('Password & Confirm Password are not Equal');
            return;
         }  
        //Checked Successfully
        // console.log(e.selectedusertype.value)       
        saveOrUpdateUser(e)
      };
    useEffect(() => {
        UserService.getuserbyID(id).then((response)=>{           
            setemail(response.data.email)
            setUserName(response.data.username)
            setuserpassword(response.data.userpassword)
            // setusertype(response.data.selectedusertype)
        }).catch(error=>{
        console.log(error)
    })
    }, [])

    const title= () => {
        if(id){
            return <h2 className = "text-center"> Update User</h2>
        }else{
            return <h2 className = "text-center"> Add User</h2>
        }
    }
    return(
        <div>
            <br></br>
            <div className = "container">
                <div className= "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                      {title()}
                        <div className= "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Email  :</label>
                                    <input
                                            type="enail"
                                            placeholder="Enter Email"
                                            name = "Email"
                                            className="form-control"
                                            value = {email}
                                            onChange ={(e) => setemail(e.target.value)}>
                            </input>
                        </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Username :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter username"
                                        name = "username"
                                        required="required" 
                                        className="form-control"
                                        value = {username}
                                        onChange ={(e) => setUserName(e.target.value)}
                                        >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Password :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Password"
                                        name = "userpassword"
                                        required="required" 
                                        className="form-control"
                                        value = {userpassword}
                                        onChange ={(e) => setuserpassword(e.target.value)}>
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Confirm Password :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Password"
                                        name = "confirmuserpassword"
                                        className="form-control"
                                        value = {confirmuserpassword}
                                        onChange ={(e) => setconfirmpassword(e.target.value)}>
                                    </input>
                                </div>
                              
                             <button className="btn btn-success" type="submit" onClick={(e)=>
                                checkTextInput(e)} style={{marginLeft:"10px"}} >Save User</button>
                             <Link to="/users" className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
              </div>
          </div>
     </div>
</div>
    )
}
export default AddUserComponet