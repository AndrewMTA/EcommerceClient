    import React from 'react'
    import { useSelector } from 'react-redux';
    const SubNav = () => {
        const user = useSelector((state) => state.user);
      return (
        <div className="dashboard">
        <a href={`/listings/${user?._id}`}>
            <div className="dash-options">
              Products
            </div>
            </a>
           <a href="/orders"> <div className="dash-options"> 
              Orders
            </div> </a>

            
            
            </div>
      )
    }
    
    export default SubNav