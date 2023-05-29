import React, { useEffect, useState, useRef } from "react";
import { DateTime } from 'luxon';
import Fed from "./Fed.png"
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import SubNav from "./subNav"
import Navbar from "../Navbar";
import GoogleMapReact from 'google-map-react';
import {GoogleMap , useLoadScript, Marker} from "@react-google-maps/api"
function OrdersPage() {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [url, setUrl] = useState();
    const [hide, setHide] = useState(false);
    const [orderId, setOrderID] = useState();
    const [loading, setLoading] = useState(false);
    const [labelloading, setLabelLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [dateSubmit, setDateSubmit] = useState()
    const [timeSubmit, setTimeSubmit] = useState()
    const products = useSelector((state) => state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);
    const [orderAddress, setOrderAddress] = useState([""])
   const [open, setOpen] = useState(false)
   const [pickupCode, setpickupCode] = useState()
   const [pickupDay, setPickupDay] = useState("")
   const [match, setMatch] = useState(null)
    const handleClose = () => setShow(false);
    const [time, setTime] = useState('')
    const [times, setTimes] = useState("")
  const carsPerPage = 8;
  const lastIndex = page * carsPerPage;
  const firstIndex = lastIndex - carsPerPage;
  const pageCount = Math.ceil(orders.length / carsPerPage);
  const [optionsPick, setOptionsPick] = useState()
  const numbers = [...Array(pageCount + 1).keys()].slice(1);
  const productState = useSelector((state) => state.products);
  const nextPage = () => {
    if (page !== pageCount) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

const handlePickupDate = (date, index) => {
setPickupDay(date)
setMatch(index)

}
  console.log(time)

  const handleFulfill = () => {
    axios.put('http://localhost:3500/orders/set-fulfill/', { orderId })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    console.log(orderId);
  };
  



  const handleLabel = (addressObj, index) => {
      setOrderAddress(addressObj)

      console.log("pp",addressObj)
      console.log("peepee",addressObj[0].street)
      setLabelLoading(true)
    if (orderAddress.length > 0) 
    {

     
      const shipmentData = {
        labelResponseOptions: "URL_ONLY",
        requestedShipment: {
          shipper: {
            contact: {
              personName: user?.sellerName,
              phoneNumber: 3317774958,
              companyName: user?.sellerName
            },
            address: {
              streetLines: [
                user?.address[0].street
              ],
              city: user?.address[0].city,
              stateOrProvinceCode: "AR",
              postalCode: 72601,
              countryCode: "US"
            }
          },
          recipients: [
            {
              contact: {
                personName: "RECIPIENT NAME",
                phoneNumber: 1234567890,
                companyName: "Recipient Company Name"
              },
              address: {
                streetLines: [
                  addressObj[0].street,
                
                ],
                city: addressObj[0].city,
                stateOrProvinceCode: "IL",
                postalCode: 60516,
                countryCode: "US"
              }
            }
          ],
          shipDatestamp: "2020-07-03",
          serviceType: "STANDARD_OVERNIGHT",
          packagingType: "FEDEX_PAK",
          pickupType: "USE_SCHEDULED_PICKUP",
          blockInsightVisibility: false,
          shippingChargesPayment: {
            paymentType: "SENDER"
          },
          labelSpecification: {
            imageType: "PDF",
            labelStockType: "PAPER_85X11_TOP_HALF_LABEL"
          },
          requestedPackageLineItems: [
            {
              weight: {
                value: 10,
                units: "LB"
              }
            }
          ]
        },
        accountNumber: {
          value: "740561073"
        }
      };
  console.log(shipmentData)
  axios
  .post("http://localhost:3500/orders/print-label", shipmentData)
  .then((response) => {
    const url =
      response.data.output.transactionShipments[0].pieceResponses[0]
        .packageDocuments[0].url;
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index].hide = true;
       updatedOrders[index].labelLoading = false;
      return updatedOrders;
    });
    setLabelLoading(false)
    setUrl(() => url);
    console.log(url);
  })
  .catch((error) => {
    console.error(error);
  });
}
};



const orderProductIds = orders.map((order, index) => {
  const productId = Object.keys(order.products)[2];
  return `${productId}`;
});


const idMatch = productState.filter((product) => {
  const productId = product._id.toString();
  return orderProductIds.includes(productId);
});

const productMatch = idMatch.filter((match) => {
  const matchId = match.listUser.toString();
  const userId = user?._id.toString();
  return matchId === userId;
});

console.log("ii",productMatch)

console.log("match",idMatch);

console.log("hh", orderProductIds)

