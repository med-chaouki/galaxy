// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardBody,
//   Col,
//   Container,
//   CardHeader,
//   Nav,
//   NavItem,
//   NavLink,
//   Row,
//   Modal,
//   ModalHeader,
//   Form,
//   ModalBody,
//   Label,
//   Input,
//   FormFeedback,
// } from "reactstrap";
// import * as moment from "moment";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import classnames from "classnames";
// import Flatpickr from "react-flatpickr";
// import BreadCrumb from "../../../Components/Common/BreadCrumb";
// import TableContainer from "../../../Components/Common/TableContainer";
// import DeleteModal from "../../../Components/Common/DeleteModal";
// import { isEmpty } from "lodash";

// // Formik
// import * as Yup from "yup";
// import { useFormik } from "formik";

// //redux
// import { useSelector, useDispatch } from "react-redux";

// //Import actions
// import {
//   getOrders as onGetOrders,
//   addNewOrder as onAddNewOrder,
//   updateOrder as onUpdateOrder,
//   deleteOrder as onDeleteOrder,
// } from "../../../store/ecommerce/action";

// import Loader from "../../../Components/Common/Loader";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import ExportCSVModal from "../../../Components/Common/ExportCSVModal";

// const EcommerceOrders = () => {
//   const [modal, setModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("1");

//   const dispatch = useDispatch();

//   const { orders, isOrderCreated, isOrderSuccess, error } = useSelector(
//     (state) => ({
//       orders: state.Ecommerce.orders,
//       isOrderCreated: state.Ecommerce.isOrderCreated,
//       isOrderSuccess: state.Ecommerce.isOrderSuccess,
//       error: state.Ecommerce.error,
//     })
//   );

//   const [orderList, setOrderList] = useState([]);
//   const [order, setOrder] = useState([]);
//   const [isExportCSV, setIsExportCSV] = useState(false);

//   const orderstatus = [
//     {
//       options: [
//         { label: "Status", value: "Status" },
//         { label: "All", value: "All" },
//         { label: "Pending", value: "Pending" },
//         { label: "Inprogress", value: "Inprogress" },
//         { label: "Cancelled", value: "Cancelled" },
//         { label: "Pickups", value: "Pickups" },
//         { label: "Returns", value: "Returns" },
//         { label: "Delivered", value: "Delivered" },
//       ],
//     },
//   ];

//   const orderpayement = [
//     {
//       options: [
//         { label: "Select Payment", value: "Select Payment" },
//         { label: "All", value: "All" },
//         { label: "Mastercard", value: "Mastercard" },
//         { label: "Paypal", value: "Paypal" },
//         { label: "Visa", value: "Visa" },
//         { label: "COD", value: "COD" },
//       ],
//     },
//   ];

//   const productname = [
//     {
//       options: [],
//     },
//   ];

//   const [isEdit, setIsEdit] = useState(false);

//   const [deleteModal, setDeleteModal] = useState(false);
//   const [deleteModalMulti, setDeleteModalMulti] = useState(false);

//   const onClickDelete = (order) => {
//     setOrder(order);
//     setDeleteModal(true);
//   };

//   const handleDeleteOrder = () => {
//     if (order) {
//       dispatch(onDeleteOrder(order._id));
//       setDeleteModal(false);
//     }
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("/api/orders"); // Update the URL to match your backend route
//         const { data } = response;
//         setOrderList(data.data);
//       } catch (error) {
//         console.error("Failed to fetch orders:", error);
//         // Handle error, e.g., show a notification to the user
//       }
//     };

//     setOrderList(orders);
//     if (!isEmpty(orders)) fetchOrders();
//   }, [dispatch, orders]);

//   const toggleTab = (tab, type) => {
//     if (activeTab !== tab) {
//       setActiveTab(tab);
//       let filteredOrders = orders;
//       if (type !== "all") {
//         filteredOrders = orders.filter((order) => order.status === type);
//       }
//       setOrderList(filteredOrders);
//     }
//   };

//   // validation
//   const validation = useFormik({
//     // enableReinitialize : use this flag when initial values needs to be changed
//     enableReinitialize: true,

