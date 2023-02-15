import React,{useState,useEffect} from 'react'
import {useLocalStorage,useLocalState} from 'use-local-storage';
import useLocalStorageState from 'use-local-storage-state';
import UserService from '../services/UserService';
// import { useContext,contextValue } from 'react';

import { Link ,useNavigate} from 'react-router-dom';
import { MDBBtn,
MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBIcon}
from 'mdb-react-ui-kit';

function LoginComponent() {
    const [username, setUserName] = useState('')
    const [userpassword, setuserpassword] = useState('')
    const [usertype, setusertype] = useState('')
    const navigate=useNavigate();
    const  login=async (e)=>{
        e.preventDefault();
         const user={username,userpassword}
         console.log(user.username)
         console.log(user.userpassword)
             await UserService.Loginuser(user).then((response)=>{ 
                 console.log(response.data)
                 console.log(response.data.username)
                 console.log( response.data.userid)
                 console.log( response.data.usertype)
                  if(response.data.usertype=="User")
                  { //If usertype is User 
                  localStorage.setItem('userid', response.data.userid) //storing user id,name, type in local storage
                  localStorage.setItem('username', response.data.username)
                  localStorage.setItem('usertype', response.data.usertype)
                  window.sessionStorage.setItem('userid', response.data.userid)//storing user id,name, type in session storage
                  window.sessionStorage.setItem('username', response.data.username)
                  window.sessionStorage.setItem('usertype', response.data.usertype)
                  window.location.href ="/movies";//go to movies page                   
                  }else if(response.data.usertype=="Admin")
                  {//If usertype is Admin 
                  localStorage.setItem('userid', response.data.userid)//storing user id,name, type in local storage
                  localStorage.setItem('username', response.data.username)
                  localStorage.setItem('usertype', response.data.usertype)
                  window.sessionStorage.setItem('userid', response.data.userid)//storing user id,name, type in session storage
                  window.sessionStorage.setItem('username', response.data.username)
                  window.sessionStorage.setItem('usertype', response.data.usertype)
                  window.location.href ="/users";//go to users page 
                  }              
            }).catch(error => { //Catching error         
              console.log(error)    
              alert(error)
                //  navigate('/movies') //after login will bring user to movies page
             }).catch(error=>{
                alert("Invalid Username or Password");
                 console.log(error)
             })
     }
     const checkTextInput = (e) => {   
      //Check for the Username TextInput
      if (!username.trim()) {
        alert('Please Enter Username');
        return;
      }   //Check for the Password TextInput
      if (!userpassword.trim()) {
          alert('Please Enter Password');
          return;
        }     
      //Checked Successfully
      login(e) //call login user function
    };
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
                                    <input //input box for username
                                        type="text"
                                        placeholder="Enter username"
                                        name = "username"
                                        required="required" 
                                        className="form-control"
                                        value = {username}
                                        onChange ={(e) => setUserName(e.target.value)} //setting value of username var
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
                                        onChange ={(e) => setuserpassword(e.target.value)} //setting value of password var
                                        >
                                    </input>
                                </div>
                                <button className="btn btn-success" onClick={(e)=>checkTextInput(e)} style={{marginLeft:"10px"}} >Login</button>


              
              <div>
                <p className="mb-0">Don't have an account? 
                <Link to="/register" >Sign up</Link></p>
                {/* Bring to registration page */}
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default LoginComponent;