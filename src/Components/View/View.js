import React, { useState, useEffect } from "react";
import { FirebaseContextHook } from "../../store/Context";
import { ProductInfoContextHook } from "../../store/ProductInfoContext";

import "./View.css";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { productDetails } = ProductInfoContextHook();
  const { firebase } = FirebaseContextHook();

  console.log("product info", productDetails);
  console.log("user info", userDetails);

  useEffect(() => {
    const { userId } = productDetails;
    firebase
      .firestore()
      .collection('users')
      .where('id','==',userId)
      .get()
      .then((res) => {
        res.forEach(doc => {
          setUserDetails(doc.data());
        });
      });
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={productDetails.url} alt="product-img" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productDetails.price} </p>
          <span>{productDetails.name}</span>
          <p>{productDetails.category}</p>
          <span>Tue May 04 2021</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
            <span>Tue May 04 2021</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
