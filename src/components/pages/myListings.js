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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAddToCartMutation } from "../../services/appApi";
import Footer from "../Footer";
import SubNav from "./subNav";
import Profile from "./zza.jpg"
const MyListings = () => {
  const user = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    axios
      .get("/cars")
      .then(({ data }) => dispatch(updateProducts(data)));
  }, []);


  const [showing, setShowing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.products);
////console.log("user", user)
 
  const car = cars.find((car) => car.listUser === user._id );

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

  const { pic, make, model, year, description, price, phone, quant, total} = car; } 
  return (
    <>
      <Navbar />

     <SubNav/>

      <div className="DisplayWrap">
      <div className='seller-profile-1'>
<h2>{user?.sellerName}</h2> 
  <div className="wrap-about">
  {/**
<img className='img-pro' src={Profile || null}/>  */}<div>{user?.address[0]?.city || "Chicago"}, {user.address[0]?.state || "Illinois"}</div>
</div>
 {/** <div className="text-wrapping">
  We're a family-owned and operated pizzeria that has been serving delicious pizzas since 1959. Founded by Joe Aurelio in Homewood, Illinois, Aurelio’s Pizza has grown to over 40 locations across the US, offering a variety of pizzas, salads, sandwiches, and desserts. Aurelio’s Pizza is known for its Super Six "The Works"® pizza, which features sausage, ham, pepperoni, green peppers, mushrooms, and cheese, as well as its Calabrese™
  </div> */} 
</div>

        <div className="navv">
          
      
          
          
          
                    <h1 className="pusher">Manage Products <a  className="hu"href={`/add-product`}><div >+ Add a product</div></a></h1> 
        </div>



{   !car  ? 
 <div className="flex">
{!car ? <> <a className="add" href={`/add-product`}><div className="listingBox">+ Add a product</div></a></> : <>Manage Products <a className="add-products" href={`/add-product`}></a> </>}
  
</div> :       <div className="flex">

          {cars
            .filter((carz) => {
              return user._id === "" ? carz : carz.listUser.includes(user._id);
            })
            .map((carz) => (
              <>
                <div className="card">
                  { carz.private === true ? <h2 className="PrivateList">Private</h2 > : <></>}


                  {/* carz.sponsered === true ? <h2 className="PrivateList1">Sponsored</h2 > : <></> */}
                  <img className="CardPic-lil" src={carz.pic[0].url || Soon} />
                  <div className="Textbox">
                       {carz.seller}
                    <div className="impression">

                   
                 
                      <h3 className="h3">
                        ${carz.total || "Nothing yet"}{" "}
                      </h3>{" "}
                      {/*<img className="ana"src={ana}/> */}
                    </div>
                    {carz.quant|| "Nohing yet"} {carz.category || "Nothing yet"} {carz.title || "Nothing yet"}{carz.quant > 1 && <>s</>}
                 
                    <div className="displayEdit">
                      
                      <a href={`/edit/${carz._id}`}>
               
                        <div className="manage">Edit</div>{" "}
                      </a>{" "}
                      {/**  <div className='manage'>Promote</div> */}{" "}
                      { carz.private === true ? <a href={`/private/${carz._id}`}>
                      <div className="manage">
                        Set to Public
                      </div>
                      </a> : <></>}  { carz.private !== true ?   <a href={`/private/${carz._id}`}>
                     {/** <div className="manage">
                        Set to Private
                      </div> */} 
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

            {cars
            .filter((carz) => {
              return user._id === "" ? carz : carz.listUser.includes(user._id);
            }).length < 3 && <div className="insert">  gygygyg</div>}
            {cars
            .filter((carz) => {
              return user._id === "" ? carz : carz.listUser.includes(user._id);
            }).length < 2 && <div className="insert">  gygygyg</div>}
            {cars
            .filter((carz) => {
              return user._id === "" ? carz : carz.listUser.includes(user._id);
            }).length < 1 && <div className="insert">  gygygyg</div>}
        </div>

      
}
      </div>

    </>
  );
};

export default MyListings;
