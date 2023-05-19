
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom"

const CarsCard2 = ({ make, model, pic , year, price, location, _id, listUser}) => {

const id1 = useParams()
  

const Card = () => {
 
return (
  
    <a href={`/listing/${_id}`}>
     <div className="card2">
 

  <img   className="CardPic8"src={pic[0].url}/>
      <div className="Textbox">
      <h3 className="h3">
   ${price.toLocaleString('en-US')} 
        </h3>  
       <p className="p">
       {make}  {model}
       </p>

       <p className="lp"></p>
       </div>
       </div>
       </a>
)
 






    }

    return (
<div>
<Card/>
        

</div>    


        )
    
};
export default CarsCard2;
