import React, {useState,useEffect} from 'react'
import UserService from '../services/UserService'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'
import BounceLoader from 'react-spinners/BounceLoader';

const ListUserComponent = () => {
      const [user, setUser] = useState([])
      const [currentPage, setCurrentPage] = useState (1);//setting current page number      
      const [postsPerPage, setPostsPerPage] = useState (10);//setting maximum number of item in page
       const [loading, setLoading] = useState(false);
      useEffect(() => { //enable side process to be done 
          setLoading(true);//to initiate loading screen
          const timer = setTimeout(() =>{
                getusers();//Calling functions to get users
                setLoading(false);//to disable loading screen after time period
            }, 8000);   return () => clearTimeout(timer);
        }, []);
        const getusers=()=> {
            UserService.getAllUsers().then((response)=> {//calls an API to get all users 
                setUser(response.data)//setuser objects to be based on return data
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
            const handleDelete = (userid) => {//function to call alert confirmation 
                if (window.confirm("Are you sure you want to delete this user?")) {
                    {deleteUser(userid)}//call function to delete user based on ID passed
                }else{

                }
              };
              const deleteUser=(userid)=> { //takes userir and pass it to an API to delete user with the id
                UserService.deleteuser(userid).then((response)=> {     
                    getusers();  //call function to get users         
                }).catch(error=>{
                    console.log(error);
                })
            }
       
       
        const PromoteUser=(userid)=> {//takes userid to be passed to an api which will change usertype to Admin
            UserService.promoteuser(userid).then((response)=> {     
                getusers(); //call function to get users
            }).catch(error=>{
                console.log(error);
            })
        }
        const lastPostIndex = currentPage*postsPerPage;//getting last page index by calculating number of items per pages n current pages
            const firstPostIndex = lastPostIndex - postsPerPage;// used to determine the starting index of the movie data to display on a specific page
            const curentPosts=user.slice(firstPostIndex,lastPostIndex)//Make object list by limiting number of objects
          return(
      <div className = "container">
           <h2 className = "text-center"> List Users </h2> 
           <Link to = "/add-User" className="btn btn-primary mb-2"> Add New User </Link>
            {/* Button leading user to go the add user page */}
           <Link to = "/movies"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> View Movies </Link>
                 {/* Button leading user to go the view movies page */}
                 <Link to = "/favmovies"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> Favourites </Link>
           {/* Button leading user to go the view favourite movies page */} 
           
           {loading?( //if loading state is true, display loading screen
           <div style={{display: 'flex', justifyContent: 'center'}}>
           <BounceLoader size={30} color={'#5636d6'} loading={loading} />
         </div>
            ) : ( //if loading state is false, displays the bottom code
           <>
           
           <table className="table table-bordered table-striped">
               <thead>
                        <th> User Id </th>
                       <th> Email </th> 
                       <th> UserName </th> 
                       <th> User Type </th>
                       <th> Function </th>
                  </thead>
                  <tbody>
                    {
                        curentPosts.map( 
                         user =>
                            <tr key = {user.userid}> 
                            <td> {user.userid} </td> 
                            <td> {user.email} </td> 
                            <td> {user.username} </td> 
                            <td> {user.usertype} </td> 
                            <td>
                                <Link className='btn btn-info' to={`/edit-user/${user.userid}`}>Update</Link>
                                 {/* Button that takes to selected used based on id to be updated*/}
                                <button className='btn btn-danger' onClick={()=>handleDelete(user.userid)} 
                                style={{marginLeft:"10px"}}>Delete</button>
                                 {/* button to call delete function */}
                                <button className='btn btn-info'onClick={()=>PromoteUser(user.userid)} 
                                style={{marginLeft:"10px"}}>Promote</button>
                                      {/* button to call promote user function */}
                            </td>
                    </tr>
                    )
                    }
                  </tbody>
           </table>
           <Pagination //Creating pagination
                    totalPosts={user.length}
                    postsPerpage={postsPerPage}
                    setCurrentPage={setCurrentPage}>
                    </Pagination>
                    </>
    )}
  </div>
);}
export default ListUserComponent