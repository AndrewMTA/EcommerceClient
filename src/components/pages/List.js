    import React from 'react'
    import {useState} from 'react'
    import axios from 'axios'
    import {useNavigate} from 'react-router-dom'
    import { useDispatch, useSelector } from "react-redux"
    import Img from "../../assets/Img.png";
    import { useRef } from "react"



    import { useCreateProductMutation } from "../../services/appApi";
    import {

      makes,
      listings,
    } from "../../catagories";
    
    import {useParams} from "react-router-dom"
    import useFormContext from "../../hooks/useFormContext"
    const List = (_id) => {
      const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();
 
      const [model, setModel] = useState("");
      const [showings, setShowings] = useState(true);
      const [images, setImages] = useState([])

      const [imagePreview, setImagePreview] = useState(null);
   
      const [selected, setSelected] = useState("");
        
  const  listUser  = useSelector((state) => state.user._id);

  const { data, handleChange } = useFormContext()






  

        const Selector = listings.filter(
          (listings) => listings.maker === data.carMake
        );
  



const navigate = useNavigate() 

const HandleSelect = () => {
  if (data.carMake === "All carMakes") {
  
    return (
      <select

      className="inputOnboard"
        onChange={(e) => 
          setModel(e.target.value)} value={model}
      >
        
        <option>Choose a model</option>
        {Selector.map((Selector) => {
          return (
            <option key={Selector.model} value={Selector.model}>
              {Selector.model}
            </option>
          );
        })}
      </select>
    );
  } else  {

    return (
      <>
   <label className='label'>Model*</label>
      <select
      className="inputOnboard"
        onChange={handleChange} value={data.model}
    >
        <option>Choose a model</option>
        {Selector.map((Selector) => {
          return (
            <option key={Selector.model} value={Selector.model}>
              {Selector.model}
            </option>
          );
        })}
      </select>
      </>
    );
  }
};







  
  
      



function showWidget() {
  const widget = window.cloudinary.createUploadWidget(
      {
          cloudName: "dojwag3u1",
          uploadPreset: "qmakq1p3",
      },
      (error, result) => {
          if (!error && result.event === "success") {
              setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
          }
      }
  );
  widget.open();
}



      const handlePostPic = (event) => {
        setImages(event.target.files[0]);
        setImagePreview(URL.createObjectURL(event.target.files[0]));
        setShowings(false);
      };
     
      
    const content = (

      <div className='background'>
        <div className='flex-col'>
          


            
                <h2>Basic Information</h2>



                <div className="inputWrap">
                  <label className='label'>Make</label>
             <select
         className="inputOnboard"  id="carMake"
         name="carMake"    value={data.carMake} 
        onChange={handleChange}
      >
        <option value="All Makes">All makes</option>
        {makes.map((makes) => {
          return (
            <option key={makes.id} value={makes.maker}>
              {makes.maker}
            </option>
          );
        })}
      </select> 


  
</div>
                <div  className="inputWrap">
             
                </div>
              
            
          <label onClick={showWidget} htmlFor="pic-upload" className="picBoxUpload">
            <i htmlFor="pic-upload"></i>
            <div className="innerWrapper">
              <img className="iconImg" src={Img} />
              <p className="ptaged">
                <i>Upload Media</i>
              </p>
            </div>
          </label>
                    


         <div className="images-preview-container">
         {images.map((image) => (
             <div className="pics-preview">
                 <img className='CardPic22' src={image.url} />
              
             </div>
         ))}
     </div>       


                <div className="inputWrap">
                <label className='label'>Year of manufacture</label>   
                <input    id="carYear"
  name="carYear" onChange={handleChange} value={data.carYear}   className="inputOnboard"/>
                </div>
                <div  className="inputWrap">
                <label className='label'>Mileage</label>   
                <input    className="inputOnboard"/>
                </div>
                <div className="inputWrap">
                <label className='label'>City*</label>   
                <input    className="inputOnboard"/>
                </div>
                <div  className="inputWrap">
                <label className='label'>State</label>   
                <input   className="inputOnboard"/>
                </div>

         
           {/*    <div  className="inputWrap">
                <label className='label'>Car type*</label>   
                <select    className="inputOnboard">
                <option>- Select Type -</option>
                    <option>Convertible/Roadster</option>
                    <option>Coupe</option>
                    <option>Saloon</option>
                    <option>Single Seater</option>
                    <option>SUV</option>
                    <option>Station Wagon</option>
                </select>
                </div>
                <div className="inputWrap">
                <label className='label'>Competition car? </label>   
                

                </div>
                <div className="yn">
                <label>yes</label>
                <input   className="inputOnboard" type="radio" placeholder='yes'/>
                
                
                <label className='no'>no</label>
                <input    className="inputOnboard" type="radio" />
                </div>
                <div  className="inputWrap">
                <label className='label'>Year of manufacture</label>   
                <input   className="inputOnboard"/>
                </div> */ } 
   
   
                <h2>Price</h2>
                <label className='label'>Price*</label>    
                <div className='flex-row'  >
                 <select className="inputOnboard1">
                    <option>USD</option>
                    <option>USD</option>
                    <option>USD</option>
                    <option>USD</option>
                    <option>USD</option>
                    <option>USD</option>
                    <option>USD</option>
                </select>
                <input

  className="inputOnboard3"
  id="carPrice"
  name="carPrice"
  placeholder="Price"
  onChange={handleChange} value={data.carPrice}
/>
             </div>
          


              
              


{/*         <input    className="inputOnboard" type="radio"/><label>Price On Request</label>       <div  className="inputWrap">
                    <h2>Specifications</h2>
                 
                    <div className='radioWrap'>

<label  className="inputLabel">Condition</label>

  <div>
    <select  className="inputOnboard">
  <option>Original condition</option>
  <option>Restoration project</option>
  <option>New</option>
  <option>Used</option>
  <option>Used with guarantee</option>
  
  </select>
  </div>
  </div>
</div>
<div  className='inputWrap'>

<label  className="inputLabel" >Exterior colur*</label>
  <div> 
  <select  className="inputOnboard">
  <option>Beige</option>
  <option>Yellow</option>
  <option>Black</option>
  <option>Orange</option>
  <option>Blue</option>
  <option>Purple</option>
  <option> Brown</option>
  <option>Red</option>
  <option>Green</option>
  <option>Silver</option>
  <option>Red</option>
  <option>White</option>
  
  </select>
 
  
  </div>
</div>
<div  className='inputWrap'>

<label  className="inputLabel" >Exterior brand color</label>
<input  className="inputOnboard"/>
  <div  className='inputWrap'> 
    <label  className="inputLabel" >Interior colur</label>
  <select  className="inputOnboard">
  <option>Beige</option>
  <option>Yellow</option>
  <option>Black</option>
  <option>Orange</option>
  <option>Blue</option>
  <option>Purple</option>
  <option> Brown</option>
  <option>Red</option>
  <option>Green</option>
  <option>Silver</option>
  <option>Red</option>
  <option>White</option>
  
  </select>
    




  </div>
  <div  className='inputWrap'> 
    <label  className="radioLabel" >Number of seats</label>
    <div  className='radioWrap' >
<input className='radio' type="radio"/><label>N/A</label>
    <input className='radio' type="radio"/><label>1</label>
    <input className='radio' type="radio"/><label>2</label>
    <input className='radio' type="radio"/><label>3</label>
    <input className='radio' type="radio"/><label>4</label>
    <input className='radio' type="radio"/><label>5</label>
  

    <input className='radio' type="radio"/><label>more</label>
    </div>


  </div>
</div> 

<div  className='inputWrap'> 
    <label  className="radioLabel" >Number of doors</label>
    <div className='radioWrap'>


    <input className='radio'  type="radio"/><label>N/A</label>
    <input className='radio'  type="radio"/><label>1</label>
    <input className='radio'  type="radio"/><label>2</label>
    <input className='radio'  type="radio"/><label>3</label>
    <input className='radio'  type="radio"/><label>4</label>
    <input className='radio'  type="radio"/><label>5</label>

    <input className='radio'  type="radio"/><label>more</label>
    </div>

  </div>
<div  className='inputWrap'>

<h2>Technical features</h2>
<label  className="inputLabel" >Fuel type</label>
<select  className="inputOnboard">
    <option>N/A   </option>
    <option>Petrol</option>
    <option>Diesel</option>
    <option>Other </option>
</select>
  
   
</div>
<div  className='inputWrap'>

<label  className="radioLabel" >Drivetrain</label>
    <select  className="inputOnboard">
    <option>N/A   </option>
    <option>2WD</option>
    <option>4WD</option>
 
</select>
   
</div>
<div  className='inputWrap'>

<label  className="radioLabel" >Drive</label>
<select  className="inputOnboard">
    <option>N/A   </option>
    <option>LHD</option>
    <option>RHD</option>
 
</select>

   
</div>
 */}  
<div className="inputWrap" >

<label  className="radioLabel" >Additional Info</label>
    <textarea   id="carDescription"
  name="carDescription" onChange={handleChange} value={data.carDescription}   className='radioarea'/>
  

   
</div>

<h2>Contact information</h2>
   
   <label>Phone*</label><br/>
 <div className="flex-row">
  

    <select  className="inputOnboard1">
        <option>
            United States (+1)
        </option>
    </select>
    <input  className="inputOnboard3"></input><br/>
   
    
 </div>
 <input type="radio"/><label>Stay anonymous</label>


            </div>

            </div>
      )
      return content
    }
    
    export default List