//     initialValues: {
//       orderId: (order && order.orderId) || "",
//       customer: (order && order.customer) || "",
//       product: (order && order.product) || "",
//       orderDate: (order && order.orderDate) || "",
//       // ordertime: (order && order.ordertime) || '',
//       amount: (order && order.amount) || "",
//       payment: (order && order.payment) || "",
//       status: (order && order.status) || "",
//     },
//     validationSchema: Yup.object({
//       orderId: Yup.string().required("Please Enter order Id"),
//       customer: Yup.string().required("Please Enter Customer Name"),
//       product: Yup.string().required("Please Enter Product Name"),
//       // orderDate: Yup.string().required("Please Enter Order Date"),
//       // ordertime: Yup.string().required("Please Enter Order Time"),
//       amount: Yup.string().required("Please Enter Total Amount"),
//       payment: Yup.string().required("Please Enter Payment Method"),
//       status: Yup.string().required("Please Enter Delivery Status"),
//     }),
//     onSubmit: (values) => {
//       if (isEdit) {
//         const updateOrder = {
//           _id: order ? order._id : 0,
//           orderId: values.orderId,
//           customer: values.customer,
//           product: values.product,
//           orderDate: date,
//           // ordertime: values.ordertime,
//           amount: values.amount,
//           payment: values.payment,
//           status: values.status,
//         };
//         // update order
//         dispatch(onUpdateOrder(updateOrder));
//         validation.resetForm();
//       } else {
//         const newOrder = {
//           _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
//           orderId: values["orderId"],
//           customer: values["customer"],
//           product: values["product"],
//           orderDate: date,
//           // ordertime: values["ordertime"],
//           amount: values["amount"],
//           payment: values["payment"],
//           status: values["status"],
//         };
//         // save new order
//         dispatch(onAddNewOrder(newOrder));
//         validation.resetForm();
//       }
//       toggle();
//     },
//   });

//   useEffect(() => {
//     if (orders && !orders.length) {
//       dispatch(onGetOrders());
//     }
//   }, [dispatch, orders]);

//   useEffect(() => {
//     setOrder(orders);
//   }, [orders]);

//   useEffect(() => {
//     if (!isEmpty(orders)) {
//       setOrder(orders);
//       setIsEdit(false);
//     }
//   }, [orders]);

//   const toggle = useCallback(() => {
//     if (modal) {
//       setModal(false);
//       setOrder(null);
//     } else {
//       setModal(true);
//     }
//   }, [modal]);

//   const handleOrderClicks = () => {
//     setOrder("");
//     setIsEdit(false);
//     toggle();
//   };

//   const handleOrderClick = useCallback(
//     (arg) => {
//       const order = arg;
//       setOrder({
//         _id: order._id,
//         orderId: order.orderId,
//         customer: order.customer,
//         product: order.product,
//         orderDate: order.orderDate,
//         ordertime: order.ordertime,
//         amount: order.amount,
//         payment: order.payment,
//         status: order.status,
//       });

//       setIsEdit(true);
//       toggle();
//     },
//     [toggle]
//   );

//   // Checked All
//   const checkedAll = useCallback(() => {
//     const checkall = document.getElementById("checkBoxAll");
//     const ele = document.querySelectorAll(".orderCheckBox");
//     if (checkall.checked) {
//       ele.forEach((ele) => {
//         ele.checked = true;
//       });
//     } else {
//       ele.forEach((ele) => {
//         ele.checked = false;
//       });
//     }
//     deleteCheckbox();
//   }, []);

//   // Delete Multiple
//   const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
//   const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

//   const deleteMultiple = () => {
//     const checkall = document.getElementById("checkBoxAll");
//     selectedCheckBoxDelete.forEach((element) => {
//       dispatch(onDeleteOrder(element.value));
//       setTimeout(() => {
//         toast.clearWaitingQueue();
//       }, 3000);
//     });
//     setIsMultiDeleteButton(false);
//     checkall.checked = false;
//   };

