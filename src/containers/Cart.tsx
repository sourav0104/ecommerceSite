import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import StorageService from "../services/StorageService";
import { CartType } from "../types";
import { BrowserRouter, NavLink, Redirect, useHistory } from "react-router-dom";
import Row from "../components/Row";

type Props = {
  cartDetails: any;
} & RouteComponentProps;
type State = {};

class Cart extends React.Component<Props, State> {
  state = { change: false, reRender: false };

  render() {
    const allProductId: any = [];
    let allProductData: any = [];
    const data = this.props.cartDetails.cart;
    let finaldata = data.map((data: any, index: number, arr: any) => {
      if (allProductId.includes(data.productId) === false) {
        allProductData.push(data);
        allProductId.push(data.productId);
      }
    });

    const decrementQuantity = (e: any) => {
      let dataForFilter = allProductData.map(
        (data: any, index: number, arr: any) => {
          if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
            data.productQty = JSON.parse(data.productQty) - 1;
          }
        }
      );
      this.setState({ change: true });
    };

    const incrementQuantity = (e: any) => {
      allProductData.map((data: any, index: number, arr: any) => {
        if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
          data.productQty = JSON.parse(data.productQty) + 1;
        }
      });
      this.setState({ change: true });
    };

    const Delete = (e: any) => {
      allProductData.map((data: any, index: number, arr: any) => {
        if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
          data.productId = JSON.parse(data.productId);
          alert("hello")
        }
      });
    };

    const onSubmit = (e: any) => {
      e.preventDefault();

      const orderDetails = allProductData.filter(
        (data: any) => data.productQty >= 1
      );

      const dataPass = {
        productData: JSON.stringify(orderDetails),
        totalAmount: TotalAmount,
      };

      return StorageService.getData("token").then((token) =>
        axios
          .post("http://localhost:5000/order", dataPass, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) =>
            res.status === 201
              ? this.setState({ reRender: true })
              : this.setState({ reRender: false })
          )
      );
    };
    const redirectToCheckout = () => {
      if (this.state.reRender === true) {
        return <Redirect to="/checkout" />;
      }
    };

    let TotalAmount: number = 0;
    return (
      <Row>
        <Column size={8}>
          <div className="container cart">
            {redirectToCheckout()}
            <h1 className="text-primary">Cart Details</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">product Id</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Product Price</th>
                  <th scope="col">Product Quantity</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allProductData.map((data: any, index: number) =>
                  data.productQty > 0 ? (
                    <tr key={data.productId}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.productId}</td>
                      <td>{data.productName}</td>
                      <td>INR {data.productSalePrice}</td>
                      <td>
                        <button
                          className="btn btn-danger m-2"
                          onClick={decrementQuantity}
                          value={data.productId}
                        >
                          -
                        </button>
                        {data.productQty}
                        <button
                          className="btn btn-primary m-2"
                          onClick={incrementQuantity}
                          value={data.productId}
                        >
                          +
                        </button>
                      </td>
                      <td>
                        INR {data.productSalePrice * data.productQty}
                        <p style={{ display: "none" }}>
                          {
                            (TotalAmount =
                              TotalAmount +
                              data.productSalePrice * data.productQty)
                          }
                        </p>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={Delete}
                          value={data.productId}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
          <div className="container mt-4">
            <button className="btn btn-primary p-3" onClick={onSubmit}>
              Proceed to Checkout
            </button>
          </div>
        </Column>
        <Column size={4}>
          <h4 className="totalPrice">
            Total Product Price <strong>INR {TotalAmount}</strong>
          </h4>
        </Column>
      </Row>
    );
  }
}

const mapStoreToProps = (store: CartType) => {
  return {
    cartDetails: store,
  };
};

export default connect(mapStoreToProps, null)(Cart);
