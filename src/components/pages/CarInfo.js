import React, {useEffect, useState} from 'react'
import  Modal from "./ImageGallery.js";
import axios from '../../api/axios'
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../features/productSlice";
import Check from "./Check.png"
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
  const {  listUser, pic, description, price, } = car;
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
  
   console.log("hu", description)

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
      axios.get("http://localhost:3500/all")
        .then((res) => {
          console.log("res", res);
          setPosts(res.data);


 
        })
        .catch((err) => console.log(err));
    }, []);
  

    const Selector = posts.filter((post) => post._id === listUser);

    console.log("dealer", posts.find((post) => post._id === listUser) )
    


    const carx = cars.find((carx) => carx.listUser === carID);

    console.log("dealer", posts.find((post) => post._id === listUser)
    
    
    
    
    
    
    )


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
  
      const res = await axios.post("http://localhost:3500/cars/inquire", {
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
          await axios.post("http://localhost:3500/cars/inquire-confirmation", {
          
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

<div className="sbtn" onClick={goToPrevious}   > <img  className="arrow" src={Left} /></div>
<div className="sbtn" onClick={goToNext} >  <img className="arrow" src={Right} /></div>

</>}
</div>
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
 <img className="CardPic2"  onClick={() => setIsOpen(true)}  src={pic[1].url}/>
 <img className="CardPic2"  onClick={() => setIsOpen(true)}  src={pic[2 ].url}/>
 <img className="CardPic2"  onClick={() => setIsOpen(true)}  src={pic[2 ].url}/>


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



 </div>
 {/*\
 <span className='allMedia'  onClick={() => setIsOpen(true)} >
 <p className='sp'>see all media <span className='c'>📷</span></p> </span>*/ }



 <div className='ContactBox'>
 

 { !show && 

 <>
    <div className='ContactForm'>
<h1 className='header' >2 Neopalitin pizzas</h1> <h2>from mazas pizza</h2>
<br/>
<h2>Get it by: May 22nd</h2>
<br/>
<h3>Select other dates</h3>
<br/>
<h2 className='price'>${price.toLocaleString('en-US') || "null"}</h2>
  <br/>
  <>
  {! user?.seller ? <>
  <button className="btn-add" size="lg" onClick={() => addToCart({ userId: user._id, productId: car._id, price: car.price, image: car.pic[0].url })}>
                                Add to cart
                            </button>
                            {isSuccess && <div>Added!</div>} </> : <>  <button className="btn-add" size="lg" >
                                Add to cart
                            </button></>}
    </>
    </div>
    </>
}

</div>



</div> 

<div className='bottom-section'>

<div className='instructions'>
<h2>Details</h2>
<h2>Ingredients</h2>
</div>


<div className='seller-profile'>
<h2>About Mazas Pizza </h2> 
  <div className="wrap-about">
  
<img className='img-pro' src={Profile}/> <div>Chicago, Illinois</div>
</div>
  <div>
  We're a family-owned and operated pizzeria that has been serving delicious pizzas since 1959. Founded by Joe Aurelio in Homewood, Illinois, Aurelio’s Pizza has grown to over 40 locations across the US, offering a variety of pizzas, salads, sandwiches, and desserts. Aurelio’s Pizza is known for its Super Six "The Works"® pizza, which features sausage, ham, pepperoni, green peppers, mushrooms, and cheese, as well as its Calabrese™
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