function showOrder(productsObj, orderId) {
  let productsToShow = products.filter((product) => {
    const cartProductId = `${product._id}`; // Combine product ID and seller ID
    return productsObj[cartProductId];
  });

  productsToShow = productsToShow.map((product) => {
    const cartProductId = `${product._id}`; // Combine product ID and seller ID
    const productCopy = { ...product };
    productCopy.count = productsObj[cartProductId].count;
    delete productCopy.description;
    return productCopy;
  });

  console.log("go", productsToShow);
  setOrderID(orderId);
  setShow(true);
  setOrderToShow(productsToShow);
}



  const changeCPage = (id) => {
    setPage(id);
  };
    useEffect(() => {
        setLoading(true);
        axios
            .get(`/orders`)
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);



   const getTime = (one, two) => {
    console.log(one)
    console.log(two)




   }

   const handleSetSubmit = (setter, date) => {
    setTime(setter);
const timeString = setter;
const timeObject = DateTime.fromFormat(timeString, 'hh:mm a');
const originalTime = timeObject.toFormat('HH:mm:ss');
    setDateSubmit(date);
    setTimeSubmit(originalTime);
    console.log("i", setter, date, originalTime);
  };
  
console.log("uuu", time, dateSubmit, timeSubmit)
    const handleSubmitPickup = () => {
      const submitData = {
        
          associatedAccountNumber: {
            value: "740561073"
          },
          originDetail: {
            pickupLocation: {
              contact: {
                personName: "Contact Name for Pickup",
                phoneNumber: "1234567890"
              },
              address: {
                streetLines: [
                  "7441 blackburn ave"
                ],
                city: "Downers Grove",
                stateOrProvinceCode: "IL",
                postalCode: "60516",
                countryCode: "US"
              }
            },
            readyDateTimestamp :`2023-05-22T11:06:00Z`,
            customerCloseTime: "17:00:00"
          },
          carrierCode: "FDXE"
        
     }
     axios
     .post("http://localhost:3500/orders/schedule-pickup", submitData)
     .then((response) => {
       
      setpickupCode(response.data.output.pickupConfirmationCode)
     console.log(response)
     
     })
    
        setOpen(false);
     
    } 

   
    const filteredOrders = orders.filter((order) => {
      const productKeys = Object.keys(order.products);
    
      for (let j = 0; j < productKeys.length; j++) {
        const productKey = productKeys[j];
        const product = order.products[productKey];
    
        if (product.sellerId && product.sellerId === user?._id) {
          return true;
        }
      }
    
      return false;
});
    console.log("jj",filteredOrders)

    const totalOrderAmount = filteredOrders.reduce((total, order) => total + order.total, 0);

        const handlePickup = () => {
   const checkData = {
      pickupAddress: {
        postalCode: "60516",
        countryCode: "US"
      },
      pickupRequestType: [
        "SAME_DAY"
      ],
      carriers: [
        "FDXE"
      ],
      countryRelationship: "DOMESTIC"
    
   }
   axios
   .post("http://localhost:3500/orders/check-times", checkData)
   .then((response) => {
     
   setTimes(response.data.output.options)
   console.log(response)
   
   })
   .catch((error) => {
     console.error(error);
   });
      setOpen(true);
   
    };
    useLoadScript({googleMapsApiKey: 'AIzaSyDafqAOtxds8RDU33u_luv9E8KjuQSZ35M' })
    useEffect(() => {
      console.log("poo", times);
    
    }, [times]);

    const HandleDisplay = () => {

      const userOrderIds = productMatch.map((product) => product._id);

      const relevantOrders = orders.filter((order) =>
        userOrderIds.includes(order._id)
      );
       
        return (
          <>
            <>
              {page === "poop" ? setPage(1) : <></>}
              {filteredOrders.length === 0 && loading === true ?  (<>
              loading....
                </>
              ) : (
                ""
              )}
               {filteredOrders.length === 0 ?  (<>
                
                <h1 className="pusher"> No Listings Matching Search</h1>
                </>
              ) : (
                ""
              )}


              
              {filteredOrders.slice(firstIndex, lastIndex).map((order, index) => {
             // Assuming 'orders' is an array of objects


              return (
             
              <tr>
                 <td>{order._id}</td>
                 <td>
                  
                 <a  onClick={() => showOrder(order.products, order._id)} >
                     <div className={`${order.status == "fulfilled" ? "warning" : "success"}`} text="white">
                         {order.status}
                     </div>
                     </a>
                 </td>
                 <td>{order.date}</td>

                 <td>${order.total}</td>
          
                 <td> {!order.hide &&   <div onClick={() => handleLabel(order.address, index)} className="print"> {labelloading === true ? <>Loading... </> : <>Print Label </>  }</div>} {order.hide &&<a href={`${url}`}>   <div onClick={() => handleLabel(order.address,  index)} className="print-g">View Label </div></a> }</td>
             {/* <td onClick={handlePickup}  >Schedule Pickup</td> */}    
                 <td>See Order</td>
             </tr>)
              })}{" "}
              {filteredOrders.length - firstIndex === 2 ? (
                <span className="insert">insert</span>
              ) : (
                <></>
              )}
            </>
    
            <div className="num__container">
              {filteredOrders.length > 8 ? <Pagination /> : <></>}
            </div>
  
           

<div>

      </div>
          </>
        );
      };
    

    if (filteredOrders.length === 0) {


        return (
          <>
          <>
          
          <Navbar />
  
        <SubNav/>
            </>
        
            <div className="center-div">
              <br/>
              <br/>
            <h1 className="text-center pt-3">No orders yet</h1> 
            </div> </>)}

    const Pagination = () => {
        return (
          <ul className="pagination">
            <li className={` btn ${page === 1 ? " paginationDisabled" : ""}`}>
              <a href="#" className="page-link" onClick={prevPage}>
                Prev
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={` paginationBttns ${
                  page === n ? "paginationActive" : ""
                }`}
                key={i}
              >
                <a href="#" className="page-item" onClick={() => changeCPage(n)}>
                  {n}
                </a>
              </li>
            ))}
    
            <li className="btn">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        );
      };

    

    return (

      <>
  <Navbar />
  <SubNav/>
  <div className="dashboard">
    
  

      </div>


        <div className="center-div">
     
       
        
            <div className="center-div">
            <div className="start-move">
            
            <ul className="table-select">
           <li className="tab">All</li> 
           <li className="tab">Unfulfilled</li> 
           <li className="tab">Processing</li> 
           <li className="tab">Fulfilled</li> 
            </ul>



          </div>
            <table className="m-5">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <HandleDisplay />



          
        </tbody>
      </table>


  <div className="flex-row-end">Revenue To Date: ${totalOrderAmount}</div>
 

{pickupCode?.length > 0 ?
<>
your code: {pickupCode}

</> : <></>

}
                  {open &&
                  <div className="Overlay3">
                    <div id="Mo-7" className="Modal9">
                <div closeButton>
                    <div> <h4>Schedule Pickup</h4></div>
                </div>

                <div className="div-start">
                {times ? (
  times.map((option, index) => {
    const dateObject = DateTime.fromISO(option.pickupDate);
    const month = dateObject.toFormat('LLL');
    const day = dateObject.toFormat('dd');
    const dayOfWeek = dateObject.toFormat('EEE');

    console.log(`${month}-${day}`);
    console.log("pee", dateObject);

    return (
      <>
        {pickupDay === "" ? (
          <div
            onClick={() =>
              handlePickupDate(`${dayOfWeek.slice(0, 5)}, ${month}, ${day}`, index,)
            }
            className="date-choice"
          >
            {`${dayOfWeek.slice(0, 5)}, ${month} ${day}`}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  })
) : (
  <div>Loading pickup times...</div>
)}

  </div>
  {times !== "" && (
<div className="row-flex">
    
  <div className="date-choice">
    
    {pickupDay}
    {times?.map((option) => {

    
    

    
    
    
    return (



      <div key={option.pickupDate}>

        <select onChange={(e) => {handleSetSubmit(e.target.value, option.pickupDate)}} hidden={option.pickupDate.slice(8) !== pickupDay.slice(10)}>
        <option>- time -</option>
          {option.readyTimeOptions.map((time, index) => {
            const formattedTime = DateTime.fromISO(time).toFormat('hh:mm a');
          
            return (
              <>
          
            <option id={time} key={index}>{formattedTime} </option>;
            </>
            )
          })}
        </select>
      </div>
)})}
  </div>

  <div className="confirm-pick">
    {  time !== '' &&
    <>

    <div className='box-time'>
    <div>Time</div>  
  
<h3>{pickupDay}, {time}</h3>

 </div>
 <div className="box-time">
  
 <div>Location</div>  
  {user.address[0]?.street}, {user.address[0]?.street2} <br/>
 {user.address[0]?.city}  {user.address[0]?.state}  {user.address[0]?.country}
 
 </div>
 </>
}
  </div></div>
)}

                <div className="flex-col-a">
        
                    <button className="fed" onClick={handleSubmitPickup}>
                      Submit
                    </button><img className="fed-logo" src={Fed} />
                </div>
                </div>
            </div>
}   
                  {show &&
                  <div className="Overlay3">
                    <div className="Modal9">
                <div closeButton>
                    <div> <h4>Order details</h4></div>
                </div>
                {orderToShow.map((order) => (
                    <div className="flex-cont">
                        <img src={order.pic[0].url} style={{ minWidth:125, maxWidth: 125, minHeight: 125, maxHeight: 125 ,objectFit: "cover" }} />
                        
                        <div className="flex-col-b">
                        <p>
                        <span>Quantity: {order.count}  </span> {order.name}
                        </p>
                        <p>Price: ${Number(order.price) * order.count}</p>
                    </div>
                    
                    </div>
                ))}
                <div className="flex-col-a">
                <button className="green" onClick={handleFulfill}>
                        Fulfill Order
                    </button>
                    <button className="not-green" onClick={handleClose}>
                        Close
                    </button>
                </div> 
                </div>
            </div>
}     
         
            </div>
        </div>
        </>
    );
}

export default OrdersPage;