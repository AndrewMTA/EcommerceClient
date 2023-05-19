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
                    Makse <span className="required">*</span>
                  </label>
                  <select
                    className="inputOnboard"
                    id="carMake"
                    name="carMake"
                    value={select}
                    onChange={(e) => {
                      setSelect(e.target.value);
                    }}
                  >
                    <option>-Select Make-</option>
                    {makes.map((makes) => {
                      return (
                        <>
                          <option key={makes.id} value={makes.maker}>
                            {makes.maker}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <label className="label">
                    Model <span className="required">*</span>
                  </label>
                  <HandleSelect />
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
                  <label className="label">
                    Year of manufacture <span className="required">*</span>
                  </label>
                  <input
                    id="carYear"
                    name="carYear"
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                    value={years}
                    className="inputOnboard"
                  />
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
                  <label className="radioLabel">Description (recomended)</label>
                  <textarea
                    id="carDescription"
                    name="carDescription"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={descriptions}
                    className="radioarea"
                  />
                </div>

                <label className="radioLabel">
                  Phone <span className="required">*</span>
                </label>
                <div className="flex-row">
                  <select className="inputOnboard1">
                    <option>United States (+1)</option>
                  </select>
                  <input
                    value={phones}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className="inputOnboard3"
                  ></input>
                  <br />
                </div>
                <div className="rapper">
                  {" "}
                  <h2>Specifications</h2>
                </div>

                <div className="inputWrap">
                  <label className="label">
                    Cylinders
                  </label>

                  <input
                    value={cylinders}
                    onChange={(e) => {
                      setCylinders(e.target.value);
                    }}
                    className="inputOnboard"
                  />

                  <div className="rapper">
                    <label className="label">
                      VIN #
                    </label>

                    <input
                      value={vinNum}
                      onChange={(e) => {
                        setVinNum(e.target.value);
                      }}
                      className="inputOnboard"
                    />
                  </div>

                  <div className="rapper">
                    <label className="label">
                      Stock #
                    </label>

                    <input
                      value={stockNum}
                      onChange={(e) => {
                        setStockNum(e.target.value);
                      }}
                      className="inputOnboard"
                    />
                  </div>

                  <div className="rapper">
                    <label className="label">
                      Transmission
                    </label>

                    <input
                      value={trans}
                      onChange={(e) => {
                        setTransmission(e.target.value);
                      }}
                      className="inputOnboard"
                    />
                  </div>

                  <div className="rapper">
                    <label className="label">
                      Drive train
                    </label>

                    <input
                      value={drivetrain}
                      onChange={(e) => {
                        setDrivetrain(e.target.value);
                      }}
                      className="inputOnboard"
                    />
                  </div>

                  <div className="rapper">
                    <label className="label">
                      Mileage
                    </label>

                    <input
                      value={miles}
                      onChange={(e) => {
                        setMiles(e.target.value);
                      }}
                      className="inputOnboard"
                    />
                  </div>
                  <div className="rapper">
                    <label className="label">
                      Body style
                    </label>

                    <input
                      value={body_style}
                      onChange={(e) => {
                        setBody(e.target.value);
                      }}
                      className="inputOnboard"
                    />
                  </div>
                  <div className="rapper">
                    <label className="label">
                      Exterior color
                    </label>
                    <div>
                      <select
                        value={extColor}
                        onChange={(e) => {
                          setExtColor(e.target.value);
                        }}
                        className="inputOnboard"
                      >
                        <option>Beige</option>
                        <option>Yellow</option>
                        <option>Black</option>
                        <option>Orange</option>
                        <option>Blue</option>
                        <option>Purple</option>
                        <option> Brown</option>
                        <option>Red</option>
                        <option>Green</option>
                        <option>Silver</option>
                        <option>Red</option>
                        <option>White</option>
                      </select>
                    </div>
                    <div className="inputWrap">
                      <div className="inputWrap">
                        <label className="label">Interior color</label>
                        <select
                          value={intColor}
                          onChange={(e) => {
                            setIntColor(e.target.value);
                          }}
                          className="inputOnboard"
                        >
                          <option>Beige</option>
                          <option>Yellow</option>
                          <option>Black</option>
                          <option>Orange</option>
                          <option>Blue</option>
                          <option>Purple</option>
                          <option> Brown</option>
                          <option>Red</option>
                          <option>Green</option>
                          <option>Silver</option>
                          <option>Red</option>
                          <option>White</option>
                        </select>
                      </div>
                      <button type="submit">Save Changes</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default HomePage;