//   const deleteCheckbox = () => {
//     const ele = document.querySelectorAll(".orderCheckBox:checked");
//     ele.length > 0
//       ? setIsMultiDeleteButton(true)
//       : setIsMultiDeleteButton(false);
//     setSelectedCheckBoxDelete(ele);
//   };

//   // Column
//   const columns = useMemo(
//     () => [
//       {
//         Header: (
//           <input
//             type="checkbox"
//             className="form-check-input"
//             id="checkBoxAll"
//             onClick={() => checkedAll()}
//           />
//         ),
//         Cell: (cellProps) => {
//           return (
//             <input
//               type="checkbox"
//               className="orderCheckBox form-check-input"
//               value={cellProps.row.original._id}
//               onChange={() => deleteCheckbox()}
//             />
//           );
//         },
//         id: "#",
//       },
//       {
//         Header: "Order Id",
//         accessor: "orderId",
//         filterable: false,
//         Cell: (cell) => {
//           return (
//             <Link
//               to="/apps-ecommerce-order-details"
//               className="fw-medium link-primary"
//             >
//               {cell.value}
//             </Link>
//           );
//         },
//       },
//       {
//         Header: "Customer",
//         accessor: "customer",
//         filterable: false,
//       },
//       {
//         Header: "Product",
//         accessor: "product",
//         filterable: false,
//       },
//       {
//         Header: "Order Date",
//         accessor: "orderDate",
//         // Cell: (order) => (
//         //   <>
//         //     {handleValidDate(order.row.original.orderDate)},
//         //     <small className="text-muted">
//         //       {" "}
//         //       {handleValidTime(order.row.original.orderDate)}
//         //     </small>
//         //   </>
//         // ),
//       },
//       {
//         Header: "Amount",
//         accessor: "amount",
//         filterable: false,
//       },
//       {
//         Header: "Payment Method",
//         accessor: "payment",
//         filterable: false,
//       },
//       {
//         Header: "Delivery Status",
//         accessor: "status",
//         Cell: (cell) => {
//           switch (cell.value) {
//             case "Pending":
//               return (
//                 <span className="badge text-uppercase badge-soft-warning">
//                   {" "}
//                   {cell.value}{" "}
//                 </span>
//               );
//             case "Cancelled":
//               return (
//                 <span className="badge text-uppercase badge-soft-danger">
//                   {" "}
//                   {cell.value}{" "}
//                 </span>
//               );
//             case "Inprogress":
//               return (
//                 <span className="badge text-uppercase badge-soft-secondary">
//                   {" "}
//                   {cell.value}{" "}
//                 </span>
//               );
//             case "Pickups":
//               return (
//                 <span className="badge text-uppercase badge-soft-info">
//                   {" "}
//                   {cell.value}{" "}
//                 </span>
//               );
//             case "Returns":
//               return (
//                 <span className="badge text-uppercase badge-soft-primary">
//                   {" "}
//                   {cell.value}{" "}
//                 </span>
//               );
//             case "Delivered":
//               return (
//                 <span className="badge text-uppercase badge-soft-success">
//                   {" "}
//                   {cell.value}{" "}
//                 </span>
//               );
//             default:
//               return (
//                 <span className="badge text-uppercase badge-soft-warning">
//                   {" "}
//                   {cell.value}{" "}
//                 </span>
//               );
//           }
//         },
//       },

//       {
//         Header: "Action",
//         Cell: (cellProps) => {
//           return (
//             <ul className="list-inline hstack gap-2 mb-0">
//               <li className="list-inline-item">
//                 <Link
//                   to="/apps-ecommerce-order-details"
//                   className="text-primary d-inline-block"
//                 >
//                   <i className="ri-eye-fill fs-16"></i>
//                 </Link>
//               </li>
//               <li className="list-inline-item edit">
//                 <Link
//                   to="#"
//                   className="text-primary d-inline-block edit-item-btn"
//                   onClick={() => {
//                     const orderData = cellProps.row.original;
//                     handleOrderClick(orderData);
//                   }}
//                 >
//                   <i className="ri-pencil-fill fs-16"></i>
//                 </Link>
//               </li>
//               <li className="list-inline-item">
//                 <Link
//                   to="#"
//                   className="text-danger d-inline-block remove-item-btn"
//                   onClick={() => {
//                     const orderData = cellProps.row.original;
//                     onClickDelete(orderData);
//                   }}
//                 >
//                   <i className="ri-delete-bin-5-fill fs-16"></i>
//                 </Link>
//               </li>
//             </ul>
//           );
//         },
//       },
//     ],
//     [handleOrderClick, checkedAll]
//   );
// const [date] = useState();

