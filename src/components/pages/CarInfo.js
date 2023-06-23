import React, {useEffect, useState} from 'react'
import  Modal from "./ImageGallery.js";
import axios from '../../api/axios'
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../features/productSlice";
import Check from "./Check.png"
import Lazy from './Lazy.js';
import CarsCard from "../CarsCard2"
import {
   Buggati,
   Ferrari,
   Lamborghini,
   makes,
   listings,
 } from "../../catagories";

 import Profile from "./zza.jpg"
 import Left from './pagesAssets/Left.png'
 import Right from './pagesAssets/Right.png'
import {useParams} from 'react-router-dom'

import Navbar from '../Navbar';
import Footer from '../Footer.js';
import { useAddToCartMutation } from "../../services/appApi";

const CarInfo = () => {

  const cars = useSelector((state) => state.products);
  const [show, setShow] = useState(false)
  const [newsLetter, setNewsLetter] = useState(true)
  const [newListings, setNewListings ] = useState(true)
  const [posts, setPosts] = useState([])
  const {carID} = useParams()
  const car = cars.find((car) => car._id === carID)
  const user = useSelector((state) => state.user);
  const {  listUser, pic, description, quant, price, total, title, ingredients, seller, quantity, category } = car;
  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
  };
  
  const dotStyle = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
  };
    const [page, setPage] = useState(2);
  
 

  const [isOpen, setIsOpen] = useState(false);

    const carsPerPage = 3;
    const lastIndex = page * carsPerPage;
    const firstIndex = lastIndex - carsPerPage;
    const [display, setDisplay] = useState(false);

    const [count, setCount] = useState(0);
    const [name, setName] = useState("Your Name");
    const [phoneNum, setPhoneNum] = useState( "Your Phone Number");
    const [email, setEmail] = useState( "Your email" );
    const [dealerz, setDealerz] = useState("");
    const [addToCart, { isSuccess }] = useAddToCartMutation();
   useEffect(() => {
      axios.get("/all")
        .then((res) => {
        
          setPosts(res.data);


 
        })
        .catch((err) => console.log(err));
    }, []);
  

    const Selector = posts.filter((post) => post._id === listUser);

   
    


    const carx = cars.find((carx) => carx.listUser === carID);

   
    
    
    
    
    


const showArrow = () => {
 
  setDisplay(false)
}



const hideArrow = () => {

  setDisplay(true)
}

