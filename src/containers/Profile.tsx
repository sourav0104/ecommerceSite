import axios from "axios";
import React from "react";
import Column from "../components/Column";
import Row from "../components/Row";
import StorageService from "../services/StorageService";
import UserService from "../services/UserService";
type Props = {};
type State = { orderAddress: any };

class Profile extends React.Component<Props, State> {
  state: State = {
    orderAddress: [],
  };
  // async componentDidMount() {
  //   try {
  //     const { data } = await UserService.profile();
  //     console.log(data.address);
  //     this.setState({ orderAddress: data.address });
  //   } catch (e) {
  //     console.log(e.response.data);
  //   }
  // }

  render() {
    // console.log(this.state.orderData[0].isCancelled);
    return (
      <>
        <Row>
          <h2 className="text-primary mb-4">Profile Details</h2>
          <Column size={4}>
            <div className="container user">
              <h3>UserName</h3>
              <h4>User Email</h4>
            </div>
          </Column>
          <Column size={8}>
            {this.state.orderAddress.map((data: any) => (
              <div className="container order" id={data.id} key={data.id}>
                <h5>
                  <p>
                    NAME: {data.firstName} {data.lastName}
                  </p>
                  <p>Mobile No: {data.mobileNo}</p>
                  ADDRESS: {data.line1}
                  {data.line2} , {data.city}, {data.state} ,{data.pincode}
                </h5>
              </div>
            ))}
          </Column>
        </Row>
        <Row>
          <Column size={4}></Column>
          <Column size={8}>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="line1"
                  placeholder="line1"
                ></input>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="line2"
                  placeholder="line2"
                ></input>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="city"
                ></input>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="state"
                ></input>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  placeholder="pincode"
                ></input>
              </div>
            </form>
            <button className="btn btn-warning">Update</button>
          </Column>
        </Row>
      </>
    );
  }
}
export default Profile;
