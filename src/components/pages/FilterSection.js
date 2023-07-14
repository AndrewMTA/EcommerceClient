import { useFilterContext } from "../../context/filter_context";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "./FormatPrice";
import { useState, useRef, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../features/productSlice";
import {
 
  makes,
  listings,
} from "../../catagories";
import axios from "axios";


const FilterSection = ( page ) => {

  const dispatch = useDispatch();
const [maker, setMaker] = useState("all")
const [showing, setShowing] = useState(true)
const [selected, setSelected] = useState("All");
const [selectModel, setSelectModel] = useState("");
const [selectNum, setSelectNum] = useState(1);
const cars = useSelector((state) => state.products);



const Selector = listings.filter((listings) => listings.maker === selected);
const Select = cars.filter((cars) => cars.make === makes);
const SelectModel = cars.filter((cars) => cars.model === selectModel);



const unique = Array.from[new Set(cars)]

////console.log(unique)

useEffect(() => {
  axios.get("/cars").then(({ data }) => dispatch(updateProducts(data)));
}, []);



const handleOpens = () => {
  setShowing(false);
};

const handleCloses = () => {
  setShowing(true);
};



  const {
    filters:  { resetPage, text, make, category, color, price, maxPrice, minPrice, country, model},
    updateFilterValue,
    all_products,
    clearFilters,
    sorting, 
    updatePage
    
  
  } = useFilterContext();



const getUniqueMakes = (data) => {
  let newVal = data.map((curElem) => {
    return curElem;
  });

  return (newVal = ["all", ...new Set(newVal)]);
};




  // get the unique values of each property
  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });

    if (attr === "colors") {
      // return (newVal = ["All", ...new Set([].concat(...newVal))]);
      newVal = newVal.flat();
    }

    return (newVal = ["All", ...new Set(newVal)]);
  };



  // we need to have the individual data of each in an array format
  const categoryData = getUniqueData(all_products, "category");
  const makeData = getUniqueData(all_products, "make");
  const modelData = getUniqueData(all_products, "model");
  const countryData = getUniqueData(all_products, "country");
  const colorsData = getUniqueData(all_products, "colors");
  // ////console.log(
  //   "🚀 ~ file: FilterSection.js ~ line 23 ~ FilterSection ~ makeData",
  //   colorsData
  // );

  return (

    <>
    <div className="select-wrappingz">


    <div className="selectz">
<h4>Mke</h4>
<form action="#">
<select

name="make"
id="make"

            className="selectz"
            value={selected}
            onClick={updateFilterValue}
            onChange={ (e) => {

             
              setSelected(e.target.value);
       
            
        
              
            }}

            
          >
             
            {makeData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="make">
                  {curElem}
                </option>
              );
            })}
          </select>    </form></div>



<div className="selectz">
          <h4>Model</h4>

          <form action="#">
        <select

name="model"
id="model"
onClick={updateFilterValue}
          className="selectz"
          value={selectModel}
          onChange={(e) => {
            setSelectModel(e.target.value);
          }}
        >
         <option value={"All"}>All</option>
          {Selector.map((Selector) => {
            return (
              <option key={Selector.model} value={Selector.model}>
                {Selector.model} 
              </option>
            );
          })}
        </select> </form></div>




      <div className="selectz">
        <h4> Max Price</h4>
        <p>
          <FormatPrice price={price} />
        </p>
   
        <input
          type="range"
          name="price"
          className="rangei"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
        
      </div>
      <div className="selectz">
      <h4>Country</h4>

      <form action="#">
         
          <select
            name="country"
            id="country"
            className="selectz"
            onClick={updateFilterValue}>

{countryData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="country">
                  {curElem}
                </option>
              );
            })}
            
      
          </select>
        </form>
    
      </div>
      <div className="selectz">
      <h4>Sort by</h4>

     
              
              <form action="#">
      <label htmlFor="sort"></label>
      <select
        name="sort"
        id="sort"
        className="selectz"
        onClick={sorting}>
        <option >Sort Price</option>
        <option value="lowest">Low to High</option>
  
        <option value="highest">High to Low</option>
        
  
      </select>
    </form>
     
    
      </div>

        {/** 
        <button className="btn" onClick={clearFilters}>
          Clear Filters
        </button> */}

    </div>

    {!showing && (
            <>
              <div className="OverLay1">
                <form className="Modal1">

             
<h4>Make</h4>
<form action="#">
<select

name="make"
id="make"
           
            className="selectz"
            value={selected}
            onClick={updateFilterValue}
            onChange={(e) => {
              setSelected(e.target.value);
              setSelectModel("");
              
            }}
          >
              <option value="all">All Makes</option>
            {makes.map((makes) => {
              return (
                <option   key={makes.id} value={makes.maker}> 
                  {makes.maker}
                </option>
              );
            })}
          </select>    </form>

          <h4>Model</h4>

<form action="#">
<select

name="model"
id="model"
onClick={updateFilterValue}
className="selectz"
value={selectModel}
onChange={(e) => {
  setSelectModel(e.target.value);
}}
>
<option value="all">All Models</option>

{Selector.map((Selector) => {
  return (
    <option key={Selector.model} value={Selector.model}> disabled={Selector.model.length < 1}
      {Selector.model}
    </option>
  );
})}
</select> </form>

<div className="selectz">
        <h4> Max Price</h4>
        <p>
          <FormatPrice price={price} />
        </p>
   
        <input
          type="range"
          name="price"
          className="rangei"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
        
      </div>

      <h4>Country</h4>

<form action="#">
   
    <select
      name="country"
      id="country"
      className="selectz"
      onClick={updateFilterValue}>

{countryData.map((curElem, index) => {
        return (
          <option key={index} value={curElem} name="country">
            {curElem}
          </option>
        );
      })}
      

    </select>
  </form>
      <h4> Sort Price</h4>
                  <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="selectz"
            onClick={sorting}>
            <option >Sort Price</option>
            <option value="lowest">Low to High</option>
      
            <option value="highest">High to Low</option>
            
      
          </select>
        </form>
             

                  {/**
                  <select
                         className="selectz"
                    
                  >
                    <option value={""} >Interior color</option>
                    <option value={"Beige"}>Beige</option>
                    <option value={"Yellow"}>Yellow</option>
                    <option value={"Black"}>Black</option>
                    <option value={"Orange"}>Orange</option>
                    <option value={"Blue"}>Blue</option>
                    <option value={"Purple"}>Purple</option>
                    <option value={"Brown"}> Brown</option>
                    <option value={"Red"}>Red</option>
                    <option value={"Green"}>Green</option>
                    <option value={"Silver"}>Silver</option>

                    <option value={"White"}>White</option>
                  </select>  */}
                <br/>

                  <button onClick={handleCloses}>Search</button>
                </form>
              </div>



              
            </>
          )} 

          
<button onClick={handleOpens} className="Filter_btn">Filters</button>
    </>
  );
};



export default FilterSection;
