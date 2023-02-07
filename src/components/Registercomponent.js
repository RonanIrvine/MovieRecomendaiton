import React,{useState,useEffect} from 'react'
import UserService from '../services/UserService'
import {Link, useNavigate, useParams }from 'react-router-dom'
import Select from 'react-select'

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function RegisterComponent() {
    const [email, setemail] = useState('')
    const [username, setUserName] = useState('')
    const [userpassword, setuserpassword] = useState('')
    const [confirmuserpassword, setconfirmpassword] = useState('')
   
    // selectedusertype="User"
    const navigate=useNavigate();
   

      const saveUser=(e)=>{
        e.preventDefault();
         const user={email,username,userpassword}
             UserService.createuser(user).then((response)=>{
                 console.log(response.data)
                 navigate('/movies')
             }).catch(error=>{
                 console.log(error)
             })
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
        saveUser(e)
      };
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'> 
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
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
                            
                              
                             <button className="btn btn-success" onClick={(e)=>checkTextInput(e)} style={{marginLeft:"10px"}} >Save User</button>
                             <Link to="/login" className='btn btn-danger'>Cancel</Link>
                        </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default RegisterComponent;