import useFormContext from "../../hooks/useFormContext"

const Shipping = () => {

  
    return  (
<div>
        <h2>Select a package</h2>

<div className="packWraps">
    <div className="package">
    <div className="optionWrap">
    <span className="Price"> $10</span>
    <div>✅ 1 car posts until sold</div>
    <div>✅ 5 car posts until sold</div>
    <div>✅ 5 car posts until sold</div>
    <button  className="select">select</button>
</div>
</div>


<div className="package">
    <div className="optionWrap">

        <div className="popular">most popular</div>
    <span className="Price"> $30</span>
    <div>✅ 5 car posts until sold</div>
    <div>✅ 5 car posts until sold</div>
    <div>✅ 5 car posts until sold</div>
    <div>✅ 5 car posts until sold</div>
    <button className="select">select</button>
</div>
</div>

<div className="package">
    <div className="optionWrap">
     <span className="Price"> $60</span>
    <div>✅ 50 car posts until sold</div>
    <div>✅ 5 car posts until sold</div>
    <div>✅ 5 car posts until sold</div>
    <div>✅ 5 car posts until sold</div>
    <div>✅ 5 car posts until sold</div>
    <div>✅ 5 car posts until sold</div>
    <div>✅ 5 car posts until sold</div>
    <button  className="select">select</button>
</div>
</div></div></div>


    )

}
export default Shipping