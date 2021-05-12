import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import StorageService from "../services/StorageService";
import { CartType } from "../types";

type Props = {
  cartData: any;
} & RouteComponentProps;
type State = {};

class Cart extends React.Component<Props, State> {
  state = { change: false };

  render() {
    const allProductId: any = [];
    let allProductData: any = [];
    const datas = this.props.cartData.cart;
    let finalProductdata = datas.map((data: any, index: number, arr: any) => {
      if (allProductId.includes(data.productId) === false) {
        allProductData.push(data);
        allProductId.push(data.productId);
      }
    });

    
    const incrementQuantity = (e: any) => {
      allProductData.map((data: any, index: number, arr: any) => {
        if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
          data.productQty = JSON.parse(data.productQty) + 1;
        }
      });
      this.setState({ change: true });
    };

    const decrementQuantity = (e: any) => {
      let productDataFilter = allProductData.map(
        (data: any, index: number, arr: any) => {
          if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
            data.productQty = JSON.parse(data.productQty) - 1;
          }
        }
      );
      this.setState({ change: true });
    };


    const onSubmit = (e: any) => {
      e.preventDefault();

      const orderData = allProductData.filter(
        (data: any) => data.productQty >= 1
      );

      const orderDataPass = {
        products: JSON.stringify(orderData),
      };

      return StorageService.getData("token").then((token) =>
        axios.post("http://localhost:5000/order", orderDataPass, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
    };
    let TotalAmount: number = 0;
    return (
      <Column size={12}>
        <div className="container">
          <h1 className="text-primary">Cart Details</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-primary">#</th>
                <th scope="col" className="text-primary">product Id</th>
                <th scope="col" className="text-primary">Product Name</th>
                <th scope="col" className="text-primary">Product Price</th>
                <th scope="col" className="text-primary">Product Quantity</th>
                <th scope="col" className="text-primary">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {allProductData.map((data: any, index: number) =>
                data.productQty > 0 ? (
                  <tr key={data.productId}>
                    <th scope="row" className="text-success">{index + 1}</th>
                    <td className="text-success">{data.productId}</td>
                    <td className="text-success">{data.productName}</td>
                    <td className="text-success">INR {data.productSalePrice}</td>
                    <td>
                      <button
                        className="btn btn-danger m-2"
                        onClick={decrementQuantity}
                        value={data.productId}> -
                      </button>
                      {data.productQty}
                      <button
                        className="btn btn-primary m-2"
                        onClick={incrementQuantity}
                        value={data.productId}>+
                      </button>
                    </td>
                    <td>
                      INR {data.productSalePrice * data.productQty}
                      <h4 style={{ display: "none" }}>
                        {
                          (TotalAmount =
                            TotalAmount +
                            data.productSalePrice * data.productQty)
                        }
                      </h4>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
          <h4 className="totalPrice text-primary">
            Total Price <b>INR {TotalAmount}</b>
          </h4>
        </div>
        <div className="container">
          <button className="btn btn-primary p-3" onClick={onSubmit}>
            Proceed to Checkout
          </button>
        </div>
      </Column>
    );
  }
}

const mapStoreToProps = (store: CartType) => {
  return {
    cartData: store,
  };
};

export default connect(mapStoreToProps, null)(Cart);
