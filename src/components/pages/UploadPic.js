import React from "react";
import Img from "../../assets/Img.png";
import ReactPlayer from "react-player";
import { useState, useEffect, useRef } from "react";
const UploadPic = () => {
    const [youtubeURL, setYoutubeURL] = useState("")
    const [picPreview, setPicPreview] = useState(null);
    const [pic, setPic] = useState(null);
    const [pic2, setPic2] = useState(null);
   
    const [showings, setShowings] = useState(true);
    const [showings2, setShowings2] = useState(true);
    const [youtubeVideo, setYoutubeVideo] = useState("")
    const handleYoutube=(e)=> {
        setYoutubeVideo(e.target.value);
      }

      const picPreview2 = () => {
        setShowings(false);
      }

      function handlePicUpload(e) {
        const file = e.target.files[0];
        if (file.size == 1897868) {
          return alert("Max");
        } else {
          setPic(file);
          setPicPreview(URL.createObjectURL(file));
          setShowings(false);
        }
      }
      
      const handleYoutubeSubmit=(e)=> {
        e.preventDefault();
        setYoutubeURL(youtubeVideo)
      }

      function handlePicUpload2(e) {
        const file = e.target.files[1];
        if (file.size == 1897868) {
          return alert("Max");
        } else {
          setPic(file);
          setPicPreview(URL.createObjectURL(file));
          setShowings(false);
        }
      }
      
     
  return (
    <div className="flex11">
      <div className="f">
        <h3 className="innerNav">1. Basics</h3>
        <h3 className="innerNav">2. Upload Media</h3>
        <h3 className="innerNav">3. Review </h3>
        <h3 className="innerNav1">4. Publish</h3>
      </div>

      <form className="form2">
        <h2>Upload a cover photo*</h2>

        <div className="picwrap">
        {showings && (
          <label htmlFor="pic-upload" className="picBoxUpload">
            <i htmlFor="pic-upload"></i>
            <div className="innerWrapper">
              <img className="iconImg" src={Img} />
              <p className="ptaged">
                <i>Upload a picture</i>
              </p>
            </div>
          </label>
                     )}{" "}
{/** *
{!showings && (
        <img className="campaign-pic" src={picPreview} />        )}{" "}
        </div>
        <input hidden type="file"   onChange={handlePicUpload} id="pic-upload" className="form-control" />
       
  
        <label>Add Additonal Media</label>
        <div className="row">
          <label htmlFor="pic-upload" className="picBoxUpload">
            <i htmlFor="pic-upload"></i>
            <div className="innerWrapper3">
              <span className="iconImg3">+</span>
            </div>
          </label>



          <input hidden type="file" onChange={handlePicUpload2} id="pic-upload" className="form-control" />
          {showings2 && (          <label htmlFor="pic-upload" className="picBoxUpload">
            <i htmlFor="pic-upload"></i>
            <div className="innerWrapper2">
                
              <span className="iconImg2"></span>
            </div>
          </label>    )}{" "}
          {!showings2 && (
        <img className="campaign-pic" src={picPreview2} />        )}{" "}

          <input hidden type="file" id="pic-upload" className="form-control" />
          <label htmlFor="pic-upload" className="picBoxUpload">
            <i htmlFor="pic-upload"></i>
            <div className="innerWrapper2">
              <span className="iconImg2"></span>
            </div>
          </label>{!showings2 && (
        <img className="campaign-pic" src={picPreview2} />        )}{" "}
          <input hidden type="file" id="pic-upload" className="form-control" />
          <label htmlFor="pic-upload" className="picBoxUpload">
            <i htmlFor="pic-upload"></i>
            <div className="innerWrapper2">
              <span className="iconImg2"></span>
            </div>
          </label>
          {!showings2 && (
        <img className="campaign-pic" src={picPreview2} />        )}{" "}
          <input hidden type="file" id="pic-upload" className="form-control" />
          <label htmlFor="pic-upload" className="picBoxUpload">
            <i htmlFor="pic-upload"></i>
            <div className="innerWrapper2">
              <span className="iconImg2"></span>
            </div>
          </label>
          {!showings2 && (
        <img className="campaign-pic" src={picPreview2} />        )}{" "}
          <input hidden type="file" id="pic-upload" className="form-control" />
        </div>
        <div className='outerWrap'>
                  <h2 className='editorh2'>Video URL <span className="required"> *</span></h2>
                  <p className='editorp'> Enter a YouTube URL to appear at the top of your campaign page. Make sure your video has closed captioning enabled on Youtube or Vimeo</p>
                 
                 <div>
                  <div className="flexed">
                  <input
               className="inputOnboard"
                    onChange={handleYoutube}
                  />
<button className="inputOnboard" onClick={handleYoutubeSubmit} >Add</button></div>
</div>
                </div>
          <ReactPlayer url={youtubeURL} controls/> */}
</div>
        <button type="submit" className="buttonz">  
          Next
        </button>
      </form>
    </div>
  );
};

export default UploadPic;
