import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import axios from "../../api/axios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Payouts = () => {
  const orderData = [
    { orderNumber: 'Order 1', amount: 100, month: 'January' },
    { orderNumber: 'Order 1', amount: 600, month: 'January' },
    { orderNumber: 'Order 2', amount: 200, month: 'February' },
    { orderNumber: 'Order 3', amount: 450, month: 'March' },
    { orderNumber: 'Order 4', amount: 400, month: 'April' },
    { orderNumber: 'Order 5', amount: 3000, month: 'May' },
    { orderNumber: 'Order 6', amount: 40, month: 'June' },
    // Add more order data for different months
  ];

  // Calculate total revenue and order quantity by month
  const monthlyRevenue = {};
  const monthlyOrderQuantity = {};

  orderData.forEach((order) => {
    if (!monthlyRevenue[order.month]) {
      monthlyRevenue[order.month] = order.amount;
      monthlyOrderQuantity[order.month] = 1;
    } else {
      monthlyRevenue[order.month] += order.amount;
      monthlyOrderQuantity[order.month] += 1;
    }
  });

  const labels = Object.keys(monthlyRevenue);
  const revenueData = Object.values(monthlyRevenue);
  const orderQuantityData = Object.values(monthlyOrderQuantity);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Revenue and Order Quantity by Month',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5000,
        ticks: {
          stepSize: 500,
        },
      },
    },
    backgroundColor: 'rgba(173, 216, 230)', // Light blue color
  };
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Revenue',
        data: revenueData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
     
    ],
  };

  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  
  return (
 <div>
      
      <Navbar />
      <div className="dashboard">
        <a href='/add-product'>
        <div className="dash-options">Add Products</div>
        </a>
        <a href="/orders">
          <div className="dash-options">Orders</div>
        </a>
        <div className="dash-options">Payments</div>


    
      </div>
      <div className="payouts">Payouts</div>
      <div className="payments">
        <div className="pay-dash">
          <ul className='settings'>
         <li className='list'>charts</li> 
         <li className='list'>revenue</li> 
         <li className='list'>earnings</li> 
         <li className='list'>settings</li> 
      
        
          
        
          
          </ul>
          <Line options={options} data={data} />
    
        </div>
      </div>
    </div>
  );
};

export default Payouts;
