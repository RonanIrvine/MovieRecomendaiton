import React from "react"


const Pagination=({totalPosts,postsPerpage,setCurrentPage})=>{ //get variables
    let pages=[];
    for (let i=1;i<=Math.ceil(totalPosts/postsPerpage);i++){//getting number of pages based on total posts divided by posts perpage 
        pages.push(i)
    }
    return(
        <div>
            {pages.map((page,index)=>{//output buttons for pagination
                return <button  style={{marginBottom:"10px", marginLeft:"10px"}}
                 key={index} onClick={()=>setCurrentPage(page)}>{page}</button>
        })}
        </div>
    );
};
export default Pagination;