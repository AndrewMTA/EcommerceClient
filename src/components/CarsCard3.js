
const CarsCard = ({ make, model, pic , price,  _id, country, sponsered}) => {



return (
  
    <a href={`/listing/${_id}`}>
     <div className="card">
{sponsered   &&

 <div className="sponsored">Sponsored</div>

}
       
      <img   className="CardPic"src={pic[0].url }/>
      <div className="Textbox">
      <h3 className="h3">
   ${price.toLocaleString('en-US')}
        </h3>  
       <p className="p">
      {make}  {model}
       </p>

       <p className="lp">{country || "Belgium"}</p>
       </div>
       </div>
       </a>
)

};



export default CarsCard;
