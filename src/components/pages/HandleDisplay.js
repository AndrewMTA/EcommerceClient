import React from 'react'
import { useState } from 'react';
import {

  makes,
  listings,
} from "../../catagories";
import CarsCard from "../CarsCard";
    



  const HandleDisplay = () => {
    const [selected, setSelected] = useState("");

    const Select = listings.filter(
      (listings) => listings.make === selected
    );
  

    if (selected === "") {
      return (
        <div className="flex">
          {listings.map((listings) => (
            <CarsCard key={listings.id} {...listings} index={listings} />
          ))}
        </div>
      );
    } else if (selected === "All Makes") {
      return (
        <div className="flex">
          {listings.map((listings) => (
            <CarsCard key={listings.id} {...listings} index={listings} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex">
          {Select.map((Select) => (
            <CarsCard key={Select.make} {...Select} />
          ))}
        </div>
      );
    }
  };

 

export default HandleDisplay