//   document.title = "Orders ";
//   return (
//     <div className="page-content">
//       <ExportCSVModal
//         show={isExportCSV}
//         onCloseClick={() => setIsExportCSV(false)}
//         data={orderList}
//       />
//       <DeleteModal
//         show={deleteModal}
//         onDeleteClick={handleDeleteOrder}
//         onCloseClick={() => setDeleteModal(false)}
//       />
//       <DeleteModal
//         show={deleteModalMulti}
//         onDeleteClick={() => {
//           deleteMultiple();
//           setDeleteModalMulti(false);
//         }}
//         onCloseClick={() => setDeleteModalMulti(false)}
//       />
//       <Container fluid>
//         <BreadCrumb title="Orders" pageTitle="Ecommerce" />
//         <Row>
//           <Col lg={12}>
//             <Card id="orderList">
//               <CardHeader className="card-header border-0">
//                 <Row className="align-items-center gy-3">
//                   <div className="col-sm">
//                     <h5 className="card-title mb-0">Order History</h5>
//                   </div>
//                   <div className="col-sm-auto">
//                     <div className="d-flex gap-1 flex-wrap">
//                       <button
//                         type="button"
//                         className="btn btn-primary add-btn"
//                         id="create-btn"
//                         onClick={() => {
//                           setIsEdit(false);
//                           toggle();
//                         }}
//                       >
//                         <i className="ri-add-line align-bottom me-1"></i> Create
//                         Order
//                       </button>{" "}
//                       {isMultiDeleteButton && (
//                         <button
//                           className="btn btn-soft-danger"
//                           id="remove-actions"
//                           onClick={() => setDeleteModalMulti(true)}
//                         >
//                           <i className="ri-delete-bin-2-line"></i>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </Row>
//               </CardHeader>
//               <CardBody className="pt-0">
//                 <div>
//                   <Nav
//                     className="nav-tabs nav-tabs-custom nav-primary"
//                     role="tablist"
//                   >
//                     <NavItem>
//                       <NavLink
//                         className={classnames(
//                           { active: activeTab === "1" },
//                           "fw-semibold"
//                         )}
//                         onClick={() => {
//                           toggleTab("1", "all");
//                         }}
//                         href="#"
//                       >
//                         <i className="ri-store-2-fill me-1 align-bottom"></i>{" "}
//                         All Orders
//                       </NavLink>
//                     </NavItem>
//                   </Nav>
//                   {isOrderSuccess && orderList.length ? (
//                     <TableContainer
//                       columns={columns}
//                       data={orderList || []}
//                       isGlobalFilter={true}
//                       isAddUserList={false}
//                       customPageSize={8}
//                       divClass="table-responsive table-card mb-1"
//                       tableClass="align-middle table-nowrap"
//                       theadClass="table-light text-muted"
//                       handleOrderClick={handleOrderClicks}
//                       isOrderFilter={true}
//                       SearchPlaceholder="Search for order ID, customer, order status or something..."
//                     />
//                   ) : (
//                     <Loader error={error} />
//                   )}
//                 </div>
//                 <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
//                   <ModalHeader className="bg-light p-3" toggle={toggle}>
//                     {!!isEdit ? "Edit Order" : "Add Order"}
//                   </ModalHeader>
//                   <Form
//                     className="tablelist-form"
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       validation.handleSubmit();
//                       return false;
//                     }}
//                   >
//                     <ModalBody>
//                       <input type="hidden" id="id-field" />

