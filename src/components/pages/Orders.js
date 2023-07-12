import React, { useEffect, useState, useRef } from "react";
import { DateTime } from 'luxon';
import Fed from "./Fed.png"
import { useSelector } from "react-redux";
import { useHighlightMutation } from "../../services/appApi";
import { useAddPickupMutation } from "../../services/appApi";
import { useCancelPickupMutation } from "../../services/appApi";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { deletePickup } from "../../features/userSlice";
import SubNav from "./subNav"
import Navbar from "../Navbar";
import GoogleMapReact from 'google-map-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAddFedexMutation } from "../../services/appApi";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
function OrdersPage() {
  const [addFedex, { isSuccess }] =  useAddFedexMutation();
  const [dryIceWeight, setDryIceWeight ] = useState(0)
  const pickupType = {
   dropoff: "DROPOFF_AT_FEDEX_LOCATION",
    pickup: "USE_SCHEDULED_PICKUP"
  }

  const axiosPrivate = useAxiosPrivate();
  const fed_packages = {

	packageType: "FEDEX_SMALL_BOX"	,      
	packageType: "FEDEX_MEDIUM_BOX",	    
	packageType: "FEDEX_LARGE_BOX"	 ,     
  packageType: "FEDEX_EXTRA_LARGE_BOX",
  packageType: "FEDEX_10KG_BOX"	      
  }
  
  const [errorMsg, setErrorMsg] = useState();
  const [labelInfo, setLabelInfo] = useState()
  const [isCheckd, setIsCheckd] = useState(true);
  const [labelSelect, setLabelSelect] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [another, setAnother] = useState(false);
  const [labelIndex, setLabelIndex] = useState("");
  const [getAccount, setGetAccount] = useState(false)
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [cardOnFile, setCardOnFile] = useState(false);
  const [url, setUrl] = useState();
  const [hide, setHide] = useState(false);
  const [orderId, setOrderID] = useState();
  const [loading, setLoading] = useState(false);
  const [labelloading, setLabelLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [weight, setWeight] = useState(5);
  const [dateSubmit, setDateSubmit] = useState()
  const [timeSubmit, setTimeSubmit] = useState()
  const products = useSelector((state) => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);
  const [orderAddress, setOrderAddress] = useState([""])
  const [open, setOpen] = useState(false)
  const [ownerId, setOwnerId] = useState("")
  const [pickupCode, setpickupCode] = useState()
  const [pickupDay, setPickupDay] = useState("")
  const [fedex, setFedEx] = useState("")
  const [highlighted, setHighlighted] = useState(false)
  const [match, setMatch] = useState(null)
  const handleClose = () => setShow(false);
  const [time, setTime] = useState('')
  const [cancel, setCancel] = useState(false)
  const [cancelPorps, setCancelProps] = useState('')
  const [times, setTimes] = useState("")
  const [cancelState, setCancelState] = useState(null);
  const carsPerPage = 8;
  const lastIndex = page * carsPerPage;
  const firstIndex = lastIndex - carsPerPage;
  const pageCount = Math.ceil(orders.length / carsPerPage);
  const [optionsPick, setOptionsPicck] = useState()
  const numbers = [...Array(pageCount + 1).keys()].slice(1);
  const productState = useSelector((state) => state.products);
  const [getAnother, setGetAnother] = useState(false)
  const [highlight, { isHighlighted }] = useHighlightMutation();
  const [addPickup, { isaddPickuped }] = useAddPickupMutation();
  const [successMessage, setSuccessMessage] = useState(false);
  const [failMessage, setFailMessage] = useState(false);
  const [formState, setFormState] = useState({
    setter: '',
    date: '',
    originalTime: ''
  });
  const [selectedPackage, setSelectedPackage] = useState('');
  
  // ...

  const [cancelPickups, { isCancled}] = useCancelPickupMutation();
const dispatch = useDispatch();
const handleChange = (event) => {
  setSelectedPickupType(event.target.value);
};
const confirmCancel = async () => {
  const checkData = {
    "associatedAccountNumber": {
      "value": "740561073"
    },
    "pickupConfirmationCode": cancelState.props?.code || cancelState.props.pickups[cancelState.index]?.code,
    "carrierCode": "FDXE",
    "scheduledDate": cancelState.props?.time || cancelState.props.pickups[cancelState.index]?.time,
    "location": cancelState.props?.location || cancelState.props.pickups[cancelState.index]?.location,
  };
  
  try {
    const response = await cancelPickups({ id: user._id, checkData, pickupId: cancelState.props?._id || cancelState.props.pickups[cancelState.index]?._id });
    
   
      if (response.data) {
       setCancelState(false)
       setSuccessMessage(true);

       setTimeout(() => {
         setSuccessMessage(false);
       }, 3000);
      } else {
        setTimeout(() => {
          setFailMessage(false);
        }, 3000);
        alert("big issue");
      }
 
  } catch (error) {
    console.error("Cancel DELETED pickup failed:", error);
  }
};


console.log(cancelState)

  const [showComingSoon, setShowComingSoon] = useState(false);
  
  const handleMouseEnter = () => {
    setShowComingSoon(true);
  };

  const handleMouseLeave = () => {
    setShowComingSoon(false);
  };





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
  const [selectedPickupType, setSelectedPickupType] = useState('');

  const handlePickupDate = (date, index) => {
    setPickupDay(date)
    setMatch(index)
  }

  //console.log("checked", isChecked)
  const handleFulfill = () => {
    axiosPrivate.put(`/orders/set-fulfill/`, { orderId, userId:user._id })
      .then(response => {
        //console.log(response.data);
        window.location.reload(); // Refresh the page
      })
      .catch(error => {
        console.error(error);
      });
    //console.log(orderId);
  };


  const handleCancel = (index, props) => {
    setCancelState({ index, props,  });
  };

  
//console.log("Cancel", cancelState)
//console.log("ii", user)
  const handleFulfillMany = () => {
    const highlightedOrders = orders.filter((order) => order.highlighted);

    if (highlightedOrders.length === 0) {
      //console.log("No highlighted orders to fulfill.");
      return;
    }

    const orderIds = highlightedOrders.map((order) => order._id);
    //console.log(orderIds)
    axiosPrivate
      .put(`/orders/set-fulfill-many`, { orderIds,  userId:user._id })
      .then(response => {
        //console.log(response.data);
        // Perform any necessary actions after fulfillment
        window.location.reload(); // Refresh the page
      })
      .catch(error => {
        console.error(error);
      });
  };
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
  })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

