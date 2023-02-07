import React, {useState,useEffect} from 'react'
import UserService from '../services/UserService'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'

const ListUserComponent = () => {
      const [user, setUser] = useState([])
      const [currentPage, setCurrentPage] = useState (1);
      const [postsPerPage, setPostsPerPage] = useState (10)
      const usertype = [
         { value: 1, label: 'Admin' },
         { value: 2, label: 'Normal User' },
    ]

            useEffect(() => {
                getusers();
            }, [])
            const handleDelete = (userid) => {
                if (window.confirm("Are you sure you want to delete this movie?")) {
                    {deleteUser(userid)}
                }else{

                }
              };
        const getusers=()=> {
            UserService.getAllUsers().then((response)=> {
                setUser(response.data)
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
        const deleteUser=(userid)=> {
            UserService.deleteuser(userid).then((response)=> {     
                getusers();          
            }).catch(error=>{
                console.log(error);
            })
        }
        const PromoteUser=(userid)=> {
            UserService.promoteuser(userid).then((response)=> {     
                getusers();          
            }).catch(error=>{
                console.log(error);
            })
        }
        const lastPostIndex = currentPage*postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;
        const curentPosts=user.slice(firstPostIndex,lastPostIndex)
      return(
      <div className = "container">
           <h2 className = "text-center"> List Users </h2> 
           <Link to = "/add-User" className="btn btn-primary mb-2"> Add New User </Link>
           <Link to = "/movies"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> View Movies </Link>
           <Link to = "/favmovies"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> Favourites </Link>
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
                                <button className='btn btn-danger' onClick={()=>handleDelete(user.userid)} 
                                style={{marginLeft:"10px"}}>Delete</button>
                                <button className='btn btn-info'onClick={()=>PromoteUser(user.userid)} 
                                style={{marginLeft:"10px"}}>Promote</button>
                            </td>
                    </tr>
                    )
                    }
                  </tbody>
           </table>
           <Pagination 
                    totalPosts={user.length}
                    postsPerpage={postsPerPage}
                    setCurrentPage={setCurrentPage}>
                    </Pagination>
       </div>
               )
}
export default ListUserComponent