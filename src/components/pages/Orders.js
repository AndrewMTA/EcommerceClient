import React, { useEffect, useState, useRef } from "react";
import { DateTime } from 'luxon';
import Fed from "./Fed.png"
import { useSelector } from "react-redux";
import { useHighlightMutation } from "../../services/appApi";
import axios from "../../api/axios";
import SubNav from "./subNav"
import Navbar from "../Navbar";
import GoogleMapReact from 'google-map-react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
function OrdersPage() {
  const [isChecked, setIsChecked] = useState(false);
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
  const [ownerId, setOwnerId] = useState("")
  const [pickupCode, setpickupCode] = useState()
  const [pickupDay, setPickupDay] = useState("")
  const [highlighted, setHighlighted] = useState(false)
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
  const [highlight, { isHighlighted }] = useHighlightMutation();
  






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

  console.log("checked", isChecked)
  const handleFulfill = () => {
    axios.put('http://localhost:3500/orders/set-fulfill/', { orderId })
      .then(response => {
        console.log(response.data);
        window.location.reload(); // Refresh the page
      })
      .catch(error => {
        console.error(error);
      });
    console.log(orderId);
  };
  


  const handleFulfillMany = () => {
    const highlightedOrders = orders.filter((order) => order.highlighted);
  
    if (highlightedOrders.length === 0) {
      console.log("No highlighted orders to fulfill.");
      return;
    }
  
    const orderIds = highlightedOrders.map((order) => order._id);
    console.log(orderIds)
    axios
      .put('http://localhost:3500/orders/set-fulfill-many', { orderIds })
      .then(response => {
        console.log(response.data);
        // Perform any necessary actions after fulfillment
        window.location.reload(); // Refresh the page
      })
      .catch(error => {
        console.error(error);
      });
  };
  


  const handleLabel = (addressObj, index) => {
    setOrderAddress(addressObj)

    
    setLabelLoading(true)
    if (orderAddress.length > 0) {


      const shipmentData = {
        
          labelResponseOptions: "URL_ONLY",
          requestedShipment: {
            shipper: {
              contact: {
                personName: "Rob",
                phoneNumber: 1234567890,
                companyName: "COMPANY"
              },
              address: {
                streetLines: [
                "7441 blackburn Ave"
                ],
                city: "Downers Grove",
                stateOrProvinceCode: "IL",
                postalCode: 60516,
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
                    "111 didnt ave"
                  ],
                city: "Collierville",
                  stateOrProvinceCode: "TN",
                  postalCode: 38017,
                  countryCode: "US"
                }
              }
            ],
            shipDatestamp: "2023-06-16",
            serviceType: "FEDEX_GROUND",
            packagingType: "YOUR_PACKAGING",
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
            value: "201698364"
          }
        }


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

  console.log("ii", productMatch)

  console.log("match", idMatch);

  console.log("hh", orderProductIds)

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
    console.log("Own", owner);
    console.log("go", productsToShow);
    setOwnerId(owner)
    setOrderID(orderId);
    setShow(true);
    setOrderToShow(productsToShow);
  }

console.log("street", user?.address[0]?.street)

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
  const handleCheckboxChange = (index) => {
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index].isChecked = !updatedOrders[index].isChecked;
      return updatedOrders;
    });
  };

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
        readyDateTimestamp: `2023-05-22T11:06:00Z`,
        customerCloseTime: "17:00:00"
      },
      carrierCode: "FDXE"

    }
    axios
      .post("http://localhost:3500/orders/schedule-pickup", submitData)
      .then((response) => {

        setpickupCode(response.data.output.pickupConfirmationCode)
 

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
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));
  


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
  

      })
      .catch((error) => {
  
      });
    setOpen(true);

  };
  useLoadScript({ googleMapsApiKey: 'AIzaSyDafqAOtxds8RDU33u_luv9E8KjuQSZ35M' })
  useEffect(() => {


  }, [times]);

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

  console.log("highlighted", order.highlighted)
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
          <div onClick={() => handleLabel(order.address, index)} className="print">
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
      <td onClick={handlePickup} className={!order.highlighted ? "pickup" : "highlighted"}>Schedule Pickup</td>
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

          <SubNav />
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
      <SubNav />
      <div className="dashboard">



      </div>


      <div className="center-div">



        <div className="center-div">
          <div className="start-move">

            <ul className="table-select">
              {/**    <li className="tab">All</li> 

         
           <li className="tab">Unfulfilled</li> 
           <li className="tab">Processing</li> 
           <li className="tab">Fulfilled</li> */}
            </ul>



          </div>

         { highlighted &&
         <div className="button-space"> <div className="button2" onClick={handleFulfillMany}>Fulfill</div></div>
           }  <table className="table table-bordered m-5">
            <thead>
              <tr>

                <th>Order ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total</th>
                <th></th>
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
          
        </div>

        </div>
        <div className="flex-row-end">Revenue To Date: ${totalOrderAmount}</div>
          {pickupCode?.length > 0 ?
            <>
              your code: {pickupCode}

            </> : <></>

          }
          {open &&
            <div className="Overlay3">
              <div id="Mo-7" className="Modal-smaller">
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
                                  <>

                                    <option id={time} key={index}>{formattedTime} </option>;
                                  </>
                                )
                              })}
                            </select>
                          </div>
                        )
                      })}
                    </div>

                    <div className="confirm-pick">
                      {time !== '' &&
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
              <div className="Modal-small">
                <div closeButton>
                  <div> <h4>Order details</h4></div>
                </div>
                {orderToShow.map((order) => (
                  <div className="flex-cont">
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
<p>Customer Email: {ownerId.email}</p>  </div>

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