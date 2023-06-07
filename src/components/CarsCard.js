
import { Link } from "react-router-dom";


const CarsCard = ({ pic , price, _id, title, seller, quant, category}) => {



return (
  
    <a href={`/listing/${_id}`}>
     <div className="card">
       
      <img   className="CardPic" src={pic[0]?.url }/>
      {quant > 1 && 
      <div className="number-display">
        <div> {quant}</div>
        <span className="title-display">{title}s</span>
      </div>
      }
      <div className="Textbox">
      <div>{seller}</div>
      <h3 className="h3">
   ${price.toLocaleString('en-US')}
        </h3>  
       <p className="p">
       {quant}  {category} {title}{quant > 1 && <>s</>}
       </p>

       <p className="lp"> </p>
       </div>
       </div>
       </a>
)

};



export default CarsCard;