console.log( "Num", cars.filter ((carz) => carz.listUser.includes(carID)))
const [currentIndex, setCurrentIndex] = useState(0);
const goToPrevious = () => {
  const isFirstSlide = currentIndex === 0;
  const newIndex = isFirstSlide ? pic.length - 1 : currentIndex - 1;
  setCurrentIndex(newIndex);
};
const goToNext = () => {
  const isLastSlide = currentIndex === pic.length - 1;
  const newIndex = isLastSlide ? 0 : currentIndex + 1;
  setCurrentIndex(newIndex);
};
const goToSlide = (slideIndex) => {
  setCurrentIndex(slideIndex);
};



    const dealer = "Bob's Auto";
    const listEmail = "2353andrew@gmail.com"
    const handleSubmit = async (event) => {
    
      event.preventDefault();
  
      const res = await axios.post("/cars/inquire", {
        email: email,
        name: name, 
      
        listEmail: listEmail,
        dealer: dealer,
        carID: carID,
      
        pic: car.pic[0].url
      });
  

  
     
  
      if (res.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(res.error.message);
      } else {
        // The payment has been processed!
        if (res.status === 200) {
          await axios.post("/cars/inquire-confirmation", {
          
            listEmail: listEmail,
            dealer: dealer,
            carID: carID,
        
            pic: car.pic[0].url
          });
      
  setShow(true)
        }
      }
    };
  return (

    <>
    <Navbar/>
    <Modal
                    open={isOpen}
                    onClose={() => {
                    
                      setIsOpen(false);
                    }}


        
                  />
<div className='DisplayWrap'>
    <div className='push'>
    <div className='lpush' ><h1 className='carTitle'> </h1></div>

<div  className='flex5'>


<div className="CarMain1">

 <img className="CarMain"  onClick={() => setIsOpen(true)}  src={pic[0].url}/>

   <div onMouseLeave={hideArrow}  onMouseEnter={showArrow} className='sliderWrap'>
   <img  className="CarMain8"  onClick={() => setIsOpen(true)}  src={pic[currentIndex].url}/>
   <div className="flex-row2" >
{ !display && <>
<div className='raiser'>
<div className="sbtn" onClick={goToPrevious}   > <img  className="arrow" src={Left} /></div>
<div className="sbtn" onClick={goToNext} >  <img className="arrow" src={Right} /></div>
</div>
</>}

</div>

 </div>


 <div className='inst'>
<h2>Details</h2>
 <div className='instruct'>{description}</div>
 </div>
 
        
 { description !== " " ? <> 




</>

 : <span></span>
}
<div>

<div>

  
<div className='flex-rowzx'>

  <div className='flex-columnzx'>


</div>

<div className='flex-columnzx'>


</div>



</div>





</div>




</div>


 </div>
 <div className='slider2'>
 <Lazy
  src={pic[1].url}
  alt="Image"
  placeholder="placeholder.jpg"
  className="CardPic2"
/>
<Lazy
  src={pic[2].url}
  alt="Image"
  placeholder="placeholder.jpg"
  className="CardPic2"
/> <Lazy
  src={pic[3].url}
  alt="Image"
  placeholder="placeholder.jpg"
  className="CardPic2"
/>
 
 


{/** 
 <div >
 <div >
   
    <div ><p className='one'>    
     {Selector.map((post) => {
            return (
              <div
       
                key={post._id }
              >
             
             
                <div
               >   <a href={`/seller/${listUser}`}> {post.sellerName}</a>
               
                </div>
              </div>
            );
          })}</p></div> 
    <div> <a href={`/seller/${listUser}`}><p> All Listings By Seller </p> </a> </div>

 
    </div>

 


</div> */}
<div className="shower">
<div className="col-sec">
<h2>Ingredients</h2>
<span className='instruct2'>{ingredients}</span>
</div>
</div>
<div className="small-add">
  <h2>Get it by: May 22nd</h2>
<br/>
<h3>Select other dates</h3>
<br/>
<h2 className='price'>${total.toLocaleString('en-US') || "null"}</h2>
{user ? <>

 
<button className="btn-add" size="lg" onClick={() => addToCart({ userId: user._id, listStripe: car.listStripe,productId: car._id, price: car.total, beforeShipping: car.price, image: car.pic[0].url, listUser: car.listUser})}>
                              Add to cart
                          </button>
                          {isSuccess && <div>Added!</div>} </> : <a href="/register">  <button className="btn-add" size="lg" >
                              Add to cart
                          </button></a>}

 </div>
 </div>
 {/*\
 <span className='allMedia'  onClick={() => setIsOpen(true)} >
 <p className='sp'>see all media <span className='c'>📷</span></p> </span>*/ }

 <div className='hider'>
<div className="col-sec">
<h2>Ingredients</h2>
<span className='instruct2'>{ingredients}</span>
</div>

</div>
 <div className='ContactBox'>
 

 { !show && 

 <>
    <div className='ContactForm'>
      <div className="row-titl">
<h1 className='header' >{quant}  {category} {title}{quant > 1 && <>s</>}</h1> <h2 >from {seller}</h2> </div>
<br/>
<div className="fff">
<h2>Get it by: May 22nd</h2>
<br/>
<h3>Select other dates</h3>
<br/>
<h2 className='price'>${total.toLocaleString('en-US') || "null"}</h2>
  <br/>
  <>
  {user ? <>

 
  <button className="btn-add" size="lg" onClick={() => addToCart({ userId: user._id, listStripe: car.listStripe, beforeShipping: car.price, productId: car._id, price: car.total , image: car.pic[0].url, listUser: car.listUser})}>
                                Add to cart
                            </button>
                            {isSuccess && <div>Added!</div>} </> : <a href="/register">  <button className="btn-add" size="lg" >
                                Add to cart
                            </button></a>}
    </>
    </div>
<div className="right-side">
<h2>Get it by: May 22nd</h2>
<br/>
<h3>Select other dates</h3>
<br/>
<h2 className='price'>${total.toLocaleString('en-US') || "null"}</h2>
  <br/>
  <>
  {user ? <>

 
  <button className="btn-add" size="lg" onClick={() => addToCart({ userId: user._id, listStripe: car.listStripe, beforeShipping: car.price, productId: car._id, price: car.total, image: car.pic[0].url, listUser: car.listUser})}>
                                Add to cart
                            </button>
                            {isSuccess && <div>Added!</div>} </> : <a href="/register">  <button className="btn-add" size="lg" >
                                Add to cart
                            </button></a>}
    </>
    </div></div>

    
    </>

    
}   

</div>



</div> 

<div className='bottom-section'>


<div className='instructions'>
  <div className='ppp'>
<h2>Details</h2>
 <div className='instruct'>{description}</div>
 </div>
 <div className="hider1">
<div className="col-sec">
<h2>Ingredients</h2>
<div className='instruct5'>{ingredients}</div>
</div>
</div>


</div>

</div>
 </div>



  
  

  
  
  




 

 </div>

 <Footer/>
    </>
  )
}

export default CarInfo