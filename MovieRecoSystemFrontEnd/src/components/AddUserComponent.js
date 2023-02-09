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
    const {id}=useParams();//get id from function call
    const usertypes = [
        { value: 'User', label: 'User' },
        {  value: 'Admin', label: 'Admin'}
      ];
    const saveOrUpdateUser=(e)=>{ //take parameter of student object
       e.preventDefault(); 
        const user={email,username,userpassword}
        // console.log(user.usertype);//validate data
        if(id){//if ID was present
            UserService.updateuser(id,user).then((response)=>{//id will be passed along with the new student object to update old data
                console.log(response.data)
                console.log(response.data.usertype)
                navigate('/users')                
            }).catch(error=>{
                console.log(error)
            })

        }else{//if ID is not present 
            UserService.createuser(user).then((response)=>{//user object will be passed and inserted into the database
                console.log(response.data)
                navigate('/users')//sucess will return user to users page
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
        } //Check for the Password TextInput
        if (!userpassword.trim()) {
            alert('Please Enter Password');
            return;
          }//validate same passwords
         if (confirmuserpassword!==userpassword) {
            alert('Password & Confirm Password are not Equal');
            return;
         }  
        //Checked Successfully
        // console.log(e.selectedusertype.value)       
        saveOrUpdateUser(e)//call save or update function
      };
      useEffect(() => { //enable side process to be done 
        UserService.getuserbyID(id).then((response)=>{//call function to pass id to API n retrieve the user information   
            setemail(response.data.email) //set user information accordingly based on ID passed
            setUserName(response.data.username)
            setuserpassword(response.data.userpassword)
            // setusertype(response.data.selectedusertype)
        }).catch(error=>{
        console.log(error)
    })
    }, [])

    const title= () => {
        if(id){//if ID is present, title will be for updating user
            return <h2 className = "text-center"> Update User</h2>
        }else{//if ID is not present, title will be for adding user
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
                                {/* button used to call validation function */}
                             <Link to="/users" className='btn btn-danger'>Cancel</Link>
                             {/* button bring back to users page */}
                        </form>
                    </div>
              </div>
          </div>
     </div>
</div>
    )
}
export default AddUserComponet