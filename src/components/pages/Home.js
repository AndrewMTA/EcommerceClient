import React from "react";

import axios from "../../api/axios";

import { useFilterContext } from "../../context/filter_context";
import "../../styles/home.css";

import Sort from "./Sort";
import FormatPrice from "./FormatPrice";
import CarsCard from "../CarsCard";
import CarsCard3 from "../CarsCard3";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as pics from "../../assets/index";
import ClipLoader from "react-spinners/ClipLoader"
import Navbar from "../Navbar1";
import { makes, listings } from "../../catagories";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../features/productSlice";
import FilterSection from "./FilterSection";
import Footer from "../Footer.js";
const Home = () => {
  const [showing, setShowing] = useState(true);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [display, setDisplay] = useState("");
  const [countrySelect, setCountrySelect] = useState("");
  const [show, setShow] = useState(true);
  const [update, setUpdate] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.products);
  const [high, setHigh] = useState("i");
  const [style, setStyle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio('/Alert.wav');

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };
  const {
    filter_products,
    grid_view,
    filters: {
      resetPage,
      text,
      make,
      category,
      color,
      price,
      maxPrice,
      minPrice,
      miles,
      country,
      model,
      priceLow
    },
  } = useFilterContext();
  const handleStyle = () => {
    countrySelect === "" ? setStyle(!style) : setStyle(null);
  };
  const Sponsored = filter_products.filter(
    (filter_products) => filter_products.sponsered === true
  );

  const Display = filter_products.filter(
    (filter_products) => filter_products.private !== true
  );

  console.log("te", make);



  console.log("res", resetPage);

  const [page, setPage] = useState(1);
  const [maker, setMaker] = useState("all");
  const [showings, setShowings] = useState(true);
  const [selects, setSelecteds] = useState("All");
  const [selectModel, setSelectModel] = useState("");
  const [selectNum, setSelectNum] = useState(1);
  const [loading, setLoading] = useState(false)
  console.log("ugug", page + 1);
 

  const Select = cars.filter((cars) => cars.make === makes);
  const SelectModel = cars.filter((cars) => cars.model === selectModel);

  const unique = Array.from[new Set(cars)];
  useEffect(() => {  setLoading(true)


    if ( Display.length > 0 ) {
      setLoading(false)
  
    }

    setTimeout(() => {
      setLoading(false)
  }, 10000)


  
    axios
      .get("http://localhost:3500/cars")
      .then(({ data }) => dispatch(updateProducts(data)));

    
  }, []);



  const handleOpens = () => {
    setShowing(false);
  };

  const handleCloses = () => {
    setShowing(true);
  };

  const { updateFilterValue, all_products, clearFilters, sorting, updatePage } =
    useFilterContext();
    console.log("h",updateFilterValue)
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


