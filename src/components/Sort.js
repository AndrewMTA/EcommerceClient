import React from "react";
import { useFilterContext } from "../context/filter_context";

const Sort = () => {
  const {  sorting } =
    useFilterContext();
  return (
    <div className="sort-section">
   
   

      {/* 3rd column  */}
      <div className="selectz">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="selectz"
            onClick={sorting}>

            <option value="lowest">High to Low</option>
      
            <option value="highest">Low to High</option>
            
      
          </select>
        </form>
      </div>
    </div>
  );
};



export default Sort;
