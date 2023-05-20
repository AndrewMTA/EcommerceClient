import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../features/productSlice";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Soon from "../../assets/Soon.png";
import ana from "./ana.png";
import CarsCard2 from "../CarsCard2";
import { axiosPrivate } from "../../api/axios";
import { useAddToCartMutation } from "../../services/appApi";
import Footer from "../Footer";

const MyListings = () => {
  const user = useSelector((state) => state.user);
  console.log("user1", user);
  console.log(useParams());

  useEffect(() => {
    axios
      .get("http://localhost:3500/cars")
      .then(({ data }) => dispatch(updateProducts(data)));
  }, []);

  const handleSetPrivate = async (event) => {
    event.preventDefault();
    const updates = {};

    const res = await axiosPrivate.put(
      `/cars/update/${carID}`,
      {}
    );
  };

  const [showing, setShowing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.products);
console.log("user", user)
  const { carID } = useParams();
  const car = cars.find((car) => car.listUser === carID );

  const setMenu = () => {
    setShow(true);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleCloses = () => {
    setShowing(true);
  };

  const handleOpens = () => {
    setShowing(false);
  };

  const setClose = () => {
    setShow(false);
  };


if (car) {

  const { pic, make, model, year, description, price, phone } = car; } 
  return (
    <>
      <Navbar />

      <div className="dashboard">
      <div className="dash-options">
        Add Products
      </div>
     <a href="/orders"> <div className="dash-options"> 
        Orders
      </div> </a>
      <div className="dash-options">
        Payments
      </div>
      </div>

      <div className="DisplayWrap">
        <div className="navv">
          <h1 className="pusher">{!car ? <>No listings yet <a className="add" href={`/checkout/${user._id}`}>Click to add</a></> : <>Manage Listings</>}</h1> 
        </div>



{   !car  ? 
 <div className="flex">
<h1>No listings yet</h1> </div> :       <div className="flex">

          {cars
            .filter((carz) => {
              return carID === "" ? carz : carz.listUser.includes(carID);
            })
            .map((carz) => (
              <>
                <div className="card">
                  { carz.private === true ? <h2 className="PrivateList">Private</h2 > : <></>}


                  {/* carz.sponsered === true ? <h2 className="PrivateList1">Sponsored</h2 > : <></> */}
                  <img className="CardPic" src={carz.pic[0].url || Soon} />
                  <div className="Textbox">
                    <div className="impression">
                      {" "}
                      <h3 className="h3">
                        ${carz.price || "Nothing yet"}{" "}
                      </h3>{" "}
                      {/*<img className="ana"src={ana}/> */}
                    </div>
                    {carz.make || "Nothing yet"} {carz.model || "Nothing yet"}{" "}
                    {carz.model || "Nothing yet"}
                    <div className="displayEdit">
                      
                      <a href={`/edit/${carz._id}`}>
                        {" "}
                        <div className="manage">Edit</div>{" "}
                      </a>{" "}
                      {/**  <div className='manage'>Promote</div> */}{" "}
                      { carz.private === true ? <a href={`/private/${carz._id}`}>
                      <div className="manage">
                        Set to Public
                      </div>
                      </a> : <></>}  { carz.private !== true ?   <a href={`/private/${carz._id}`}>
                      <div className="manage">
                        Set to Private
                      </div>
                      </a> : <></>} 
            
                      <a href={`/delete/${carz._id}`}>
                        <div className="manage__delete">Delete</div>
                      </a>
                      <Modal
                        carMake={carz.make}
                        carPic={carz.pic[0].url}
                        carModel={carz.model}
                        carDeleteID={carz._id}
                        open={isOpen}
                        onClose={() => {
                          setIsOpen(false);
                        }}
                      />
                    </div>
                  </div>
          
                </div>{" "}
              </>
            ))}
        
        </div>

      
}
      </div>
      <Footer/>
    </>
  );
};

export default MyListings;
