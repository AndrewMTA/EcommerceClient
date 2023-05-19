import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom'
import axios from "axios"
import { updateProducts } from "../../features/productSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar';
const Delete = () => {
const dispatch = useDispatch()
const cars = useSelector((state) => state.products);
const {carID} = useParams()
const navigate = useNavigate()
const user = useSelector((state) => state.user);
const axiosPrivate = useAxiosPrivate();
const [trues, setTrue] = useState(false)
const [showing, setShowing] = useState(false)
const car = cars.find((car) => car._id === carID)
useEffect(() => {
  axios
    .get("https://backend-6olc.onrender.com/cars")

}, []);










const deletePost = (e) => {


e.preventDefault()

axiosPrivate.delete(
      
      
    `https://backend-6olc.onrender.com/cars/delete/${carID}`).then((res) => {

        if (res.status === 200) {
          console.log("succexs")
          setTrue(true)
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
    { user ?
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

 
<img className='CarMain7' src={car.pic[0].url} />
<div className="White">

  {!showing && <>
<h3 className="deleteL">Are you sure you want to delete your listing: {car.year} {car.make} {car.model}?</h3>
</>}

  <p>Deletion is permanant and cannot be undone</p>
  <br/>
{ !showing && <>
  <button onClick={handleOpen}>Yes I'm sure</button>  <a  href={`/listings/${user._id}`}><span  className='back' >No I'm not</span>  </a>
  </>
}
  {showing && <>

    <a  href={`/listings/${user._id}`}><span className='back'  > Back</span> </a>
  <span     className='Deletebtn'     onClick={deletePost} >Delete</span> </> }
  </div>
  </form>


</div>

</>
: <>    </>
  }

  </>
  )
}

export default Delete