import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/Img.png";
import { useParams } from "react-router-dom";
import { models, makes, listings } from "../../catagories";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Close from "../close.png"
function HomePage() {
  const cars = useSelector((state) => state.products);
  const { carID } = useParams();
  const car = cars.find((car) => car._id === carID);
  const {
    pic,
    make,
    model,
    year,
    description,
    price,
    phone,
    miles,
    VIN,
    stockNum,
    cylinders,
    trans,
    drive_train,
    body_style,
    ext_color,
    int_color,
    country,
    listEmail,
  } = car;

  const axiosPrivate = useAxiosPrivate();
  const [ingredients, setIngredients] = useState()
  const [descriptions, setDescription] = useState(car.description);
  const [phones, setPhone] = useState(car.phone);
  const [years, setYear] = useState(car.year);
  const user = useSelector((state) => state.user);
  const [images, setImages] = useState(pic);
  const [carModel, setCarModel] = useState(car.model);
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState("1 Car Post");
  const [select, setSelect] = useState(car.make);
  const [prices, setPrice] = useState(car.price);
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
  const [category, setCategory] = useState()
  const [quantity, setQuantity] = useState()
  
  
  const navigate = useNavigate();

  const listUser = useSelector((state) => state.user._id);
  console.log(carID);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updates = {
      price: prices || car.price,
      make: select || car.make,
    };

    const res = await axiosPrivate.put(
      `https://backend-6olc.onrender.com/cars/update/${carID}`,
      {
        images: images || car.pic,
        price: prices || car.price,
        make: select || car.make,
        descriptions: description || car.description,
        year: years || car.year,
        trans: transmission,
        body_style: body,
        VIN: vinNum,
        miles: Miles,
        cylinders: Cylinders,
        drive_train: drivetrain,
        int_color: intColor,
        ext_color: extColor,
        listEmail: ListEmail,
        phone: phones,
        country: Country,
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
                    Title <span className="required">*</span>
                  </label>
               <input onChange={(e) => setTitle(e.target.value)}className="inputOnboard"/>
                  <label className="label">
                    Quantity <span className="required">*</span>
                  </label>
               <input onChange={(e) => setQuantity(e.target.value)}className="inputOnboard"/>
                  <label className="label">
                    Category <span className="required">*</span>
                  </label>
                  <input  onChange={(e) => setCategory(e.target.value)}className="inputOnboard"/>
                </div>
                <div className="inputWrap"></div>

            
                  
                  
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

                <label className="label">
                  Price <span className="required">*</span>
                </label>
                <div className="flex-row">
                  <select className="inputOnboard1">
                    <option>USD</option>
                    <option>USD</option>
                    <option>USD</option>
                    <option>USD</option>
                    <option>USD</option>
                    <option>USD</option>
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
                    id="carDescription"
                    name="carDescription"
                    onChange={(e) => {
                      setIngredients(e.target.value);
                    }}
                    value={descriptions}
                    className="radioarea"
                  />
                </div>

            
                
                      <button type="submit">Save Changes</button>
                  
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default HomePage;
