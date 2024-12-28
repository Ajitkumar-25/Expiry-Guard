import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

const retailerEmail = localStorage.getItem("email");

const FormDialog = ({ open, onClose, product, onSubmit, reqType }) => {
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    price: "",
    quantity: "",
    supplierEmail: "",
    retailerEmail: retailerEmail,
    expiryDate: "",
    reqType: reqType,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        supplierEmail: product.supplierEmail,
        retailerEmail: retailerEmail,
        expiryDate: product.expiryDate,
        reqType: reqType,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">
            {reqType === "send" ? "Send Product" : "Request Product"}
          </h2>
          <div>
            <Label>Product ID</Label>
            <Input name="productId" value={formData.productId} disabled />
          </div>
          <div>
            <Label>Product Name</Label>
            <Input
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="focus:border-orange-600"
            />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="focus:border-orange-600"
            />
          </div>
          <div>
            <Label>Quantity</Label>
            <Input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              className="focus:border-orange-600"
            />
          </div>
          <div>
            <Label>Supplier Email</Label>
            <Input
              name="supplierEmail"
              type="text"
              value={formData.supplierEmail}
              onChange={handleChange}
              className="focus:border-orange-600"
              disabled
            />
          </div>
          <div>
            <Label>Expiry Date</Label>
            <Input
              name="expiryDate"
              type="text"
              value={formData.expiryDate}
              onChange={handleChange}
              disable
            />
          </div>
          <Button type="submit" className="w-full bg-orange-600">
            Submit
          </Button>
        </form>
        <DialogClose onClick={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
