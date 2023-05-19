import React, { useEffect, useState } from "react";
import "../../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../features/productSlice";

import {useParams} from "react-router-dom"
const Modal = ({ open, onClose }) => {
  const cars = useSelector((state) => state.products);
  const [isOpen, setIsOpen] = useState(false);
    const {carID} = useParams()
    const car = cars.find((car) => car._id === carID)
    
const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
};


    const { pic, make, model, year, description, price, phone} = car;
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

    const dispatch = useDispatch();
 
  if (!open) return null;

  return (
    <div className="OverLay">
        <div onClick={onClose} className="close"><span className="x">x</span> close</div>
      <form className="Modal">
   <div className="CenterMod">
        <img className="CarMain6"  onClick={() => setIsOpen(true)}  src={pic[currentIndex].url}/>
        </div>
        <div>{currentIndex + 1} / {pic.length}</div>
      <div className="flex-row1" >
     
 
        <div className="sbtn" onClick={goToPrevious} > « </div>
        <div className="sbtn" onClick={goToNext}> » </div>
        </div>
      </form>

 
    </div>
  );
};

export default Modal;
