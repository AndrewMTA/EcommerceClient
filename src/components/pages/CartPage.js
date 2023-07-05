import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import axios from "../../api/axios"
import { useSelector } from "react-redux";
import CheckoutForm from "./Checkouts";
import {
  useAddToCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation,
} from "../../services/appApi";
import Navbar from "../Navbar";

// ...


const stripePromise = loadStripe("pk_live_51LGwewJ0oWXoHVY4hzmdZ1i4COqqKZ8PVlcoPHwL4lg6oAgqjEzR5EdVZXBrwjnToi3VfU9lT2vReJyVcRVuskDI00DovYoz0Y");

function CartPage() {

  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user?.cart; 

  let cart = userCartObj ? products.filter((product) => userCartObj[product._id] != null) : [];

  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  function handleDecrease(product) {
    const quantity = user?.cart.count;
    if (quantity <= 0) return alert("Can't proceed");
    decreaseCart(product);
  }
//console.log(user.cart)
  return (
    <>
      <Navbar />
      <br />
      <div className="gap">
        <div>
          <div>
            <h2 className="pt-2 h3">Cart</h2>
            <br />
          </div>

          {user?.cart?.total > 0 && !show && (
            <div md={5}>
              <>
                <h3 className="h4 pt-4">Sub total: ${user?.cart?.total}</h3>
                <div responsive="sm" className="cart-div">
                  <thead></thead>
                  <tbody>
                    {cart?.map((item) => {
                      //console.log(item)
                     return (
                      <tr key={item._id}>
                        <div className="sha_boing">
                          <div className="imgWrap">
                            {!isLoading && (
                              <i
                                className="fa fa-times"
                                style={{ marginRight: 0, cursor: "pointer" }}
                                onClick={() =>
                                  removeFromCart({
                                    productId: item._id,
                                    price: item.total,
                                    userId: user?._id,
                                    beforeShipping: item.price
                                  })
                                }
                              ></i>
                            )}
               <img
                              src={item.pic[0].url}
                              style={{ width: 160, height: 160, objectFit: "cover" }}
                            />
                            <div className="infoWrap">
                              <h5>{item.seller}</h5>
                              <div>
                                {item.quantity} {item.title} {item.category}
                                {item.quantity > 1 && <>s</>}
                              </div>
                              <div>${item.total}</div>
                            </div>
                          </div>
                          <span className="quantity-indicator">
                            <i
                              className="circle-m"
                              onClick={() =>
                                handleDecrease({
                                  beforeShipping: item.price,
                                  productId: item._id,
                                  price: item.total,
                                  userId: user._id,
                                })
                              }
                            >
                              -
                            </i>
                            <span>{user?.cart[item._id]?.count}</span>
                            <i
                              className="circle"
                              onClick={() =>
                                increaseCart({
                                  productId: item._id,
                                  price: item.total,
                                  userId: user._id,
                                  beforeShipping: item.price


                                })
                              }
                            >
                              +
                            </i>
                          </span>
                        </div>

                        <div className="fixer"></div>
                      </tr>
                    )}
                    )}
                  </tbody>
                </div>
                <div>
                  <br />
                  <div className="checkoutWrap">
                    <div onClick={handleShow} className="checkout_btn">
                      Continue to Checkout
                    </div>
                  </div>
                </div>
              </>
            </div>
          )}

          {user?.cart?.total === 0 ? (
            <>
              <br />
              <div variant="info">Shopping cart is empty. Add products to your cart</div>
            </>
          ) : (
            <div className="cart-payment-container">
              {show && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
