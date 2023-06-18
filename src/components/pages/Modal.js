import React, { useEffect, useState } from "react";
import "../../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../features/productSlice";
import axios from "axios"

const Modal = ({ open, onClose,   carMake,     
  carPic        ,
  carModel      ,
  carDeleteID   }) => {
  const cars = useSelector((state) => state.products);


  const deletePost = () => {
   
    const deleteId = cars._id;

    axios.delete(`/cars/delete/${deleteId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };


  
 
  if (!open) return null;

  return (
    <div className="OverLay">

 
        <div onClick={onClose} className="close"><span className="x">x</span> close</div>
      <form className="Modal">

      <h2>Are you sure you want to delete</h2>
   {carMake} {carModel}

      <p>Deletion is permanant and cannot be undone</p>

      <button>Yes I'm sure</button>    <button>No I'm not</button>
      <button  >Delete</button>
      </form>

 
    </div>
  );
};

export default Modal;
