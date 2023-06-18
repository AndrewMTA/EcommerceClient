import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/Img.png";
import { useParams } from "react-router-dom";
import { models, makes, listings } from "../../catagories";

import DefaultImg from "./Default.png"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Close from "../close.png"
import {  logos } from "../../catagories";
function HomePage() {
  const cars = useSelector((state) => state.products);
  const { carID } = useParams();
  const car = cars.find((car) => car._id === carID);
  const {
    pic,
    category ,
    quant,
    model,
    year,
    description,
    price,
  weight,
  ingredients
  } = car;

  const axiosPrivate = useAxiosPrivate();
  const [ingredient, setIngredients] = useState(ingredients)
  const [descriptions, setDescription] = useState(car.description);
  const [phones, setPhone] = useState(car.phone);
  const [years, setYear] = useState(car.year);
  const user = useSelector((state) => state.user);
  const [images, setImages] = useState(pic);
  const [carModel, setCarModel] = useState(car.model);
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState("1 Car Post");
  const [select, setSelect] = useState(car.make);
  const [prices, setPrice] = useState(price);
  const [show, setShow] = useState(false);
  const [vinNum, setVinNum] = useState(car.VIN);
  const [imgToRemove, setImgToRemove] = useState(null);
  const [stockNumb, setStockNum] = useState(car.stockNum);
  const [transmission, setTransmission] = useState(cars.trans);
  const [body, setBody] = useState(cars.body_style);
  const [ListEmail, setListEmail] = useState(cars.listEmail);
  const [Miles, setMiles] = useState(cars.miles);
  const [Cylinders, setCylinders] = useState(cars.cylinders);
  const [Country, setCountry] = useState("");
  const [extColor, setExtColor] = useState(car.ext_color);
  const [drivetrain, setDrivetrain] = useState(car.drive_train);
  const [intColor, setIntColor] = useState(car.int_color);
  const [title, setTitle] = useState()
  const [categorys, setCategory] = useState(category)
  const [quantity, setQuantity] = useState(quant)
  const [weights, setWeight] = useState(weight)
  const [weightWarning, setWeightWarning] = useState(false);
  const navigate = useNavigate();

  const listUser = useSelector((state) => state.user._id);
  const basePrice = 25;
  const maxBasePrice = 40;
  const additionalPricePerPound = 6;
  const minShippingPrice = basePrice + (additionalPricePerPound * (weights - 1));
  const maxShippingPrice = maxBasePrice + (additionalPricePerPound * weights);
  const shippingRange = `$${minShippingPrice} - $${maxShippingPrice}`;
  let total = "";
  if (!isNaN(prices) && !isNaN(weights)) {
    const parsedPrice = parseFloat(prices.replace(/[^0-9.-]+/g, ""));
    const parsedWeight = parseFloat(weights.replace(/[^0-9.-]+/g, ""));
    const shippingCost = 46 + (6 * (parsedWeight - 1));
    const maxShippingPrice = parsedPrice + shippingCost;
    total = maxShippingPrice
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updates = {
      price: prices || price,
      make: select || car.make,
    };


    const res = await axiosPrivate.put(
      `http://localhost:3500/cars/update/${carID}`,
      {
        images: images || car.pic,
        price: prices || price,
        category: categorys || category,
        descriptions: description || car.description,
        weight: weights || weight,
        total: total,
        quant: quantity,
       ingredients: ingredient || ingredients,
      }
    );

    if (res.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(res.error.message);
    } else {
      // The payment has been processed!
      if (res.status === 200) {
        navigate(`/listings/${user._id}`);
      }
    }
  };

  const Selector = listings.filter((listings) => listings.maker === select);
  const next = () => {
    setShow(true);
  };
  const back = () => {
    setShow(false);
  };
  const PriceSwitch = () => {
    if (selected === "") {
      return <div>$64.99</div>;
    } else if (selected === "1 Car Post") {
      return <div>$64.99</div>;
    } else {
      return null;
    }
  };

  const HandleSelect = () => {
    if (select === "All Makes") {
      return (
        <>
          <select
            className="inputOnboard"
            value={carModel}
            onChange={(e) => {
              setCarModel(e.target.value);
            }}
          >
            <option>-Select Model-</option>
            {Selector.map((Selector) => {
              return (
                <option key={Selector.model} value={Selector.model}>
                  {Selector.model}
                </option>
              );
            })}
          </select>
        </>
      );
    } else {
      return (
        <select
          className="inputOnboard"
          value={carModel}
          onChange={(e) => {
            setCarModel(e.target.value);
          }}
        >
          <option>-Select Model-</option>
          {Selector.map((Selector) => {
            return (
              <option key={Selector.model} value={Selector.model}>
                {Selector.model}
              </option>
            );
          })}
        </select>
      );
    }
  };

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dojwag3u1",
        uploadPreset: "qmakq1p3",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  function deletePic(imgObj) {
    setImgToRemove(imgObj.public_id)
    axiosPrivate.delete(`/images/${imgObj.public_id}/`)
    .then((res) => {
      setImgToRemove(null)
      setImages(prev => prev.filter((img) => img.public_id !== imgObj.public_id))
    }).catch((e) => console.log(e))
  }
  const pizza = logos

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="background">
          <div className="flex-col">
            {!show && (
              <>
                <h2 className="basic">Basic Information</h2>

                <div className="inputWrap">
                
                  <label className="label">
                    Quantity <span className="required">*</span>
                  </label>
               <input value={quantity} onChange={(e) => setQuantity(e.target.value)}className="inputOnboard"/>
                  <label className="label">
                    Category <span className="required">*</span>
                  </label>
                  <select
                  value={categorys}
                    className="inputOnboard"
                    id="carMake"
                    name="carMake"
                  
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >



              
            

<option>-Select Style-</option>
                    {pizza.map((makes) => {
                      return (
                        <>
              
                        <option key={makes.id} value={makes.maker}>
                          {makes.name}
                        </option></>
                      );
                    })}
                  </select>
                
                </div>
                <label className="label">Total weight <span className="tiny">pounds (lb)</span> </label>
<p className="tiny">Include weight of packing material</p>
{weightWarning && <p className="warning2">Weight should be under 15 pounds.</p>}
<input
      value={weights}
      maxLength={2}
      onChange={(e) => {
        const newWeight = e.target.value.replace(/[^0-9.-]+/g, "");
        if (newWeight === "") {
          setWeight(newWeight);
          setWeightWarning(false);
          // ... (rest of your code)
        } else {
          const parsedWeight = parseFloat(newWeight);
          if (!isNaN(parsedWeight) && parsedWeight <= 15) {
            setWeight(parsedWeight.toLocaleString('en-US'));
            setWeightWarning(false);
            // ... (rest of your code)
          } else {
            setWeightWarning(true);
          }
        }
      }}
      className={`inputOnboard8 ${weightWarning && weights !== "" ? "inputOnboard9" : ""}`}
    />
<br/>

            
<br/>
            
                  
                      <b onClick={showWidget}
                  htmlFor="pic-upload"
                 className="ptag">
                    <img className="iconImg" src={Img} />
                        Upload Images <span className="required">*</span>
                      </b>
                 
             

                <div className="images-preview-container">
                  {images.map((image) => (
                    <div className="pics-preview">   <img onClick={() => deletePic(image)} src={Close} className="deletePic"/>
                      <img className="CardPic22" draggable src={image.url} />
                    </div>
                  ))}
                </div>

                <div className="inputWrap">
               
                </div>
                <label className="radioLabel">Shipping * </label>

<div>

  <div>
    Fedex 2 day A.M {weight > 0 && <>{shippingRange}</>}
  </div>
  
</div>


                <label className="label">
                  Price <span className="required">*</span>
                </label>
                <div className="flex-row">
                  <select className="inputOnboard1">
                    <option>USD</option>
                  
                  </select>
                  <input
                    className="inputOnboard3"
                    id="carPrice"
                    name="carPrice"
                    placeholder="Price"
                    value={prices}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>

                <div className="inputWrap">
                  <label className="radioLabel">Description </label>
                  <textarea
                    id="carDescription"
                    name="carDescription"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={descriptions}
                    className="radioarea"
                  />

<label className="radioLabel">Ingredients</label>
                  <textarea
                  value={ingredient}
                    id="carDescription"
                    name="carDescription"
                    onChange={(e) => {
                      setIngredients(e.target.value);
                    }}
                   
                    className="radioarea"
                  />
                </div>

            
                
                      <button type="submit">Save Changes</button>
                  
              </>
            )}
          </div>
          <div className="card-sample">
          <img   className="CardPic-sample" src={images[0]?.url || DefaultImg }/>
   
    <div className="Textbox">
 
    <h3 className="h3">
    {!isNaN(total) && total !== "" && (

    <div>{total !== "" ? <span>$</span> : <></>}{total}</div>

)}


      </h3>  
     <p className="p">
     {quantity} {categorys} { quantity !== "" && <>Pizza</>}{quantity > 1 &&  categorys !== "" && <>s</>} 
     </p>

     <p className="lp"> </p>
     </div>
        </div>
        </div>
      </form>
    </div>
  );
}

export default HomePage;
