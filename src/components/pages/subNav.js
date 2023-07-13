    import React, {useState} from 'react'
    import { useSelector } from 'react-redux';
    const SubNav = () => {
        const user = useSelector((state) => state.user);
        
  const [searchQuery, setSearchQuery] = useState('Fedex drop off locations near me');

  const handleSearchClick = () => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(searchUrl, '_blank');
  };

      return (
        <div className="dashboard">
        <a href={`/listings/`}>
            <div className="dash-option">
              Products
            </div>
            </a>
           <a href="/orders"> <div className="dash-option"> 
              Orders
            </div> </a>
            <a href="/account-settings"> <div className="dash-option"> 
              Account
            </div> </a>
            
         


           
            </div>

            
      )
    }
    
    export default SubNav