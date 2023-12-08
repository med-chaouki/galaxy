// ProductTable.js
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductTable = ({
  products,
  handleUpdateProductClick,
  onClickDelete,
}) => {
  return (
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
              Product Name
            </TableCell>
            <TableCell
              style={{
                color: "#495057",
                fontFamily: "Saira, sans-serif",
                fontWeight: 800,
              }}
            >
              SKU
            </TableCell>
            <TableCell
              style={{
                color: "#495057",
                fontFamily: "Saira, sans-serif",
                fontWeight: 800,
              }}
            >
              Price
            </TableCell>
            <TableCell
              style={{
                color: "#495057",
                fontFamily: "Saira, sans-serif",
                fontWeight: 800,
              }}
            >
              Availability
            </TableCell>
            <TableCell
              style={{
                color: "#495057",
                fontFamily: "Saira, sans-serif",
                fontWeight: 800,
              }}
            >
              Image
            </TableCell>
            <TableCell
              style={{
                color: "#495057",
                fontFamily: "Saira, sans-serif",
                fontWeight: 800,
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.product_name}</TableCell>
              <TableCell>{product.sku}</TableCell>

              <TableCell>${product.price}</TableCell>
              <TableCell>
                <TableCell>
                  {product.active ? (
                    <CheckCircleOutline color="secondary" />
                  ) : (
                    <CancelOutlined color="error" />
                  )}
                </TableCell>
              </TableCell>
              <TableCell>
                <img
                  src={`http://localhost:4000/add/uploads/${product.product_image}`}
                  alt={product.product_name}
                  style={{ width: 50, height: 50 }}
                  id="product-img"
                />
              </TableCell>
              <TableCell>
                <IconButton
                  color="secondary"
                  onClick={() => handleUpdateProductClick(product._id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onClickDelete(product._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
