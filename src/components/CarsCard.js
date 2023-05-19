
import { Link } from "react-router-dom";


const CarsCard = ({ pic , price, _id,}) => {



return (
  
    <a href={`/listing/${_id}`}>
     <div className="card">
       
      <img   className="CardPic" src={pic[0].url }/>
      <div className="Textbox">
      <div>Sci pie</div>
      <h3 className="h3">
   ${price.toLocaleString('en-US')}
        </h3>  
       <p className="p">
       <div> 4 Pepporni Thin Crust</div>
       </p>

       <p className="lp"> </p>
       </div>
       </div>
       </a>
)

};



export default CarsCard;
