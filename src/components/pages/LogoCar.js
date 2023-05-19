    import React from 'react'
    import * as logo from "../.././assets/index"
    import Carousel from "react-multi-carousel";
    import "react-multi-carousel/lib/styles.css";
    const LogoCar = () => {
        
        const CustomRightArrow = ({ onClick, ...rest }) => {
            const {
              onMove,
              carouselState: { currentSlide, deviceType }
            } = rest;
            // onMove means if dragging or swiping in progress.
            return <button className="customRightArrow" onClick={() => onClick()} ><span className='point'>›</span></button>;
          };

          const CustomLeftArrow = ({ onClick, ...rest }) => {
            const {
              onMove,
              carouselState: { currentSlide, deviceType }
            } = rest;
            // onMove means if dragging or swiping in progress.
            return <button className="customLeftArrow" onClick={() => onClick()} >   <span className='point'>‹</span></button>;
          };



        const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 1000 },
              items: 6
            },
            desktop: {
              breakpoint: { max: 3000, min: 504 },
              items: 6
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          };
      return (
        <>


<Carousel  containerClass="carousel-container " customRightArrow={<CustomRightArrow />} customLeftArrow={<CustomLeftArrow />}    itemClass="carousel-item" responsive={responsive}>


<img className="carousel-item"  src={logo.bently}/>



        <img className="carousel-item"  src={logo.labo}/>
        
   

                <img className="carousel-item"  src={logo.ferrari}/>
                
         
                  

                        <img className="carousel-item"  src={logo.bmw}/>
                        
                    
                             

                                <img className="carousel-item"  src={logo.audi}/>
                          
                        

<img className="carousel-item"  src={logo.porsche}/>

<img className="carousel-item"  src={logo.bently}/>



        <img className="carousel-item"  src={logo.labo}/>
        
   

                <img className="carousel-item"  src={logo.ferrari}/>
                
         
                  

                        <img className="carousel-item"  src={logo.bmw}/>
                        
                    
                             

                                <img className="carousel-item"  src={logo.audi}/>
                          
                        

<img className="carousel-item"  src={logo.porsche}/>


</Carousel>;
       
                                        </>
      )
    }
    
    export default LogoCar