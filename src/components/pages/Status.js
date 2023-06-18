import React, { useEffect, useState, useRef } from "react";

import { useSelector } from "react-redux";
import axios from "../../api/axios";
import Navbar from "../Navbar";
function Status() {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    
  const carsPerPage = 8;
  const lastIndex = page * carsPerPage;
  const firstIndex = lastIndex - carsPerPage;
  const pageCount = Math.ceil(orders.length / carsPerPage);

  const numbers = [...Array(pageCount + 1).keys()].slice(1);
  let menuRef = useRef();
  {
    /*
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShow(true);
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
*/
  }
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
              
            });
    }, []);



    const HandleDisplay = () => {
       
        return (
          <>
            <>
              {page === "poop" ? setPage(1) : <></>}
              {orders.length === 0 && loading === true ?  (<>
              loading....
                </>
              ) : (
                ""
              )}
               {orders.length === 0 ?  (<>
                
                <h1 className="pusher"> No Listings Matching Search</h1>
                </>
              ) : (
                ""
              )}
              {orders.slice(firstIndex, lastIndex).map((order) => {
              
              return (
                
              <tr>
                 <td>{order._id}</td>
                 <td>
                 <a href={`orders/status/${order._id}`}>
                     <div className={`${order.status == "processing" ? "warning" : "success"}`} text="white">
                         {order.status}
                     </div>
                     </a>
                 </td>
                 <td>{order.date}</td>

                 <td>${order.total}</td>
             </tr>)
              })}{" "}
              {orders.length - firstIndex === 2 ? (
                <span className="insert">insert</span>
              ) : (
                <></>
              )}
            </>
    
            <div className="num__container">
              {orders.length > 8 ? <Pagination /> : <></>}
            </div>
          </>
        );
      };
    

    if (orders.length === 0) {
        return <h1 className="text-center pt-3">No orders yet</h1>;
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
  
  <div className="dashboard">
      <div className="dash-options">
        Add Products
      </div>
     <a href="/orders"> <div className="dash-options"> 
        Orders
      </div> </a>
      <div className="dash-options">
        Payments
      </div>
      </div>


        <div className="center-div">
          
          
            <div className="center-div">
                <thead className="m-5">
                    <tr>
                        <th className="id-1">Order ID</th>
                        <th className="id-2">Status</th>
                        <th className="id-3">Date</th>
                        <th className="id-4">Total</th>
                    </tr>
                </thead>
     
            </div>
        </div>
        </>
    );
}

export default Status;