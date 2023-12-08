// UpdateProduct.js
import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Card, CardBody } from "reactstrap";
const UpdateProduct = ({
  openUpdateProductDialog,
  handleUpdateProductClose,
  updatedProduct,
  setUpdatedProduct,
  updateProduct,

  subcategories,
}) => {
  const handleImageChange = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        product_image: file,
        image_src: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      open={openUpdateProductDialog}
      onClose={handleUpdateProductClose}
      fullWidth
    >
      <DialogTitle>
        <h2
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#7758ae",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          Update Product
        </h2>
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          height: "auto",
          overflowY: "auto",
        }}
      >
        {/* <div className="update-product-form"> */}
        <h2>Update Product</h2>

        <TextField
          label="SKU"
          variant="outlined"
          value={updatedProduct.sku}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, sku: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Product Name"
          variant="outlined"
          value={updatedProduct.product_name}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              product_name: e.target.value,
            })
          }
          style={{ marginBottom: "10px" }}
        />
        <input
          className="form-control d-none"
          id="product-image-input"
          name="product_image"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => {
            const file = e.target.files[0];
            handleImageChange(file);
          }}
          style={{ marginBottom: "10px" }}
        />
        <Card style={{ marginBottom: "10px" }}>
          <CardBody>
            {/* ... other content */}
            <div className="mb-4">
              <h5 className="fs-14 mb-1">Product Image</h5>
              <p className="text-muted">Add Product main Image.</p>
              <div className="text-center">
                <div className="position-relative d-inline-block">
                  <div className="position-absolute top-100 start-100 translate-middle">
                    <label
                      htmlFor="product-image-input"
                      className="mb-0"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title=""
                      data-bs-original-title="Select Image"
                    >
                      <div className="avatar-xs">
                        <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                          <i className="ri-image-fill"></i>
                        </div>
                      </div>
                    </label>
                    <input
                      className="form-control d-none"
                      defaultValue=""
                      id="product-image-input"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </div>
                  <div className="avatar-lg">
                    <div className="avatar-title bg-light rounded">
                      <img
                        src={
                          updatedProduct.image_src ||
                          `http://localhost:4000/add/uploads/${updatedProduct.product_image}`
                        }
                        id="product-img"
                        alt=""
                        className="avatar-md h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ... other content */}
          </CardBody>
        </Card>
        <TextField
          label="Price"
          variant="outlined"
          value={updatedProduct.price}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, price: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Short Description"
          variant="outlined"
          value={updatedProduct.shortDescription}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              short_description: e.target.value,
            })
          }
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Long Description"
          variant="outlined"
          multiline
          rows={4}
          value={updatedProduct.longDescription}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              long_description: e.target.value,
            })
          }
          style={{ marginBottom: "10px" }}
        />

        <FormControl
          variant="outlined"
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <InputLabel htmlFor="subcategory">Subcategory</InputLabel>
          <Select
            id="subcategory"
            value={updatedProduct.subcategory_id}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                subcategory_id: e.target.value,
              })
            }
            label="Subcategory"
          >
            {subcategories.map((subcategory) => (
              <MenuItem key={subcategory._id} value={subcategory._id}>
                {subcategory.subcategoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* </div> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdateProductClose} color="primary">
          Cancel
        </Button>
        <Button onClick={updateProduct} color="primary">
          Update Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProduct;
