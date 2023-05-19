
import Navbar from "../../components/Navbar"
import Homes from "./pexels.jpg"
import { logout } from "../../features/userSlice";
import LogoCar from "./LogoCar";
import Check from "./Check.png"
import Tab from "./Tab.png"
import axios from "axios"
import Carousel from "react-elastic-carousel";
import globe from "./globe.png"
import Item from "./Item";
import Carb from "./Carb.jpg"
import Detroit from "./Detroit.webp"
import Ny from "./Ny.jpg"
import Deep from "./Deep.jpg"
import Neo from "./Neo.webp"
import Stuffed from "./Stuffed.jpg"
import Cal from "./Cal.jpg"
import Pair from "./Pair.jpg"
import Marg from "./Marg.jpg"
import logo from "../logo.png"
import "./styles.css";
import {useState, useEffect} from "react"



import {
logos
  } from "../../catagories";

import lambo from "../.././assets/lammbo1.png"

function Hero() {

    const style = "./styles"


    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 },
      ];
      
    const [email, setEmail] = useState("")

    const preventDef = (e)=> {
e.preventDefault()
    }



 

    return (
        <>
<div className="NoY">

     
       <Navbar/>

        <div className="center__title">         <img className="bannerImg" src={Homes}/> <h2 className="Image-text">The Best Pizza Shipped Straight To You</h2></div>
        
        <div className="btn__wrapper">
        <a href="/emaillist"><div className="By">Get Pizza →</div> </a>
        
        <a href="/application">
        <div className="Sell" >Sell Pizza →</div>

        

        </a>
</div>

<div className= "brand__wrap">
    
<Carousel breakPoints={breakPoints}>
          <Item><img className="zza" src={Deep}/></Item>
          <Item><img className="zza" src={Neo}/></Item>
          <Item><img className="zza" src={Cal}/></Item>
          <Item><img className="zza" src={Ny}/></Item>
          <Item><img className="zza" src={Detroit}/></Item>
          <Item><img className="zza" src={Carb}/></Item>
          <Item><img className="zza" src={Stuffed}/></Item>
          <Item><img className="zza" src={Pair}/></Item>
          <Item><img className="zza" src={Marg}/></Item>
        </Carousel>

</div>
<div className= "brand__wrap">
    

<div className="boxOne">
<div className="contentb">
<h3 className="bannerb">Get Started</h3>
<br/>
<h1>High quality pizza shipped to you.</h1>
<br/>
<h2> <i>Explore</i> </h2>

        </div>

        <div className="contentb3">
<h3 className="bann1">Get Started</h3>

<h2  className="bann2">High quality pizza shipped to you.</h2>

<h3  className="bann3"> <i>Explore</i></h3>

        </div>

<img className="globe2" src={Tab}/>
  
        </div>
        <div className="contentb2">
<h3 className="bannerb">Get Started</h3>
<br/>
<h1>Expand your reach and sell online</h1>
<br/>
<h2> <i>Find Pizza lovers nationally</i> </h2>

        </div>
 
<div className="boxTwo">
<div className="contentb4">
<h3  className="bann1">Get Started</h3>

<h2  className="bann2">Expand your reach and sell online </h2>

<h3  className="bann3"><i>Find Pizza lovers nationally</i> </h3>

        </div>
<img className="globe" src={globe}/>

        </div>
   


</div>
<div className="footer">


<a className='navA'  href="/cars"><img src={logo} className="log"/> </a>

<div className="footer-wrap1">
<ul>
<h4>Ship Slices</h4>
<li>About Us</li>
<li>F.A.Q</li>

</ul>



   




<ul>
<h4>Contact Us</h4>
<li>Support</li>
<li>Contact</li>
</ul>
</div>




</div>

{/** 
<div className="newsletter">
<div className="letterWrapper">     
<form onSubmit={preventDef}>
<h3>Subscribe for latest listings</h3> <div className="row-wrap"> </div> <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address"className="newsInput"/>

<button onClick={handleSubmit} type="submit" className="submit_btn">Submit</button>
</form>
</div>
</div>

*/}
</div>
        </>
    )
}

export default Hero;