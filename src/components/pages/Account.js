import React, { useState } from 'react';
import SubNav from './subNav'
import axios from 'axios'
import userSlice from '../../features/userSlice';
import { useSelector } from "react-redux";
import Navbar from '../Navbar';
    const Account = () => {
      const user = useSelector((state) => state.user);
        const [isChecked, setIsChecked] = useState(false);
        const [tab, setTab] = useState({
          noti: true,
          payments:false,
          more: false
        });

        
    const [data, setData] = useState({
      email: user.email,
      companyName: "",
      phone: "",
      taxid: "",
      website: "",
      routing: "",
      account: "",
      nameOnAccount: "",
      firstName:"",
      lastName:"",
        line1: "",
        city: "",
        state: "",
        zip: "",
        contactLine1: "",
        contactCity: "",
        contactState: "",
        contactZip: "",
      contactEmail: "",
      firstName: "",
      lastName: "",
      contactPhone: "",
      title: "",
      last4: "",

  
    });


    const handleChange = (e) => {
      const { name, value } = e.target;
 
      if (name === "phone") {
        const formattedNumber = value.replace(/\D/g, ""); // Remove non-digit characters
    
        let formattedPhoneNumber = "";
    
        for (let i = 0; i < formattedNumber.length; i++) {
          if (i > 0 && i % 3 === 0 && i < 7) {
            formattedPhoneNumber += " ";
          }
          formattedPhoneNumber += formattedNumber.charAt(i);
        }
    
        if (formattedPhoneNumber.length <= 12) {
          setData((prev) => ({ ...prev, [name]: formattedPhoneNumber }));
        } else {
          setData((prev) => ({ ...prev, [name]: formattedPhoneNumber.slice(0, 12) }));
        }
      }else if (name === "taxid") {
          const formattedTaxId = value.replace(/\D/g, "").slice(0, 9); // Remove non-digit characters and limit to 12 characters
      
          let formattedTaxIdNumber = "";
      
          for (let i = 0; i < formattedTaxId.length; i++) {
            if (i === 2) {
              formattedTaxIdNumber += "-";
            }
            formattedTaxIdNumber += formattedTaxId.charAt(i);
          }
      
          setData((prev) => ({ ...prev, [name]: formattedTaxIdNumber }));
        } else {
          setData((prev) => ({ ...prev, [name]: value }));
        }
      };
    
    //console.log(data)
    

  
    
    // Example usage
  
    

        const handleClick = (selectedTab) => {
          setTab({
            noti: selectedTab === 'noti',
            payments: selectedTab === 'payments',
            more: selectedTab === 'more'
          });
        };
        
        const updateAddress = async () => {
          try {
            const response = await axios.put(`/update-address`, {data});
        
            //console.log(response.data); // Address updated successfully!
            // Perform any additional actions after successful address update
        
          } catch (error) {
            console.error(error);
            // Handle error cases
          }
        };
        const handleToggle = () => {
          setIsChecked(!isChecked);
        };
      
      return (
        <div>
            <Navbar/>
                  <SubNav />
                  <br/>
                  <br/>
                  <br/>

                  <div className="flex-boi">
            <div className='account-settings'>
                
                
                
                <span className='underLine'>Account Settings</span>
            

                <ul className='settings-list'>
  <li className="settings--options">
    <span
      className={`settings-options ${tab.noti ? 'current-tab' : ''}`}
      onClick={() => handleClick('noti')}
    >
      Notifications
    </span>
  </li>
  <li className='settings-options'>
    <span
      className={`settings-options ${tab.payments ? 'current-tab' : ''}`}
      onClick={() => handleClick('payments')}
    >
      Payments
    </span>
  </li>
  <li className='settings-options'>
    <span
      className={`settings-options ${tab.more ? 'current-tab' : ''}`}
      onClick={() => handleClick('more')}
    >
      More
    </span>
  </li>
</ul>

            
            
            
            </div>
           
            </div>
            {tab.noti && (
  <div className='notifications-box'>
    <div className="row">Notifications {isChecked ? <>on</> : <>off</> }
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
    
      <span className="slider"></span>
    </label>
<br/><br/>
</div>
    Address info
     <input  className="inputOnboard" onChange={handleChange} name="line1"placeholder='street' />
     <input  className="inputOnboard" onChange={handleChange} name="line2"placeholder='street 2' />
     <input className="inputOnboard"  onChange={handleChange} name="city"placeholder='city' />
     <input className="inputOnboard"  onChange={handleChange} name="state"placeholder='state' />
     <input className="inputOnboard"  onChange={handleChange} name="zip"placeholder='zip' />
     <input className="inputOnboard"  onChange={handleChange} name="country"placeholder='country' />

     <button onClick={updateAddress}>Save</button>
  </div>
)}

{tab.payments && (
  <div className='notifications-box'>
    For assistance with payments reach out to support@shipslices.com.
  </div>
)}

{tab.more && (
  <div className='notifications-box'>
    More content goes here...
  </div>
)}

        </div>
        
      )
    }
    
    export default Account