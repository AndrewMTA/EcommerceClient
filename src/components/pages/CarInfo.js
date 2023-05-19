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
 <div className='descrip'><h3>Description</h3></div>
<p className="pd">{description || "null"} </p>


</>

 : <span></span>
}
<div>

<div>

  <div className='specs'><h3>Instructions</h3></div>
<div className='flex-rowzx'>

  <div className='flex-columnzx'>
<div className="spec"><b>Make          </b> </div>

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


 <div className='descripti'><h3 >See All Media</h3></div>
 <div className="simList">
 <div className="dealerInfo">
    <h3><b>Sold By</b></h3>
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
    <div><p>See Address</p></div>
 
    </div>

    <h2 className='similar'>Similar Listings:</h2>
<div className='recomendations'> 

{cars.slice(firstIndex, lastIndex).map((SelectMax15) => (
            <CarsCard key={SelectMax15} {...SelectMax15} />
          ))}
</div>
<div className="center"> <button className='Submitz'>See More Listings</button></div>
</div>

 </div>
 {/*\
 <span className='allMedia'  onClick={() => setIsOpen(true)} >
 <p className='sp'>see all media <span className='c'>📷</span></p> </span>*/ }



 <div className='ContactBox'>
 <div className='priceBox3'>
    <h2 className='price'>${price.toLocaleString('en-US') || "null"}</h2>
 </div>

 { !show && 

 <>
    <div className='ContactForm'>


   
    <button size="lg" onClick={() => addToCart({ userId: user._id, productId: car._id, price: car.price, image: car.pic[0].url })}>
                                Add to cart
                            </button>
                            {isSuccess && <div>Added!</div>}
    </div>
    </>
}
{ show && 

<>
   <form className='ContactForm1'>
  <h3 className='FormTitle'> Form Submitted</h3> 
 <img className="check" src={Check}/>
   </form>
   </>
}
<div className="dealerInfo2">
    <h3><b>Dealer Info</b></h3>
    <div ><p className='one'>Sold By :       
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
    <div><p>See Address</p></div>
 
    </div>
<div className="listingsz">
<h2 className='similar'>Similar Listings:</h2>
<div className='recomendations'> 

{cars.slice(firstIndex, lastIndex).map((SelectMax15) => (
            <CarsCard key={SelectMax15} {...SelectMax15} />
          ))}
</div>
<a href="/cars" className="center"> <div className='Submitz'>See More Listings</div></a>


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