console.log("country", country)


  // we need to have the individual data of each in an array format
  const categoryData = getUniqueData(all_products, "category");
  const makeData = getUniqueData(all_products, "make");
  const modelData = getUniqueData(all_products, "model");
  const countryData = getUniqueData(all_products, "country");
  const colorsData = getUniqueData(all_products, "colors");


  const Selector = cars.filter((cars) => cars.make === make && cars.private !== true);

  const carsPerPage = 8;
  const lastIndex = page * carsPerPage;
  const firstIndex = lastIndex - carsPerPage;

  let menuRef = useRef();
  {
    /*
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShow(true);
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
*/
  }
  const nextPage = () => {
    if (page !== pageCount) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  const changeCPage = (id) => {
    setPage(id);
  };

  useEffect(() => {
    axios
      .get("/cars")
      .then(({ data }) => dispatch(updateProducts(data)));
  }, []);

  const Pagination = () => {
    return (
      <ul className="pagination">
        <li className={` btn ${page === 1 ? " paginationDisabled" : ""}`}>
          <a href="#" className="page-link" onClick={prevPage}>
            Prev
          </a>
        </li>
        {numbers.map((n, i) => (
          <li
            className={` paginationBttns ${
              page === n ? "paginationActive" : ""
            }`}
            key={i}
          >
            <a href="#" className="page-item" onClick={() => changeCPage(n)}>
              {n}
            </a>
          </li>
        ))}

        <li className="btn">
          <a href="#" className="page-link" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    );
  };

  const pageCount = Math.ceil(display / carsPerPage);

  const numbers = [...Array(pageCount + 1).keys()].slice(1);

  const HandleDisplaySponsoer = () => {
    setDisplay(Sponsored.length);
    return (
      <>
        <div className="flex">
          {Sponsored.length === 0 ? <></> : ""}
          {Sponsored.map((curElem) => {
            return <CarsCard3 key={curElem.id} {...curElem} />;
          })}
        </div>
        <div className="num__container"></div>
      </>
    );
  };
  console.log(user);
  const HandleDisplay = () => {
    setDisplay(Display.length);
    return (
      <>
        <div className="flex">
          {page === "poop" ? setPage(1) : <></>}
          {Display.length === 0 && loading === true ?  (<div className="load-center">
             <ClipLoader color={color} loading={loading} size={150} />
           
            </div>
          ) : (
            ""
          )}
           {Display.length === 0 && loading !== true ?  (<>
            <div className="load-center">
            <h1 className="pusher"> No Listings Matching Search</h1>
           
            </div>
           
            </>
          ) : (
            ""
          )}
          {Display.slice(firstIndex, lastIndex).map((curElem) => {
            return <CarsCard key={curElem.id} {...curElem} />;
          })}{" "}
          {display - firstIndex === 2 ? (
            <span className="insert">insert</span>
          ) : (
            <></>
          )}
        </div>

        <div className="num__container">
          {Display.length > 8 ? <Pagination /> : <></>}
        </div>
      </>
    );
  };

  const num = 1;
  const integer = Number("1");

  return (
    <>
      <>
        <div className="selectors">
          <Navbar />
          <>
         
            <div className="select-wrappingz">
              <div className="selectz">
                <h4>Style</h4>
                <form action="#">
                  <select
                    name="make"
                    id="make"
                    className="selectz"
                    value={make}
                  
                    
                    onChange={updateFilterValue}
                  >
                    {makeData.map((curElem, index) => {
                      return (
                        <option key={index} value={curElem} name="make">
                          {curElem}
                        </option>
                      );
                    })}
                  </select>{" "}
                </form>
              </div>
{/*
          
              <div className="selectz">
                <h4>Min Price</h4>
                <p>
                  <FormatPrice price={priceLow} />
                </p>

                <input
                  type="range"
                  name="priceLow"
                  className="rangei"
                  min={minPrice}
                  max={price}
                  value={priceLow}
                  onChange={updateFilterValue}
                />
              </div>

              <div className="selectz">
                <h4>Max Price</h4>
                <p>
                  <FormatPrice price={price} />
                </p>

                <input
                  type="range"
                  name="price"
                  className="rangei"
                  min={priceLow}
                  max={maxPrice}
                  value={price}
                  onChange={updateFilterValue}
                />
              </div>
*/}
              
              <div className="selectz">
                <h4>State</h4>

                <form action="#">
                  <select
                    name="country"
                    id="country"
                    className="selectz"
                    onChange={() => setPage("poop")}
                    onClick={updateFilterValue}
                  >
                    {countryData.map((curElem, index) => {
                      return (
                        <option key={index}  value={curElem} name="country">
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
                    onChange={() => setPage("poop")}
                    onClick={sorting}
                  >
                    <option>Sort By</option>
                    <option value="lowest">Price: Lowest First</option>

                    <option value="highest">Price: Highest First</option>
               
                  </select>
                </form>
              </div>


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
                    value={make}
                   
        
                    
                    onChange={updateFilterValue}
                    
                 
                  >
                    {makeData.map((curElem, index) => {
                      return (
                        <option key={index} value={curElem} name="make">
                          {curElem}
                        </option>
                      );
                    })}
                  </select>{" "}
                </form>

                <h4>Model</h4>

<form action="#">
  <select
    name="model"
    id="model"
    onClick={updateFilterValue}
    className="selectz"
    value={selectModel}
    onChange={(e) => {
      setPage("poop");
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
  </select>{" "}
</form>

<div className="selectz">
                <h4> Min Price</h4>
                <p>
                  <FormatPrice price={priceLow} />
                </p>

                <input
                  type="range"
                  name="priceLow"
                  className="rangei"
                  min={minPrice}
                  max={price}
                  value={priceLow}
                  onChange={updateFilterValue}
                />
              </div>
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
                    onChange={() => setPage("poop")}
                    onClick={updateFilterValue}
                  >
                    {countryData.map((curElem, index) => {
                      return (
                        <option key={index}  value={curElem} name="country">
                          {curElem}
                        </option>
                      );
                    })}
                  </select>
                </form>
                <h4>Sort by</h4>

<form action="#">
  <label htmlFor="sort"></label>
  <select
    name="sort"
    id="sort"
    className="selectz"
    onChange={() => setPage("poop")}
    onClick={sorting}
  >
    <option>Sort By</option>
    <option value="lowest">Price: Lowest First</option>

    <option value="highest">Price: Highest First</option>
    <option value="lowestmiles">Miles: Lowest First </option>

<option value="highestmiles">Miles: Highest First</option>

<option value="lowestyear">Year: Oldest First</option>

<option value="highestyear">Year: Newest First</option>
  </select>
</form>

                
                    <br />

                    <button onClick={handleCloses}>Search</button>
                  </form>
                </div>
              </>
            )}

            <button onClick={handleOpens} className="Filter_btn">
              Filters
            </button>
          </>
        </div>{" "}
        {/** {Sponsored.length === 0 ? (
         <></>
          ) : (
            <h2 className="pusher2"> 
    
        
            Sponsored</h2>
          )}
       */}
        <div className="DisplayWrap">{/** <HandleDisplaySponsoer/> */}</div>
        <h2 className="pusher2">{make} For Sale</h2>
        <div className="DisplayWrap">
          <HandleDisplay />
        </div>
        <div className="loadWrap"></div>
        <Footer/>
      </>
    </>
  );
};

export default Home;