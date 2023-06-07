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

import DefaultImg from "./Default.png"

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
  const [ingredients, setIngredients] = useState("");
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
  const [weightWarning, setWeightWarning] = useState(false);
  const [value, setValue] = useState(1);
  const navigate = useNavigate();
const [title, setTitle] = useState("")
const [weight, setWeight] = useState("")
const [quantity, setQuantity] = useState("")


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


const basePrice = 25;
const maxBasePrice = 40;
const additionalPricePerPound = 6;
const minShippingPrice = basePrice + (additionalPricePerPound * (weight - 1));
const maxShippingPrice = maxBasePrice + (additionalPricePerPound * weight);
const shippingRange = `$${minShippingPrice} - $${maxShippingPrice}`;


let total = "";
if (!isNaN(price) && !isNaN(weight)) {
  const parsedPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
  const parsedWeight = parseFloat(weight.replace(/[^0-9.-]+/g, ""));
  const shippingCost = 46 + (6 * (parsedWeight - 1));
  const maxShippingPrice = parsedPrice + shippingCost;
  total = maxShippingPrice
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
      images: images,
      price: price.slice(0,9),
      listUser: listUser,
      title: "Pizza",
      ingredients: ingredients,
      quant: quantity,
      category: select,
      weight: weight,
      seller: user.sellerName
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



const handleFileUpload = async (event) => {
  const files = Array.from(event.target.files);

  if (images.length + files.length > 4) {
    // If the total number of images exceeds 4, do not proceed with the upload
    return;
  }

  const formDataArray = files.map((file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'qmakq1p3'); // Replace with your Cloudinary upload preset
    return formData;
  });

  try {
    const uploadResponses = await Promise.all(
      formDataArray.map((formData) =>
        axios.post('https://api.cloudinary.com/v1_1/dojwag3u1/image/upload', formData)
      )
    );

    const uploadedImages = uploadResponses.map((response) => ({
      url: response.data.secure_url,
      public_id: response.data.public_id
    }));

    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  } catch (error) {
    console.error('Error uploading images:', error);
  }
};
  
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
        <div className="row-form">
      
          <div className="flex-col">

              <>
                <h2 className="basic">Basic Information</h2>

                <div className="inputWrap">
                <label className="label">Quantity Per Order*</label>
<p className="tiny">Selling your products in bundles can be cost effective when it comes to shipping</p>
<input maxLength={2} onChange={(e) => setQuantity(e.target.value)} className="inputOnboard8"/>


                <label className="label">Product Type*</label>

<select  onChange={(e) => setTitle(e.target.value)} >
  <option>Pizza</option>
  </select>
{/** 
<input onChange={(e) => setTitle(e.target.value)} className="inputOnboard"/>*/}
      <label className="label">Category<span className="required">*</span></label>
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
             
                  <label className="label">Total weight <span className="tiny">pounds (lb)</span> </label>
<p className="tiny">Include weight of packing material</p>
{weightWarning && <p className="warning2">Weight should be under 15 pounds.</p>}
<input
  maxLength={2}
  onChange={(e) => {
    const newWeight = parseFloat(e.target.value.replace(/[^0-9.-]+/g, ""));
    if (newWeight <= 15 || e.target.value === "") {
      setWeight(newWeight.toLocaleString('en-US'));
      setWeightWarning(false);
    } else {
      setWeightWarning(true);
    }
  }}
  className={`inputOnboard8 ${weightWarning && weight !== "" ? "inputOnboard9" : ""}`}
/>


          
                </div>
 
                <div>
  <input hidden type="file" multiple onChange={handleFileUpload} accept="image/*" id="pic-upload" />

  <label htmlFor="pic-upload" className="ptag">
    <img className="iconImg" src={Img} />
    Upload Images <span className="required">*</span>
  </label>

  <div className="images-preview-container">
    {images.map((image, index) => (
      <div className="pics-preview" key={index}>
        <img onClick={() => deletePic(image)} src={Close} className="deletePic" />
        <img className="CardPic22" draggable src={image.url} />
      </div>
    ))}
  </div>
</div>

           

<label className="radioLabel">Shipping * </label>

<div>

  <div>
    Fedex 2 day A.M {weight > 0 && <>{shippingRange}</>}
  </div>
  
</div>

            
                <label className="label">Price<span className="required">*</span></label>
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
                      const newPrice = parseFloat(e.target.value.replace(/[^0-9.-]+/g, ""));
                      setPrice(newPrice.toLocaleString('en-US'));
                     
                    }}
                    
                 
                  />

{price.slice(0,3).length  > 4 ? 
                

                          
                    

                <p className="err"> Price must be under 4 figures </p> : <>
 
                </>
 }
        
 
 
                </div>

                {!isNaN(total) && total !== "" && (
  <div>
    <label className="radioLabel">Total with shipping</label>
    <div>{total !== "" ? <span>$</span> : <></>}{total}</div>
  </div>
)}

<p className="tiny">Any difference left over after shipping cost is sent to you.</p>
                 
                
                <div className="inputWrap">





</div>
                

                
                <div className="inputWrap">


                  <label className="radioLabel">Description * </label> <p>{description.length}/425 max.</p>
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
     
                 
             
                 
                 
                 
              
       


                  <>
    
                  <label > <h3>Ingredients</h3></label> <p>{description.length}/425 max.</p>




            
            <div hidden className="inputWrap">
            <div hidden className="rapper">
            <textarea
onChange={(e) => setIngredients(e.target.value)}

                    id="carDescription"
                    name="carDescription"
                    maxlength="425"
     
             
                    className="radioarea"
                  />

</div>

           

           

        
            

<br/>
         
              <button onClick={handleAddPost} className="button1">Post For Free</button>
            </div>
          </>


       

     
              </>

              

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
     {quantity} {select} { quantity !== "" && <>Pizza</>}{quantity > 1 &&  select !== "" && <>s</>} 
     </p>

     <p className="lp"> </p>
     </div>
     </div>
       </div>
        </div>

      
      </form>

     
    </div>
  );
}

export default HomePage;
