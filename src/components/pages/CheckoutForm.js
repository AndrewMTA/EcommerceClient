import React, { useState } from "react";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI Components
import Close from "../close.png"
// stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// Util imports
import { options } from "../../catagories";
import Img from "../../assets/Img.png";
// Custom Components

import CardInput from "./CardInput";
import {useParams} from 'react-router-dom'
import { models, makes, listings, logos } from "../../catagories";



import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import useAuth from '../../hooks/useAuth';
function HomePage() {
    const cars = useSelector((state) => state.products);
    const {carID} = useParams()

    const axiosPrivate = useAxiosPrivate();
  const [isProcessing, setIsProcessing] = useState(false);

 const num = 500000
  const [maker, setMaker] = useState("");
  const [models, setModel] = useState("");
  const [disable, setDisable] = useState(true);
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  const user = useSelector((state) => state.user);
  const { setAuth } = useAuth();
  const [images, setImages] = useState([]);
  const [carModel, setCarModel] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState("1 Car Post");
  const [select, setSelect] = useState("");
  const [price, setPrice] = useState("");
  const [numb, setNumb] = useState(0);
  const [show, setShow] = useState(false);
  const [showings, setShowings] = useState(false);
  const [display, setDisplay] = useState(false);
  const [vinNum, setVinNum] = useState("");
  const [imgToRemove, setImgToRemove] = useState(null);
  const [stockNum, setStockNum] = useState("");
  const [transmission, setTransmission] = useState("");
  const [body, setBody] = useState("");
  const [listEmail, setListEmail] = useState("");
  const [miles, setMiles] = useState("");
  const [cylinders, setCylinders] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [extColor, setExtColor] = useState("");
  const [drivetrain, setDrivetrain] = useState("");
  const [intColor, setIntColor] = useState("");
  const [value, setValue] = useState(1);
  const navigate = useNavigate();


  console.log("huh", year.length)


    const stripe = useStripe();
  const elements = useElements();
  const  listUser  = useSelector((state) => state.user._id);
console.log(carID)

const min = 1890;
const max = 2025;

const pizza = logos

console.log(logos)




function formatPhoneNumber(value) {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, "");

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early
  if (phoneNumberLength < 4) return phoneNumber;

  // if phoneNumberLength is greater than 4 and less the 7 we start to return
  // the formatted number
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
}





const handleChange = event => {
  const value = Math.max(min, Math.min(max, Number(event.target.value)));
  setValue(value);

};



const handleInput = (e) => {
  // this is where we'll call the phoneNumberFormatter function
  const formattedPhoneNumber = formatPhoneNumber(e.target.value);
  // we'll set the input value using our setphone
  setPhone(formattedPhoneNumber);
};


  const handleAddListing = async (e) => {

e.preventDefault()

   
    }


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

  const handleSubmitPay = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }


    
    const res = await axios.post("/create-payment", {
      email: email,
      amount: 2000
    });

    const clientSecret = res.data["client_secret"];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log("Money baby");
        navigate("/success");
      
      }
    }
  };

  const handleAddPost = () => {

    if ( !images || !price.slice(0,10) ) {
      console.log( "fields", select, carModel, year.slice(0,4),price.slice(0,10) || phone || country || listEmail )
      return alert("Missing fields!")
     
      
    }


    else axiosPrivate.post("/cars/new", {
      description: description,
      make: select,
      model: carModel,
      images: images,
      price: price.slice(0,9),
      year: year.slice(0,4),
      listUser: listUser,
      phone: phone,
      VIN: vinNum,
      stockNum: stockNum,
      trans: transmission,
      drive_train: drivetrain,
      body_style: body,
      ext_color: extColor,
      int_color: intColor,
      city: city,
      state: state,
      country: country,
      miles: miles,
      cylinders: cylinders,
      listEmail: listEmail
    
    
    
    });   navigate("/success");
  }



const DisableNext = () => {
 
 if  ( 
 year === "" 
 )
 {
  return <div  className="button3">
  Next
</div>
 } else if (  price === "" ) {
  return <div  className="button3">
  Next
</div>
 } else if ( description === "") {
  return ( <div  className="button3">
  Next
</div> )
 } else if ( select === "") {
  return ( <div className="button3">
  Next
</div> )
 }
 else if ( carModel === "") {
  return ( <div  className="button3">
  Next
</div> )
 }
 
 else if ( images === ([])) {
  return ( <div  className="button3">
  Next
</div> )
 }
 
 else {
  return <div onClick={next}    className="button">
  Next
</div>
 }

}
  
