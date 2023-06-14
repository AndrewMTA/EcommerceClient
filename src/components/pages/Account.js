import React, { useState } from 'react';
import SubNav from './subNav'

    
    const Account = () => {
        const [isChecked, setIsChecked] = useState(false);
        const [tab, setTab] = useState({
          noti: true,
          payments:false,
          more: false
        });


        const handleClick = (selectedTab) => {
          setTab({
            noti: selectedTab === 'noti',
            payments: selectedTab === 'payments',
            more: selectedTab === 'more'
          });
        };
        

        const handleToggle = () => {
          setIsChecked(!isChecked);
        };
      
      return (
        <div>
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
    Notifications {isChecked ? <>on</> : <>off</> }
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="slider"></span>
    </label>
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