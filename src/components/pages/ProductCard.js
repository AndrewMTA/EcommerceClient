import {CartContext} from '../../context/CartContext'
import { useContext } from 'react'

function ProductCard(props) {
   
    const product = props.product;
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(product.id);
    //console.log(cart.items);

return (
    <div className="package">
    <div className="optionWrap">

    <div>{product.title}</div>
    <span className="Price"> ${product.price}</span>
  
    <div>✅ {product.id} car posts until sold</div>

    { productQuantity > 0 ?
    <>
  <button onClick={() => cart.deleteFromCart(product.id)}  className="select">Remove </button>

    </>
: 
<button onClick={() => cart.addOneToCart(product.id)}  className="select">select</button>
    }
    </div>
</div>
)
}

export default ProductCard