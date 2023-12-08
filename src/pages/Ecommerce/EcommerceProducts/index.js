// EcommerceProducts.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EcommerceProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  // State for form fields
  const [newProduct, setNewProduct] = useState({
    sku: "",
    product_name: "",
    subcategory_id: "",
    short_description: "",
    long_description: "",
    price: "",
    quantity: "",
    discount_price: "",
    options: "",
    product_image: "", // You might need to handle file uploads differently
  });

  // State for Add Product Dialog
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);

  // State for Delete Product Dialog
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [deleteModal, setdeleteModal] = useState(false);

  // State for Update Product Dialog

  const [updateProductId, setUpdateProductId] = useState(null);
  const [openUpdateProductDialog, setOpenUpdateProductDialog] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    sku: "",
    product_name: "",
    subcategory_id: "",
    short_description: "",
    long_description: "",
    price: "",
    quantity: "",
    discount_price: "",
    options: "",
    product_image: "",
  });
  const [showModal, setShowModal] = useState(false);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/v1/products/search?query=${searchQuery}`
      );
      setProducts(response); // Assuming response.data contains the product data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/v1/subcategories"
      );

      // Ensure that the response contains an array of subcategories

      setSubcategories(response.data);

      // Set an empty array or handle the response appropriately
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      // Set an empty array or handle the error appropriately
      setSubcategories([]);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchSubcategories();
  }, [searchQuery]);
  // const onClickDelete = (order) => {
  //   setOrder(order);
  //   setDeleteModal(true);
  // };

  const onClickDelete = (productId) => {
    setDeleteProductId(productId);
    setShowModal(true);
    setdeleteModal(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/v1/products/${deleteProductId}`
      );
      fetchProducts();
      setShowModal(false);
      setdeleteModal(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddProductClick = () => {
    setOpenAddProductDialog(true);
  };

  const handleAddProductClose = () => {
    setOpenAddProductDialog(false);
  };

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:4000/v1/products/add", newProduct, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchProducts();

      setNewProduct({
        sku: "",
        product_name: "",
        subcategory_id: "",
        short_description: "",
        long_description: "",
        price: "",
        quantity: "",
        discount_price: "",
        options: "",
        product_image: "",
      });

      setOpenAddProductDialog(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/v1/products/${productId}`
      );
      const result = response.data;
      console.log("test", response.data);
      setUpdatedProduct({
        sku: result.sku,
        product_name: result.productName,
        subcategory_id: result.subcategoryName,
        short_description: result.shortDescription,
        long_description: result.longDescription,
        price: result.price,
        quantity: result.quantity,
        discount_price: result.discountPrice,
        options: result.options,
        product_image: result.productImage,
      });

      setOpenUpdateProductDialog(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleUpdateProductClick = (productId) => {
    setUpdateProductId(productId);
    fetchProductDetails(productId);
  };

  const handleUpdateProductClose = () => {
    setUpdateProductId(null);
    setOpenUpdateProductDialog(false);
  };

  const handleImageChange = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        product_image: file,
        image_src: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  // ======================
  const updateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:4000/v1/products/${updateProductId}`,
        updatedProduct,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchProducts();

      setOpenUpdateProductDialog(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  console.log("index", updatedProduct);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(newProduct);
  return (
    <div style={{ marginTop: "50px", padding: "80px" }} className="container">
      <h1>Product List</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <TextField
          label="Search products..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#7758ae", color: "#fff" }}
          onClick={handleAddProductClick}
        >
          + Add Product
        </Button>
      </div>

      <DeleteProduct
        show={deleteModal}
        onDeleteClick={confirmDeleteProduct}
        onCloseClick={() => setdeleteModal(false)}
      />

      <ProductTable
        products={products}
        handleUpdateProductClick={handleUpdateProductClick}
        onClickDelete={onClickDelete}
        subcategories={subcategories}
      />

      <UpdateProduct
        openUpdateProductDialog={openUpdateProductDialog}
        handleUpdateProductClose={handleUpdateProductClose}
        updatedProduct={updatedProduct}
        setUpdatedProduct={setUpdatedProduct}
        updateProduct={updateProduct}
        subcategories={subcategories}
        handleImageChange={handleImageChange}
      />

      <AddProduct
        openAddProductDialog={openAddProductDialog}
        handleAddProductClose={handleAddProductClose}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleImageChange={handleImageChange}
        addProduct={addProduct}
        subcategories={subcategories}
      />
    </div>
  );
};

export default EcommerceProducts;
