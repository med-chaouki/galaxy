// AddProduct.js
import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Card, CardBody } from "reactstrap";

import CardHeader from "@mui/material/CardHeader";

const AddProduct = ({
  openAddProductDialog,
  handleAddProductClose,
  newProduct,
  setNewProduct,
  handleImageChange,
  addProduct,
  subcategories,
}) => {
  return (
    <Dialog
      open={openAddProductDialog}
      onClose={handleAddProductClose}
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
          Add New Product
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
        {/*       
        <div className="add-product-form"> */}

        <TextField
          label="Product Name"
          variant="outlined"
          value={newProduct.product_name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, product_name: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="SKU"
          variant="outlined"
          value={newProduct.sku}
          onChange={(e) =>
            setNewProduct({ ...newProduct, sku: e.target.value })
          }
          style={{ marginBottom: "10px", marginTop: "10px" }}
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
                        src={newProduct.image_src}
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
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Short Description"
          variant="outlined"
          value={newProduct.short_description}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              short_description: e.target.value,
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
            value={newProduct.subcategory_id}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
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

        <TextField
          label="Long Description"
          variant="outlined"
          multiline
          rows={4}
          value={newProduct.long_description}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              long_description: e.target.value,
            })
          }
          style={{ marginBottom: "10px" }}
        />

        {/* </div> */}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={addProduct}
          variant="contained"
          style={{ backgroundColor: "#7758ae", color: "#fff" }}
        >
          Add Product
        </Button>
        <Button
          onClick={handleAddProductClose}
          variant="contained"
          color="error"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProduct;