const handleAddFedex = (e) => {

  e.preventDefault()
  //console.log(fedex, user?._id)
  
addFedex({id: user?._id, fedex})

}

//console.log("FED", user?.fedexAccount)

  const handleLabel = () => {
    setOrderAddress(labelInfo)
console.log("LOGG")
    if (!user.fedexAccount) {
      
      setGetAccount(true)
      
    setOpen(true);
    } else {
    const order = orders[labelIndex];
    //console.log("oe", order)
    setLabelLoading(true)
    if (
      labelInfo
    ) {


      const shipmentData = {

        
          "labelResponseOptions": "URL_ONLY",
          "requestedShipment": {
            "shipper": {
              "contact": {
                "personName": user.sellerName,
                "phoneNumber": user.phone,
                "companyName":  user.sellerName,
              },
              "address": {
                "streetLines": [
                 user.address[0].street,
                
                ],
                "city":  user.address[0].city,
                "stateOrProvinceCode":  user.address[0].state,
                "postalCode":  user.address[0].zip,
                "countryCode": "US"
              }
            },
            "recipients": [
              {
                "contact": {
                  "personName": order.email,
                  "phoneNumber": order.phone,
                  "companyName": "Recipient Company Name"
                },
                "address": {
                  "streetLines": [
                   order.address[0].street,
                   order.address[0].street2 || "", 
                  ],
                  "city":  order.address[0].city,
                  "stateOrProvinceCode":  order.address[0].state,
                  "postalCode":  order.address[0].zip,
                  "countryCode": "US"
                }
              }
            ],
            "shipDatestamp": "2020-07-03",
            "serviceType": "FEDEX_2_DAY",
           
            "packageSpecialServices": {
              "specialServiceTypes": [
           "DRY_ICE"],
              "shipmentDryIceDetail": {
                "totalWeight" : {
                  "units": "LB",
                  "value": dryIceWeight
                } , "packageCount": 1,
              }
            },
            "packagingType": selectedPackage,
            "pickupType": selectedPickupType,
            "blockInsightVisibility": false,
            "shippingChargesPayment": {
              "paymentType": "SENDER"
            },
            "labelSpecification": {
              "imageType": "PDF",
              "labelStockType": "PAPER_85X11_TOP_HALF_LABEL"
            },
            "requestedPackageLineItems": [
              {
                "weight": {
                  "value": weight,
                  "units": "LB"
                }
              }
            ]
          },
          "accountNumber": {
            "value": 	user.fedexAccount
          }
        }

        
      
       
//console.log("Uhuhducd",user)

      //console.log(shipmentData)
      axiosPrivate
        .post("/orders/print-label", shipmentData, { userId:user._id})
        .then((response) => {
          const url =
            response.data.output?.transactionShipments[0].pieceResponses[0]
              .packageDocuments[0].url;
          setOrders((prevOrders) => {
            const updatedOrders = [...prevOrders];
            updatedOrders[labelIndex].hide = true;
            updatedOrders[labelIndex].labelLoading = false;
            return updatedOrders;
          });
          setLabelLoading(false)
          if (url) {
            window.open(url, "_blank");
            setLabelSelect(false)
          }
          //console.log(url);
        })
        .catch((error) => {
          console.error(error);
        });
    }}
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
    const userId = user?._id?.toString();
    return matchId === userId;
  });

  //console.log("ii", productMatch)

  //console.log("match", idMatch);

  //console.log("hh", orderProductIds)

  function showOrder(productsObj, orderId, owner) {
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
    //console.log("Own", owner);
    //console.log("go", productsToShow);
    setOwnerId(owner)
    setOrderID(orderId);
    setShow(true);
    setOrderToShow(productsToShow);
  }

  console.log("ssss", selectedPackage,selectedPickupType, user )

  const changeCPage = (id) => {
    setPage(id);
  };

  useEffect(() => {
    setLoading(true);
    axiosPrivate.get(`/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        //console.log(e);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    axiosPrivate
      .get(`/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        //console.log(e);
      });
  }, []);


  const handleChanges = (event) => {
    setSelectedPackage(event.target.value);
  };
 const handleStartLabel = (orderaddresses, index) => {
setLabelSelect(true)
setLabelInfo(orderaddresses)
setLabelIndex(index)
 }
 console.log("LINDXXX", selectedPackage,selectedPickupType)

  const handleSetSubmit = (setter, date) => {
    setTime(setter);
    const timeString = setter;
    const timeObject = DateTime.fromFormat(timeString, 'hh:mm a');
    const originalTime = timeObject.toFormat('HH:mm:ss');
    setDateSubmit(date);
    setTimeSubmit(originalTime);
    
    setFormState({
      setter: setter,
      date: date,
      originalTime: originalTime
    });
 
  };
  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMsg]);
  const handleSubmitPickup = () => {

    
    const submitData = {
      "associatedAccountNumber": {
        "value": user.fedexAccount
      },

      "originDetail": {
        "pickupLocation": {
          "contact": {
            "personName": user.sellerName,
            "phoneNumber":"6303174481"
          },
          "address": {
            "streetLines": [
              user.address[0].street
            ],
            "city": user.address[0].city,
            "stateOrProvinceCode": user.address[0].state,
            "postalCode": user.address[0].zip,
            "countryCode": "US"
          }
        },
        "readyDateTimestamp": `${formState.date}T${formState.originalTime}Z`,
        "customerCloseTime": "20:00:00"
      },
      "carrierCode": "FDXE"
    }

    try{
    axiosPrivate
      .post("/orders/schedule-pickup", {submitData, userId:user._id})
      .then((response) => {

        setpickupCode(response.data.output?.pickupConfirmationCode)

        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const [hours, minutes, seconds] = formState.originalTime.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        date.setSeconds(parseInt(seconds, 10));
        
        const formattedTime = date.toLocaleTimeString([], timeOptions);
        
        const pickupInfo = {
          id: user._id,
          code: response.data.output?.pickupConfirmationCode,
          time: formState.date,
          time2: formattedTime,
          location: response.data.output?.location
        };

        //console.log("33", formattedTime)
        

addPickup(pickupInfo)

  setOpen(false);
  setPickupDay("");
  setAnother(false)

      })}catch(error)  {
        setErrorMsg("There was an issue scheduling your pickup. Try another time.")
        console.error("Error  scheduling pickup:", error);
        // Handle the error as per your application's requirements
      }
      
  }
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };


//console.log(pickupCode)

const handleAnother = () => {
  setAnother(true)
}
  const totalOrderAmount = filteredOrders.reduce((total, order) => total + order.total, 0);

  const handlePickup = () => {

    const checkData = {
      pickupAddress: {
        postalCode: user.address[0].zip,
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
    axiosPrivate
      .post("/orders/check-times", checkData)
      .then((response) => {

        setTimes(response.data.output?.options)


      })
      .catch((error) => {

      });
    setOpen(true);

  }

  useEffect(() => {


  }, [times]);
 
 
  //console.log(times)



  const handleHighlight = (orderId) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => {
        if (order._id === orderId) {
          return { ...order, highlighted: !order.highlighted };
        }
        return order;
      });

      // Calculate the highlighted state based on the updated orders
      const newHighlighted = updatedOrders.some((order) => order.highlighted);
      setHighlighted(newHighlighted);

      return updatedOrders;
    });
  };

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmitCard = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      //console.log('Error:', error);
    } else {
      // Send the token to your backend server for further processing
      saveCard(token.id);
    }
  };

const saveCard = async (tokenId) => {
  // Make a POST request to your backend API endpoint with the token ID
  const response = await fetch('/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tokenId }),
  });

  // Handle the response from the backend
  const data = await response.json();
  if (data.success) {
    //console.log('Card saved successfully!');
  } else {
    //console.log('Error saving card:', data.error);
  }
};


  const HandleDisplay = () => {

    const userOrderIds = productMatch.map((product) => product._id);

    const relevantOrders = orders.filter((order) =>
      userOrderIds.includes(order._id)
    );

    return (
      <>
        <>
          {page === "poop" ? setPage(1) : <></>}
          {filteredOrders.length === 0 && loading === true ? (<>
            loading....
          </>
          ) : (
            ""
          )}
          {filteredOrders.length === 0 ? (<>

            <h1 className="pusher"> No Listings Matching Search</h1>
          </>
          ) : (
            ""
          )}



          {filteredOrders.slice(firstIndex, lastIndex).map((order, index) => {
            // Assuming 'orders' is an array of objects

            //console.log("highlighted", order.highlighted)
            if (order.highlighted) {
              setHighlighted(true);
            } else if (!highlighted) {
              setHighlighted(false);
            }

            return (
              <tr className={order.isChecked ? "highlighted" : ""}>
                <td className={!order.highlighted ? "" : "highlighted"}>
                  <div className="row">{order._id}</div>
                </td>
                <td className={!order.highlighted ? "" : "highlighted"}>
                  <a onClick={() => showOrder(order.products, order._id, order.owner)}>
                    <div className={`${order.status === "fulfilled" ? "warning" : "success"}`} text="white">
                      {order.status}
                    </div>
                  </a>
                </td>
                <td className={!order.highlighted ? "" : "highlighted"}>{order.date}</td>
                <td className={!order.highlighted ? "" : "highlighted"}>${order.total}</td>
                <td className={!order.highlighted ? "" : "highlighted"}>
                  {!order.hide && (
                    <div onClick={() => handleStartLabel(order.address, index)} className="print">
                      {labelloading === true ? <>Loading... </> : <>Print Label </>}
                    </div>
                  )}
                  {order.hide && (
                    <a href={`${url}`}>
                      <div onClick={() => handleLabel(order.address, index)} className="print-g">
                        View Label
                      </div>
                    </a>
                  )}
                </td>
                
                <td onClick={() => handleHighlight(order._id)} className={!order.highlighted ? "" : "highlighted"}>
                  <input type="checkbox" checked={order.highlighted} />
                </td>
                {/* Display customer's name */}

              </tr>
            )
          })}
          {" "}
          {filteredOrders.length - firstIndex === 2 ? (
            <span className="insert">insert</span>
          ) : (
            <></>
          )}
        </>





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
        
          <div className="dashboard">
        <a href={`/listings/`}>
            <div className="dash-options">
              Productss
            </div>
            </a>
           <a href="/orders"> <div className="dash-options"> 
              Orders
            </div> </a>
            <a href="/account-settings"> <div className="dash-options"> 
              Account
            </div> </a>
            
         

           
            </div>
         

        </>

        <div className="center-div">
       
          <br />
          <br />
          <h1 className="text-center pt-3">No orders yet</h1>
        </div> </>)
  }

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
            className={` paginationBttns ${page === n ? "paginationActive" : ""
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
    
     
      <div className="dashboard">  
      <a href="/listings">   <div className="dash-option">
              Productsz
            </div></a>
          
           <a href="/orders"> <div className="dash-option"> 
              Orders
            </div> </a>
            <a href="/account-settings"> <div className="dash-option"> 
              Account
            </div> </a>
            
         


           
     <div className="hide-option">
     <div  onClick={handlePickup}  className="dash-option"> 
              Fedex Schedule Pickup
            </div> 
         <div className="dash-option"> 
            Fedex Drop Off
            </div> 
     </div>

    
            </div>
      <div className="center-div">
        <div className="center-div">
          <div className="start-move">
            <ul className="table-select">
              {/*<li className="tab">All</li>
              <li className="tab">Unfulfilled</li>
              <li className="tab">Processing</li>
              <li className="tab">Fulfilled</li>*/}
            </ul>
          </div>
         
      {labelSelect && <>
          <div className="Overlay3">
            <div className="Modal-smaller">
            <div className="row">Dry Ice? (Recommended) {isCheckd ? <>Yes</> : <>No</> }
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isCheckd}
       
      />
    
      <span className="slider"></span>
    </label>
<br/>
</div>
<label>Dry Ice Weight </label>
<input className="inputOnboard" onChange={(e) => setDryIceWeight(e.target.value)} placeholder="Dry ice weight LB" />
            <label>Packages Type</label>
          <select value={selectedPackage} onChange={handleChanges}>
  
      <option value="YOUR_PACKAGING">MY PACKAGING</option>
 
     
    
    </select>
    <p>Pickup Type</p>
    <select value={selectedPickupType} onChange={handleChange}>

      <option value="">Select a pickup type</option>
   
      <option value="DROPOFF_AT_FEDEX_LOCATION">DROPOFF_AT_FEDEX_LOCATION</option>
      <option value="USE_SCHEDULED_PICKUP">USE_SCHEDULED_PICKUP</option>
    </select>
    <button  disabled={dryIceWeight <= 0}onClick={handleLabel}>Print Label</button>
    </div>
    </div>
    </>}
          {highlighted && (
            <div className="button-space">
              <div className="button2" onClick={handleFulfillMany}>
                Fulfill
              </div>
            </div>
          )}
          <table className="table table-bordered m-5">
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
          <div className="bottom-wrapping">
            <div className="num__container">
              {filteredOrders.length > 8 ? <Pagination /> : <></>}
              <h3>Current Pickups  {user.pickups?.length}</h3>  Revenue To Date: ${totalOrderAmount}
            </div>
          </div>
          <div className="flex-row-end">
          
          </div>
          {pickupCode?.length > 0 ? (
            <>
              Pick Scheduled! your code is: {pickupCode}
            </>
          ) : (
            <></>
          )}
          {open && (
            <div className="Overlay3">
              <div id="Mo-7" className="Modal-smaller">
                <div closeButton>
                  <div></div>
                </div>
                {getAccount &&  (
                  <form className="left" onSubmit={handleAddFedex}>
                    <h1>Ship with your FedEx account</h1>
                    <p>Automate printing labels, schedule pickups, and more.</p>
                    <input
                      onChange={(e) => setFedEx(e.target.value)}
                      placeholder="FedEx Account Number"
                      className="inputOnboard"
                    />
                    <p>Don't have a fedex account? Sign up here.</p>
                    <div className="flex-col-a"></div>
                    <button type="submit">Submit</button>
                  </form>
                )}
             
                {!getAccount &&  (
                  <div className="div-start">
                   
                    <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
                    {!another && <> 
                    
                    {!cancelState && <>
                    <h3>Current Pickup  {user.pickups.length}</h3>
                    {successMessage && <p className="not-fail">Success! Your cancellation was processed.</p>}
                    {failMessage && <p className="fail">Oops! Something went wront. Try again later</p>}
     
                    <div className="custom-table">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Time</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {user.pickups.map((pickup, index) => (
        <tr className="reset-styles" key={pickup._id}>
          <td className="reset-styles">
            {pickup.code || pickup.pickups[index].code}
          </td>
          <td className="reset-styles">
            {pickup.time ? pickup.time.slice(5) : pickup.pickups[index].time?.slice(5)}
          </td>
          <td className="reset-styles">
            {pickup.time2 || pickup.pickups[index].time2}
          </td>
          <td onClick={() => handleCancel(index, pickup)} className="cancel"> cancel </td>
        </tr>
      ))}
    </tbody>
  </table>
</div> </>}</>}
{cancelState && <>
<h3> Cancel Pickup</h3>
<p className="bot">Are you sure you want to cancel your pick up?</p>

<p className="tiny">Scheduled time</p>
<h4>{ cancelState.props.time?.slice(5) || cancelState.props.pickups[cancelState.index].time?.slice(5)  } { cancelState.props.time2 || cancelState.props.pickups[cancelState.index].time2 }</h4>
{isCancled && <>Pickup Canceled </>}

{!isCancled && <>Not Cancled</>} 
<button>Go Back</button><button onClick={confirmCancel}>Cancel</button>
</>}
{!another &&<>{!cancelState && <><button onClick={handleAnother}>Schedule Another Pickup</button> </>} </>}

                      </div>
                    {another && (
                      <div>
                        {times ? (
                          times.map((option, index) => {
                            const dateObject = DateTime.fromISO(option.pickupDate);
                            const month = dateObject.toFormat('LLL');
                            const day = dateObject.toFormat('dd');
                            const dayOfWeek = dateObject.toFormat('EEE');
  
                            //console.log(`${month}-${day}`);
                            //console.log("pee", dateObject);
  
                            return (
                              <>
                                {pickupDay === "" ? (
                                  <div
                                    onClick={() =>
                                      handlePickupDate(`${dayOfWeek.slice(0, 5)}, ${month}, ${day}`, index)}
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
  
                        {pickupDay.length > 0 && (
                          <div className="row-flex">
                            <div className="date-choice">
                              {pickupDay}
                              {times?.map((option) => {
                                return (
                                  <div key={option.pickupDate}>
                                    <select onChange={(e) => { handleSetSubmit(e.target.value, option.pickupDate) }} hidden={option.pickupDate.slice(8) !== pickupDay.slice(10)}>
                                      <option>- time -</option>
                                      {option.readyTimeOptions.map((time, index) => {
                                        const formattedTime = DateTime.fromISO(time).toFormat('hh:mm a');
                                        return (
                                          <option id={time} key={index}>{formattedTime}</option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="confirm-pick">
                              {time !== '' && (
                                <>
                                  <div className='box-time'>
                                    <div>Time</div>
                                    <h3>{pickupDay}, {time}</h3>
                                  </div>
                                  <div className="box-time">
                                    <div>Location</div>
                                    {user.address[0]?.street}, {user.address[0]?.street2} <br />
                                    {user.address[0]?.city}  {user.address[0]?.state}  {user.address[0]?.country}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )}
  
                        {!getAccount && (
                          <div className="flex-col-a">
                             {errorMsg && <p>{errorMsg}</p>}
                            <button className="fed" onClick={handleSubmitPickup}>
                              Submit
                            </button>
                            <img className="fed-logo" src={Fed} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {show && (
            <div className="Overlay3">
              <div className="Modal-small">
                <div closeButton>
                  <div> <h4>Order details</h4></div>
                </div>
                {orderToShow.map((order) => (
                  <div className="flex-cont" key={order._id}>
                    <img src={order.pic[0].url} style={{ minWidth: 125, maxWidth: 125, minHeight: 125, maxHeight: 125, objectFit: "cover" }} />
                    <div className="flex-col-b">
                      <p>
                        <span>Quantity: {order.count}  </span> {order.name}
                      </p>
                      <p>Price: ${Number(order.price) * order.count}</p>
                    </div>
                  </div>
                ))}
                <div className="flex-left">
                  <p>Customer Email: {ownerId.email} {ownerId.phone}</p>  </div>
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
          )}
          <div
            className="new-feature"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {showComingSoon && <div className="coming-soon">Coming Soon</div>}
          </div>
                 
     <div className="show-option">
     <div  onClick={handlePickup}  className="dash-option"> 
              Fedex Schedule Pickup
            </div> 
         <div className="dash-option"> 
            Fedex Drop Off
            </div> 
     </div>

        </div>
      </div>
    </>);
  }
  
  export default OrdersPage;
  