//                       <div className="mb-3">
//                         <Label htmlFor="id-field" className="form-label">
//                           Order Id
//                         </Label>
//                         <Input
//                           name="orderId"
//                           id="id-field"
//                           className="form-control"
//                           placeholder="Enter Order Id"
//                           type="text"
//                           validate={{
//                             required: { value: true },
//                           }}
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           value={validation.values.orderId || ""}
//                           invalid={
//                             validation.touched.orderId &&
//                             validation.errors.orderId
//                               ? true
//                               : false
//                           }
//                         />
//                         {validation.touched.orderId &&
//                         validation.errors.orderId ? (
//                           <FormFeedback type="invalid">
//                             {validation.errors.orderId}
//                           </FormFeedback>
//                         ) : null}
//                       </div>

//                       <div className="mb-3">
//                         <Label
//                           htmlFor="customername-field"
//                           className="form-label"
//                         >
//                           Customer Name
//                         </Label>
//                         <Input
//                           name="customer"
//                           id="customername-field"
//                           className="form-control"
//                           placeholder="Enter Name"
//                           type="text"
//                           validate={{
//                             required: { value: true },
//                           }}
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           value={validation.values.customer || ""}
//                           invalid={
//                             validation.touched.customer &&
//                             validation.errors.customer
//                               ? true
//                               : false
//                           }
//                         />
//                         {validation.touched.customer &&
//                         validation.errors.customer ? (
//                           <FormFeedback type="invalid">
//                             {validation.errors.customer}
//                           </FormFeedback>
//                         ) : null}
//                       </div>

//                       <div className="mb-3">
//                         <Label
//                           htmlFor="productname-field"
//                           className="form-label"
//                         >
//                           Product
//                         </Label>

//                         <Input
//                           name="product"
//                           type="select"
//                           className="form-select"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           value={validation.values.product || ""}
//                         >
//                           {productname.map((item, key) => (
//                             <React.Fragment key={key}>
//                               {item.options.map((item, key) => (
//                                 <option value={item.value} key={key}>
//                                   {item.label}
//                                 </option>
//                               ))}
//                             </React.Fragment>
//                           ))}
//                         </Input>
//                         {validation.touched.product &&
//                         validation.errors.product ? (
//                           <FormFeedback type="invalid">
//                             {validation.errors.product}
//                           </FormFeedback>
//                         ) : null}
//                       </div>
//                       <div className="row gy-4 mb-3">
//                         <div className="col-md-6">
//                           <div>
//                             <Label
//                               htmlFor="amount-field"
//                               className="form-label"
//                             >
//                               Amount
//                             </Label>
//                             <Input
//                               name="amount"
//                               type="text"
//                               onChange={validation.handleChange}
//                               onBlur={validation.handleBlur}
//                               value={validation.values.amount || ""}
//                               invalid={
//                                 validation.touched.amount &&
//                                 validation.errors.amount
//                                   ? true
//                                   : false
//                               }
//                             />
//                             {validation.touched.amount &&
//                             validation.errors.amount ? (
//                               <FormFeedback type="invalid">
//                                 {validation.errors.amount}
//                               </FormFeedback>
//                             ) : null}
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div>
//                             <Label
//                               htmlFor="payment-field"
//                               className="form-label"
//                             >
//                               Payment Method
//                             </Label>

//                             <Input
//                               name="payment"
//                               type="select"
//                               className="form-select"
//                               onChange={validation.handleChange}
//                               onBlur={validation.handleBlur}
//                               value={validation.values.payment || ""}
//                             >
//                               {orderpayement.map((item, key) => (
//                                 <React.Fragment key={key}>
//                                   {item.options.map((item, key) => (
//                                     <option value={item.value} key={key}>
//                                       {item.label}
//                                     </option>
//                                   ))}
//                                 </React.Fragment>
//                               ))}
//                             </Input>
//                             {validation.touched.payment &&
//                             validation.errors.payment ? (
//                               <FormFeedback type="invalid">
//                                 {validation.errors.payment}
//                               </FormFeedback>
//                             ) : null}
//                           </div>
//                         </div>
//                       </div>

