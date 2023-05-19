import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom'
import axios from "axios"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar';
const Delete = () => {

const cars = useSelector((state) => state.products);
const {carID} = useParams()
const navigate = useNavigate()
const user = useSelector((state) => state.user);
const axiosPrivate = useAxiosPrivate();

const [showing, setShowing] = useState(false)
const car = cars.find((car) => car._id === carID)
const { pic, make, model, year, description, price, phone} = car;


const deletePost = () => {


    axiosPrivate.delete(`https://backend-6olc.onrender.com/cars/delete/${carID}`)
      .then((res) => {

        if (res.status === 200) {
          navigate(`/listings/${user._id}`)
        }
      }
      
    
      
      
      )
      .catch((err) => {
      
      if (err.response?.status === 403) {
        console.log('Unauthorized');
    } else {
      console.log('Unauth');
    }
      
      
      

  })

  };



  const handleOpen =() => {
    setShowing(true)
  }


  return (
    <>

    <Navbar/>
    <div className="DisplayWrap">
        <div className="navv">
          <h1 className="pusher">Manage Listings</h1> <h4>Billing Info</h4>
        </div>
        <div className="flex">
          {cars.filter((carz) => {
              return user._id === "" ? carz : carz.listUser.includes(user._id);
            })
            .map((carz) => (
              <>
                <div className="card">
                  <img className="CardPic" src={carz.pic[0].url } />
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
                      <a href={`/private/${carz._id}`}>
                      <div className="manage">
                        Set to Private
                      </div>
                      </a>
            
                      <a href={`/delete/${carz._id}`}>
                        <div className="manage__delete">Delete</div>
                      </a>
                  
                    </div>
                  </div>
                </div>{" "}
              </>
            ))}
        </div>
      </div>
    <div className="Overlay3">

 

  <form className="Modal7">
  <div className="CenterMod">
<img className='CarMain7' src={car.pic[0].url} />
</div>
<div className="White">
<h3 >Are you sure you want set your listing { car.private === true ? "public" : <>private</>}?  <br/> <br/> {car.year} {car.make} {car.model}</h3>
<br/>

    <a href={`/listings/${user._id}`}><span className='back'  > Back</span> </a>
  <button     className='pvtbtn'     onClick={() => deletePost(car._id)} >Set to { car.private === true ? "public" : <>private</>}</button> 
  </div>

  </form>


</div>


</>)

}

export default Delete