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
      icon: "ri-product-hunt-line",
      link: "/apps-ecommerce-products",
    },

    {
      id: "orders",
      label: "Orders",
      link: "/apps-ecommerce-orders",
      icon: "ri-list-ordered",
    },

    {
      id: 6,
      label: "Customers",
      link: "/apps-ecommerce-customers",
      icon: "ri-user-line",
    },
    {
      id: 8,
      label: "Users",
      link: "/apps-ecommerce-users",
      icon: "ri-user-line",
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