//                       <div>
//                         <Label
//                           htmlFor="delivered-status"
//                           className="form-label"
//                         >
//                           Delivery Status
//                         </Label>

//                         <Input
//                           name="status"
//                           type="select"
//                           className="form-select"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           value={validation.values.status || ""}
//                         >
//                           {orderstatus.map((item, key) => (
//                             <React.Fragment key={key}>
//                               {item.options.map((item, key) => (
//                                 <option value={item.value} key={key}>
//                                   {item.label}
//                                 </option>
//                               ))}
//                             </React.Fragment>
//                           ))}
//                         </Input>
//                         {validation.touched.status &&
//                         validation.errors.status ? (
//                           <FormFeedback type="invalid">
//                             {validation.errors.status}
//                           </FormFeedback>
//                         ) : null}
//                       </div>
//                     </ModalBody>
//                     <div className="modal-footer">
//                       <div className="hstack gap-2 justify-content-end">
//                         <button
//                           type="button"
//                           className="btn btn-light"
//                           onClick={() => {
//                             setModal(false);
//                           }}
//                         >
//                           Close
//                         </button>

//                         <button type="submit" className="btn btn-success">
//                           {!!isEdit ? "Update" : "Add Order"}
//                         </button>
//                       </div>
//                     </div>
//                   </Form>
//                 </Modal>
//                 <ToastContainer closeButton={false} limit={1} />
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default EcommerceOrders;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { CheckCircleOutline, CancelOutlined } from "@mui/icons-material";

const EcommerceOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch data from your API when the component mounts
    axios
      .get("http://localhost:4000/v1/orders")
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  // Format the order date
  const formatOrderDate = (orderDate) => {
    // Add your formatting logic here
    // Example: return new Date(orderDate).toLocaleString();
    return orderDate;
  };

  // Function to render status badges based on the provided status
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Closed":
        return (
          <span className="badge text-uppercase badge-soft-warning">
            Closed
          </span>
        );
      case "Cancelled":
        return (
          <span className="badge text-uppercase badge-soft-danger">
            Cancelled
          </span>
        );
      case "Shipped":
        return (
          <span className="badge text-uppercase badge-soft-secondary">
            Shipped
          </span>
        );
      case "Open":
        return (
          <span className="badge text-uppercase badge-soft-info">Open</span>
        );

      case "Paid":
        return (
          <span className="badge text-uppercase badge-soft-success">Paid</span>
        );
      default:
        return (
          <span className="badge text-uppercase badge-soft-warning">
            {status}
          </span>
        );
    }
  };

  return (
    <div style={{ marginTop: "50px", padding: "50px" }}>
      <h1>Order List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  color: "#495057",
                  fontFamily: "Saira, sans-serif",
                  fontWeight: 800,
                }}
              >
                Order ID
              </TableCell>
              <TableCell
                style={{
                  color: "#495057",
                  fontFamily: "Saira, sans-serif",
                  fontWeight: 800,
                }}
              >
                Customer Name
              </TableCell>
              <TableCell
                style={{
                  color: "#495057",
                  fontFamily: "Saira, sans-serif",
                  fontWeight: 800,
                }}
              >
                Items Total
              </TableCell>
              <TableCell
                style={{
                  color: "#495057",
                  fontFamily: "Saira, sans-serif",
                  fontWeight: 800,
                }}
              >
                Order Date
              </TableCell>
              <TableCell
                style={{
                  color: "#495057",
                  fontFamily: "Saira, sans-serif",
                  fontWeight: 800,
                }}
              >
                Cart Total Price
              </TableCell>
              <TableCell
                style={{
                  color: "#495057",
                  fontFamily: "Saira, sans-serif",
                  fontWeight: 800,
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{`${order.customerFirstName} ${order.customerLastName}`}</TableCell>
                <TableCell>{order.itemsTotal}</TableCell>
                <TableCell>{formatOrderDate(order.orderDate)}</TableCell>
                <TableCell>{order.cartTotalPrice}</TableCell>
                <TableCell>{renderStatusBadge(order.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EcommerceOrders;
