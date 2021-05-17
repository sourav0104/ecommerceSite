import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import StorageService from "../services/StorageService";
import { CartType, ProductType } from "../types";
import { BrowserRouter, NavLink, Redirect, useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";
import Row from "../components/Row";

type Props = {
  cartDetails: any;
  removeItem: any;
} & RouteComponentProps;
type State = {};

class Cart extends React.Component<Props, State> {
  state = { change: false, reRender: false };

  render() {
    const allProductId: any = [];
    let allProductData: any = [];
    const datas = this.props.cartDetails.cart;
    let finalProductdata = datas.map((data: any, index: number, arr: any) => {
      if (allProductId.includes(data.productId) === false) {
        allProductData.push(data);
        allProductId.push(data.productId);
      }
    });


    //decrementquantity function
    const decrementQuantity = (e: any) => {
      let dataFilteration = allProductData.map(
        (data: any, index: number, arr: any) => {
          if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
            if (data.productQty >= 2) {
              data.productQty = JSON.parse(data.productQty) - 1;
            }
          }
        }
      );
      this.setState({ change: true });
    };


    //incrementquantity function
    const incrementQuantity = (e: any) => {
      allProductData.map((data: any, index: number, arr: any) => {
        if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
          data.productQty = JSON.parse(data.productQty) + 1;
        }
      });
      this.setState({ change: true });
    };

    
    
    const onProcessSubmit = (e: any) => {
      e.preventDefault();

      const orderData = allProductData.filter(
        (data: any) => data.productQty >= 1
      );

      const dataPass = {
        products: JSON.stringify(orderData),
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
    const redirecting = () => {
      if (this.state.reRender === true) {
        return <Redirect to="/checkout" />;
      }
    };

    //remove production function
    const removeProductItem = (e: any) => {
      console.log(e.target.value);
      let itemId = parseInt(e.target.value);
      console.log(itemId);
      this.props.removeItem(itemId);
    };
    

    let TotalAmount: number = 0;
    return (
      <Row>
        <Column size={8}>
          <div className="container cart">
            {redirecting()}
            <h2 className="text-primary">Your Shipping Details</h2>

            <table className="table">

              {/* cartheader starts */}
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" className="col-1"> Image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">
                    Product Price
                  </th>
                  <th scope="col">
                    Product Quantity
                  </th>
                  <th scope="col">
                    Total Price
                  </th>
                </tr>
              </thead>
            {/* cartheader ends */}

              {/* cart body starts */}
              <tbody>
                {allProductData.map((data: any, index: number) => (
                  <tr key={data.productId}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <div className="imageDivThum">
                        <img
                          className="img-thumbnail"
                          src={data.productImage}
                          alt={data.productName}
                        />
                      </div>
                    </td>
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
                        value={data.productId}
                        className="btn-outline-danger btn p-1"
                        onClick={removeProductItem}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* cartbody ends */}

            </table>
          </div>
          <div className="container">
            <button
              className="btn btn-primary p-3 mt-4"
              onClick={onProcessSubmit}
            >
              Proceed to Checkout
            </button>
          </div>
        </Column>
        <Column size={4}>
          <h4 className={"totalPrice"}>
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    removeItem: (itemId: number) => dispatch(CartActions.removeItem(itemId)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Cart);
