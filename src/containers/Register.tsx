import axios from "axios";
import React from "react";
import { BrowserRouter, NavLink, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";

type RegisterState = {
  email: any;
  name: any;
  password: any;
  conformpassword: any;
  redirect: boolean;
};
class Register extends React.Component {
  state: RegisterState = {
    email: "",
    name: "",
    password: "",
    conformpassword: "",
    redirect: false,
  };

  formSubmitting = (e: any) => {
    e.preventDefault();

    if (this.state.conformpassword === this.state.password) {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      axios
        .post("http://localhost:5000/auth/register", user)
        .then((response) => console.log(response.status === 201));
      this.setState({ redirect: true });
    }
  };

  redirectToLogin = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };

  change = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container register-form">
        {this.redirectToLogin()}
        <div className="form">
          <div className="register">
            <h2>Registration</h2>
          </div>

          <div className="form-content">
            <form onSubmit={this.formSubmitting}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.change}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your EmailId"
                      name="email"
                      value={this.state.email}
                      onChange={this.change}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Your Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.change}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="conformpassword"
                      value={this.state.conformpassword}
                      onChange={this.change}
                    />
                    {this.state.conformpassword ===
                    this.state.password ? null : (
                      <p>Password is not Matching</p>
                    )}
                  </div>
                </div>
              </div>
              <button className="btn btn-success m-3 btnSubmit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
