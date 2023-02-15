import React from "react"
import { Button } from "react-bootstrap";

const Pagination=({totalPosts,postsPerpage,setCurrentPage})=>{ //get variables
    let pages=[];
    for (let i=1;i<=Math.ceil(totalPosts/postsPerpage);i++){//getting number of pages based on total posts divided by posts perpage 
        pages.push(i)
    }
    return(
        <div>
            {pages.map((page,index)=>{//output buttons for pagination
                return <Button variant="dark" style={{marginBottom:"10px", marginLeft:"10px"}}
                 key={index} onClick={()=>setCurrentPage(page)}>{page}</Button>
        })}
        </div>
    );
};
export default Pagination;