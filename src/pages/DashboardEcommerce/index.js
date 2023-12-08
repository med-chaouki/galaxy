import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import axios from "axios";

const DashboardEcommerce = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/v1/customers")
      .then((response) => {
        const allCustomers = response.customers;
        setCustomers(allCustomers);

        const loginCounts = Array(12).fill(0);

        allCustomers.forEach((customer) => {
          if (customer.lastLogin) {
            const loginDate = new Date(customer.lastLogin);
            const monthIndex = loginDate.getMonth();
            loginCounts[monthIndex]++;
          }
        });

        const data = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Customer Logins",
              data: loginCounts,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        const config = {
          type: "bar",
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };

        const ctx = document
          .getElementById("customerLoginChart")
          .getContext("2d");
        new Chart(ctx, config);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run the effect only once on mount

  const totalCustomers = customers.length;

  return (
    <div style={{ margin: "50px", padding: "80px" }}>
      <h1>Dashboard</h1>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "300px",
            marginRight: "5px",
            backgroundColor: "rgba(119, 88, 174, 0.25)",
          }}
          className="card"
        >
          <div className="card-body">
            <h5 className="card-title">Number of Sales</h5>
            {/* Add sales information here */}
          </div>
        </div>

        <div
          style={{
            width: "300px",
            marginRight: "5px",
            backgroundColor: "rgba(119, 88, 174, 0.35)",
          }}
          className="card"
        >
          <div className="card-body">
            <h5 className="card-title">Registered Customers</h5>
            <h1
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
              }}
              className="card-text"
            >
              {totalCustomers}
            </h1>
          </div>
        </div>

        <div
          style={{
            width: "300px",
            marginRight: "5px",
            backgroundColor: "rgba(119, 88, 174, 0.25)",
          }}
          className="card"
        >
          <div className="card-body">
            <h5 className="card-title">Last Placed Orders</h5>
            {/* Add last orders information here */}
          </div>
        </div>

        <div
          style={{
            width: "300px",
            backgroundColor: "rgba(119, 88, 174, 0.35)",
          }}
          className="card"
        >
          <div className="card-body">
            <h5 className="card-title">Total Revenues</h5>
            {/* Add revenues information here */}
          </div>
        </div>
      </div>

      <canvas id="customerLoginChart" width="400" height="200"></canvas>
    </div>
  );
};

export default DashboardEcommerce;
