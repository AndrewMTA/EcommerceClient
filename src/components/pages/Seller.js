import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../features/productSlice";
import Modal from "./Modal"
import {useParams} from 'react-router-dom'

import Navbar from '../Navbar';
import Soon from "../../assets/Soon.png"
import ana from "./ana.png"

import CarsCard2 from "../CarsCard2";
import Footer from '../Footer';

const MyListings = () => {
    console.log(useParams())

    useEffect(() => {
      axios.get("/cars").then(({ data }) => dispatch(updateProducts(data)));
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false)
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.products);

    const {carID} = useParams()
    const car = cars.find((car) => car.listUser === carID);

      const carId = cars.find((car) => car._id === carID)
const setMenu = () => {
  setShow(true)
}

const openModal = () => {
  setIsOpen(true)
}

const setClose = () => {
  setShow(false)
}
    const { pic, make, model, year, description, price, phone} = car

    
  return (

    <>

<Navbar/>


<div className="DisplayWrap">
  
<div className="navv"> 
<h1 className='pusher'>Cars Listed By Dealer</h1> 
</div>
<div className="flex">
  



          {
          
          
          
          cars.filter((carz) =>{
return carID === '' ? carz : carz.listUser.includes(carID)
          }).map((carz) => ( 

            <>
          
            <div  className="card">
          

            <img className="CardPic"src={carz.pic[0].url || Soon} /> 
            <div className="Textbox">
            <div className="impression">   <h3 className="h3">
      
            ${carz.price || "Nothing yet"} </h3> <img className="ana"src={ana}/> </div>
            {carz.make || "Nothing yet"}  {carz.model || "Nothing yet"}
            <div className='displayEdit'>
 
            
      <Modal
                    
                    carMake         ={carz.make}
                    carPic          ={carz.pic[0].url}
                    carModel        ={carz.model}
                    carDeleteID     ={carz._id}
                    open={isOpen}
                    onClose={() => {
                    
                      setIsOpen(false);
                    }}
                  />
            </div>
            </div>
            </div>    </>
          ))}
        </div>

 </div>
 <Footer/>
    </>

  )
}

export default MyListings