const options = listings.filter((listings) => listings.maker === select).map(listing => (
  listing.model.map(model => (
    <option key={model} value={model}>
      {model}
    </option>
  ))
));



const minMax =( e) => {
 if ( value < 1900 ) {
  
 }
}




  function showWidget() {
    const widget = window.cloudinary.createUploadWidget({

      
      maxFiles: 10,
     
     styles:{
      palette: {
        window: "#FFF",
        windowBorder: "#000000",
        tabIcon: "#0E2F5A",
        menuIcons: "#5A616A",
        textDark: "#000",
        textLight: "#000",
        link:  "#0078FF",
        action:  "#666666",
        inactiveTabIcon: "#0E2F5A",
        error: "#F44235",
        inProgress: "#0078FF",
        complete: "#20B832",
        sourceBg: "#FFF"
      },
      frame: {
        background: "#FFF"
      }
    },

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
    <div className="outerWrap">
      <form onSubmit={handleAddListing} className="form">
        <div className="background">
          <div className="flex-col">

              <>
                <h2 className="basic">Basic Information</h2>

                <div className="inputWrap">
                  <label className="label">Style <span className="required">*</span></label>
                  <select
                    className="inputOnboard"
                    id="carMake"
                    name="carMake"
                    value={select}
                    onChange={(e) => {
                      setSelect(e.target.value);
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
              

          
             
                  <b     onClick={showWidget}
                  htmlFor="pic-upload"
                 className="ptag">
                    <img className="iconImg" src={Img} />
                 
                   Upload Images  <span className="required">*</span></b>
      
                  

                <div className="images-preview-container">
                  {images.map((image) => (
                    <div className="pics-preview">  <img onClick={() => deletePic(image)} src={Close} className="deletePic"/>
                      <img className="CardPic22" draggable src={image.url} />
                    </div>
                  ))}
                </div>
           
            
                <label className="label">Price<span className="required">*</span> { price !== "" ? <span>$</span> : <></> }{ price}</label>
                <div className="flex-row">
                  <select className="inputOnboard1">
                    <option>USD</option>
                 
                  </select>

              
                  <input
                     maxLength="4"
                  type="number"
                    className="inputOnboard4"
                    id="carPrice"
                    name="carPrice"
                    placeholder="Price"
                    value={price.slice(0,4)}
                    onChange={(e) => {
                      setPrice(e.target.value.toLocaleString('en-US')).toLocaleString('en-US');
                    }}
                 
                  />

{price.slice(0,3).length  > 4 ? 
                

                          
                    

                <p className="err"> Price must be under 4 figures </p> : <>
 
                </>
 }
            
 
 
                </div>

                

                
                <div className="inputWrap">


                  <label className="radioLabel">Description  </label> <p>{description.length}/425 max.</p>
                  <textarea
                    id="carDescription"
                    name="carDescription"
                    maxlength="425"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={description}
                    className="radioarea"
                  />
               

               


                  <label hidden className="label">Country <span className="required">*</span></label>
                  <div className="inputWrap">
                 
                 <select hidden onChange={(e) => {setCountry(e.target.value)}}className="inputOnboard">
                 <option>- Select a Country - </option>
                   <option>United States </option>
                 </select>


                 {
                 
                 country === "United States" ? 
                 
                 <> 
                 <label className="label">State<span className="required">*</span></label>
                
                 <div className="inputWrap">
                 <select className="inputOnboard6">
                 <option>- Select a State - </option>
                    <option>United States </option>
                  </select>
                  </div>

                  </>
                  : <></>
}
                 </div>
                 </div>
                 
             
                 
                 
                 
              
       


                  <>
           
    
            
          
       <h2>Instructions</h2>




            
            <div hidden className="inputWrap">
            <div hidden className="rapper">
            <textarea
                    id="carDescription"
                    name="carDescription"
                    maxlength="425"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={description}
                    className="radioarea"
                  />

</div>

           

          
<div className="border-box">
            
            </div>
           

        
            


         
              <button onClick={handleAddPost} className="button1">Post For Free</button>
            </div>
          </>


       

     
              </>

          </div>
          
        </div>

      
      </form>
    </div>
  );
}

export default HomePage;
