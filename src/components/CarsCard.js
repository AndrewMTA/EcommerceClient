
import { Link } from "react-router-dom";


const CarsCard = ({ pic , price, _id, title, seller, quantity, category}) => {



return (
  
    <a href={`/listing/${_id}`}>
     <div className="card">
       
      <img   className="CardPic" src={pic[0].url }/>
      <div className="Textbox">
      <div>{seller}</div>
      <h3 className="h3">
   ${price.toLocaleString('en-US')}
        </h3>  
       <p className="p">
      {quantity} {title} {category}{quantity > 1 && <>s</>}
       </p>

       <p className="lp"> </p>
       </div>
       </div>
       </a>
)

};



export default CarsCard;
