import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "ri-dashboard-2-line",
      link: "/dashboard",
    },

    {
      id: "products",
      label: "Products",
      icon: "ri-dashboard-2-line",
      link: "/apps-ecommerce-products",
    },

    {
      id: "orders",
      label: "Orders",
      link: "/apps-ecommerce-orders",
      icon: "ri-dashboard-2-line",
    },

    {
      id: 6,
      label: "Customers",
      link: "/apps-ecommerce-customers",
      icon: "ri-dashboard-2-line",
    },
    {
      id: 9,
      label: "Sellers",
      link: "/apps-ecommerce-sellers",
      icon: "ri-dashboard-2-line",
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
