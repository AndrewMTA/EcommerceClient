    import React from 'react'

  import { useState } from 'react'
  import {

    makes,
    listings,
  } from "../../catagories";;
   
    
    const HandleSelect = () => {
      const [selected, setSelected] = useState("");

      const Select = listings.filter(
        (listings) => listings.make === selected
      );
    
      const Selector = listings.filter(
        (listings) => listings.make === selected
      );
      if (selected === "All Makes") {
      
        return (
          <select
  
            className="select"
            onChange={(e) => {
              //console.log(e.target.value);
            }}
          >
            <option>Choose a model</option>
            {Selector.map((Selector) => {
              return (
                <option key={Selector.model} value={Selector.model}>
                  {Selector.model}
                </option>
              );
            })}
          </select>
        );
      } else  {
  
        return (
          <div className="selectors">
          <select
     className="select"
     onChange={(e) => {
       setSelected(e.target.value);
     }}
   >
     <option value="All Makes">All makes</option>
     {makes.map((makes) => {
       return (
         <option key={makes.id} value={makes.make}>
           {makes.make}
         </option>
       );
     })}
   </select> 
  
  
          <select
            className="select"
            onChange={(e) => {
              //console.log(e.target.value);
            }}
          >
            <option>Choose a model</option>
            {Selector.map((Selector) => {
              return (
                <option key={Selector.model} value={Selector.model}>
                  {Selector.model}
                </option>
              );
            })}
          </select>
          </div>
        );
      }
    };


    export default HandleSelect