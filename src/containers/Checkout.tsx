import React, { RefObject, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { CartType } from "../types";
import { Redirect, RouteComponentProps } from "react-router";
import axios from "axios";
import StorageService from "../services/StorageService";

type Props = { cartDetails: any } & RouteComponentProps;
type State = {
  paymentMethod: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  zip: number;
  firstName1: string;
  lastName1: string;
  mobile1: string;
  address1: string;
  address21: string;
  country1: string;
  state1: string;
  zip1: number;
  reRender: boolean;
};
class Checkout extends React.Component<Props, State> {
  emailRef: RefObject<HTMLInputElement>;
  state: State = {
    paymentMethod: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zip: 0,
    firstName1: "",
    lastName1: "",
    mobile1: "",
    address1: "",
    address21: "",
    country1: "",
    state1: "",
    zip1: 0,
    reRender: false,
  };
  constructor(props: any) {
    super(props);
    this.emailRef = React.createRef<HTMLInputElement>();
  }

  totalPrice = 0;

  blur = (e: any) => {
    if (e.target.value === "") {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "green";
    }
  };


  // if address same
  checkboxclick = (e: any) => {
    if (e.target.checked === true) {
      this.setState({
        firstName1: this.state.firstName,
        lastName1: this.state.lastName,
        mobile1: this.state.mobile,
        address1: this.state.address,
        address21: this.state.address2,
        country1: this.state.country,
        state1: this.state.state,
        zip1: this.state.zip,
      });
    } else {
      this.setState({
        firstName1: "",
        lastName1: "",
        mobile1: "",
        address1: "",
        address21: "",
        country1: "",
        state1: "",
      });
    }
  };

  formSubmitting = (e: any) => {
    e.preventDefault();
    let emailValid = this.emailValidate();
    let mobileValid = this.mobileValidate();
    if (emailValid === true && mobileValid === true) {
      // alert("form Submited");

      let paymentDataPass = {
        amountPaid: this.totalPrice,
        paymentMethod: this.state.paymentMethod,
      };
      let dataPass = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        mobileNo: JSON.parse(this.state.mobile),
        line1: this.state.address,
        line2: this.state.address2,
        city: this.state.country,
        state: this.state.state,
        pincode: this.state.zip,
      };

      StorageService.getData("token").then((token) =>
        axios.post("http://localhost:5000/payment", paymentDataPass, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      return StorageService.getData("token").then((token) =>
        axios
          .post("http://localhost:5000/address", dataPass, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) =>
            res.status === 201
              ? this.setState({ reRender: true })
              : this.setState({ reRender: false })
          )
      );
    } else {
      alert("Invalid Form");
    }
  };


  // email validation
  emailValidate = () => {
    let validRegex: any =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.state.email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  // mobile validation
  mobileValidate = () => {
    let phoneno = /^\d{10}$/;
    if (this.state.mobile.match(phoneno) && this.state.mobile1.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  };

  redirecting = () => {
    if (this.state.reRender === true) {
      return <Redirect to="/" />;
    }
  };

  render() {
    this.totalPrice = 0;
    return (
      <>
        <h2 className="text-center text-primary">Checkout Page</h2>
        {this.redirecting()}
        <div className="container cart1">
          <h3 className="mb-3">Payment</h3>
          <div className="col-md-5 mb-3 ">
            <label>
              Payment Method{" "}
              <select
                className=""
                id="paymentMethod"
                name="paymentMethod"
                value={this.state.paymentMethod}
                required
                onChange={(e: any) => {
                  this.setState({
                    paymentMethod: e.target.value,
                  });
                  console.log(e.target.value);
                }}
                onBlur={this.blur}
              >
                <option value="">Choose...</option>
                <option value="Cash">Cash</option>
                <option value="Debit Card">Debit cards</option>
                <option value="Credit cards">Credit Card</option>
                <option value="Mobile Payment">Mobile Payment</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </label>
          </div>


          {/* billing section starts */}
          <div className="row">
            <div className="col-md-8 order-md-1 bill">
              <h3 className="mb-3">Billing address</h3>
              <form
                className="needs-validation"
                id="form2"
                onSubmit={this.formSubmitting}
              >
                <div className="row">
                  <div className="col-md-6 mb-3 contain">
                    <label>
                      First name
                      <input
                        type="text"
                        className="form-control billForm"
                        id="firstName"
                        name="firstName"
                        placeholder="Joe"
                        value={this.state.firstName}
                        required
                        onChange={(e: any) => {
                          this.setState({
                            firstName: e.target.value,
                          });
                        }}
                        onBlur={this.blur}
                      />
                    </label>
                  </div>
                  <div className="col-md-6 mb-3 contain">
                    <label>
                      Last name{" "}
                      <input
                        type="text"
                        className="form-control billForm"
                        id="lastName"
                        name="lastName"
                        placeholder="Roy"
                        value={this.state.lastName}
                        required
                        onChange={(e: any) => {
                          this.setState({
                            lastName: e.target.value,
                          });
                        }}
                        onBlur={this.blur}
                      />
                    </label>
                  </div>
                </div>

                <div className="mb-3 contain">
                  <label>
                    Email{" "}
                    <input
                      type="email"
                      className="form-control billForm"
                      id="email"
                      name="email"
                      value={this.state.email}
                      placeholder="you@example.com"
                      required
                      onChange={(e: any) => {
                        this.setState({
                          email: e.target.value,
                        });
                      }}
                      onBlur={this.blur}
                    />
                  </label>
                </div>

                <div className="mb-3 contain">
                  <label>
                    Mobile{" "}
                    <input
                      type="text"
                      className="form-control billForm"
                      id="mobile"
                      name="mobile"
                      value={this.state.mobile}
                      placeholder="00000-00000"
                      required
                      onChange={(e: any) => {
                        this.setState({
                          mobile: e.target.value,
                        });
                      }}
                      onBlur={this.blur}
                    />
                  </label>
                </div>

                <div className="mb-3 contain">
                  <label>
                    Address{" "}
                    <input
                      type="text"
                      className="form-control billForm"
                      id="address"
                      name="address"
                      value={this.state.address}
                      placeholder="1234 Main St"
                      required
                      onChange={(e: any) => {
                        this.setState({
                          address: e.target.value,
                        });
                      }}
                      onBlur={this.blur}
                    />
                  </label>
                </div>

                <div className="mb-3 contain">
                  <label>
                    Address 2<span className="text-muted">(Optional)</span>
                    <input
                      type="text"
                      className="form-control billForm"
                      id="address2"
                      name="address2"
                      value={this.state.address2}
                      placeholder="Apartment or suite"
                      onChange={(e: any) => {
                        this.setState({
                          address2: e.target.value,
                        });
                      }}
                      onBlur={this.blur}
                    />
                  </label>
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3 contain">
                    <label>
                      City{" "}
                      <select
                        className="custom-select d-block w-100 billForm"
                        id="country"
                        name="country"
                        value={this.state.country}
                        required
                        onChange={(e: any) => {
                          this.setState({
                            country: e.target.value,
                          });
                        }}
                        onBlur={this.blur}
                      >
                        <option value="">Choose...</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="delhi">Delhi</option>
                        <option value="kolkata">Kolkata</option>
                        <option value="indor">Indor</option>
                      </select>
                    </label>
                  </div>
                  <div className="col-md-4 mb-3 contain">
                    <label>
                      State
                      <select
                        className="custom-select d-block w-100 billForm"
                        id="state"
                        name="state"
                        value={this.state.state}
                        required
                        onChange={(e: any) => {
                          this.setState({
                            state: e.target.value,
                          });
                        }}
                        onBlur={this.blur}
                      >
                        <option value="">Choose...</option>
                        <option value="karnatka">Karnatka</option>
                        <option value="delhi">Delhi</option>
                        <option value="bihar">Bihar</option>
                        <option value="kerla">Kerla</option>
                        <option value="westBengal">West Bengal</option>
                      </select>
                    </label>
                  </div>
                  <div className="col-md-3 mb-3 contain">
                    <label>
                      Zip{" "}
                      <input
                        type="text"
                        className="form-control billForm"
                        id="zip"
                        name="zip"
                        value={this.state.zip}
                        placeholder="000-000"
                        required
                        onChange={(e: any) => {
                          this.setState({
                            zip: e.target.value,
                          });
                        }}
                        onBlur={this.blur}
                      />
                    </label>
                  </div>
                </div>
                {/* billing section ends */}


                <hr className="mb-4" />
                <div className="custom-control checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="same-address"
                    onChange={this.checkboxclick}
                  />
                  <label className="custom-control-label">
                    Shipping address is the same as my billing address
                  </label>
                </div>
                <hr className="mb-4" />

                {/* shipping section starts */}
                <h3 className="mb-3">Shipping address</h3>
                <div className="row">
                  <div className="col-md-6 mb-3 contain">
                    <label>
                      First name{" "}
                      <input
                        type="text"
                        className="form-control billForm"
                        id="firstName1"
                        name="firstName1"
                        placeholder="Joe"
                        value={this.state.firstName1}
                        required
                        onChange={(e: any) => {
                          this.setState({
                            firstName1: e.target.value,
                          });
                        }}
                        onBlur={this.blur}
                      />
                    </label>
                  </div>
                  <div className="col-md-6 mb-3 contain">
                    <label>
                      Last name{" "}
                      <input
                        type="text"
                        className="form-control billForm"
                        id="lastName1"
                        name="lastName1"
                        placeholder="Roy"
                        value={this.state.lastName1}
                        required
                        onChange={(e: any) => {
                          this.setState({
                            lastName1: e.target.value,
                          });
                        }}
                        onBlur={this.blur}
                      />
                    </label>
                  </div>
                </div>

                <div className="mb-3 contain">
                  <label>
                    Mobile{" "}
                    <input
                      type="text"
                      className="form-control billForm"
                      id="mobile1"
                      name="mobile1"
                      value={this.state.mobile1}
                      placeholder="00000-00000"
                      required
                      onChange={(e: any) => {
                        this.setState({
                          mobile1: e.target.value,
                        });
                      }}
                      onBlur={this.blur}
                    />
                  </label>
                </div>

                <div className="mb-3 contain">
                  <label>
                    Address{" "}
                    <input
                      type="text"
                      className="form-control billForm"
                      id="address1"
                      name="address1"
                      value={this.state.address1}
                      placeholder="1234 Main St"
                      required
                      onChange={(e: any) => {
                        this.setState({
                          address1: e.target.value,
                        });
                      }}
                      onBlur={this.blur}
                    />
                  </label>
                </div>

                <div className="mb-3 contain">
                  <label>
                    Address 2<span className="text-muted">(Optional)</span>
                    <input
                      type="text"
                      className="form-control billForm"
                      id="address21"
                      name="address21"
                      value={this.state.address21}
                      placeholder="Apartment or suite"
                      onChange={(e: any) => {
                        this.setState({
                          address21: e.target.value,
                        });
                      }}
                      onBlur={this.blur}
                    />
                  </label>
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3 contain">
                    <label>
                      Country{" "}
                      <select
                        className="custom-select d-block w-100 billForm"
                        id="country1"
                        name="country1"
                        value={this.state.country1}
                        required
                        onChange={(e: any) => {
                          this.setState({
                            country1: e.target.value,
                          });
                        }}
                        onBlur={this.blur}
                      >
                        <option value="">Choose...</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="delhi">Delhi</option>
                        <option value="kolkata">Kolkata</option>
                        <option value="indor">Indor</option>
                      </select>
                    </label>
                  </div>
                  <div className="col-md-4 mb-3 contain">
                    <label>
                      State{" "}
                      <select
                        className="custom-select d-block w-100 billForm"
                        id="state1"
                        name="state1"
                        value={this.state.state1}
                        required
                        onChange={(e: any) => {
                          this.setState({
                            state1: e.target.value,
                          });
                        }}
                        onBlur={this.blur}
                      >
                        <option value="">Choose...</option>
                        <option value="karnatka">Karnatka</option>
                        <option value="delhi">Delhi</option>
                        <option value="bihar">Bihar</option>
                        <option value="kerla">Kerla</option>
                        <option value="westBengal">West Bengal</option>
                      </select>
                    </label>
                  </div>
                  <div className="col-md-3 mb-3 contain">
                    <label>
                      Zip{" "}
                      <input
                        type="text"
                        className="form-control billForm"
                        id="zip1"
                        name="zip1"
                        value={this.state.zip1}
                        placeholder="000-000"
                        required
                        onChange={(e: any) => {
                          this.setState({
                            zip1: e.target.value,
                          });
                        }}
                        onBlur={this.blur}
                      />
                    </label>
                  </div>
                </div>
                {/* shipping section ends */}
                <hr className="mb-4" />
               
                <button
                  className="btn btn-primary btn-lg btn-block"
                  id="btn"
                >
                  Continue to checkout
                </button>
              </form>
            </div>

            {/* totalprice section starts */}
            <div className="col-md-4 order-md-2 mb-4 after_order cart2">
              <h4 className="mb-3 cart bg-dark">
                <span className="text-light">Your cart</span>
              </h4>
              <ul className="list-group mb-3 cart bg-dark">
                {this.props.cartDetails.cart.map((data: any) =>
                  data.productQty > 0 ? (
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="text-muted">{data.productName}</h6>
                      </div>
                      <span className="text-muted">Qty {data.productQty}</span>
                      <span className="text-muted">
                        INR {data.productSalePrice * data.productQty}
                      </span>
                      <span style={{ display: "none" }}>
                        {
                          (this.totalPrice =
                            this.totalPrice +
                            data.productSalePrice * data.productQty)
                        }
                      </span>
                    </li>
                  ) : null
                )}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (INR)</span>
                  <strong>INR {this.totalPrice}</strong>
                </li>
              </ul>
            </div>
            {/* total price selection ends */}
          </div>
        </div>
      </>
    );
  }
}

const mapStoreToProps = (store: CartType) => {
  return {
    cartDetails: store,
  };
};

export default connect(mapStoreToProps, null)(Checkout);
