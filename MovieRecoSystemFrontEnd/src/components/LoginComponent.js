import React,{useState,useEffect} from 'react'
import {useLocalStorage,useLocalState} from 'use-local-storage';

import useLocalStorageState from 'use-local-storage-state';
import UserService from '../services/UserService';
import { Link ,useNavigate} from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon
}
from 'mdb-react-ui-kit';

function LoginComponent() {
    const [username, setUserName] = useState('')
    const [userpassword, setuserpassword] = useState('')
    // const[jwt,setjwt]=useLocalState("","jwt");
    const navigate=useNavigate();
    const  login=(e)=>{
        e.preventDefault();
         const user={username,userpassword}
         console.log(user.username)
         console.log(user.userpassword)
             UserService.Loginuser(user).then((response)=>{ 
                 console.log(response.data)
                 console.log(response.data.username)
                 navigate('/movies') //after login will bring user to movies page
             }).catch(error=>{
                alert("Invalid Username or Password");
                 console.log(error)
             })
     }
  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>
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
                                        type="password"
                                        placeholder="Enter Password"
                                        name = "userpassword"
                                        required="required" 
                                        className="form-control"
                                        value = {userpassword}
                                        onChange ={(e) => setuserpassword(e.target.value)}>
                                    </input>
                                </div>
                                <button className="btn btn-success" onClick={(e)=>login(e)} style={{marginLeft:"10px"}} >Login</button>


              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div>
              <div>
                <p className="mb-0">Don't have an account? 
                <Link to="/register" >Sign up</Link></p>
                
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default LoginComponent;