import React from "react";
import Column from "../components/Column";
import Row from "../components/Row";
import UserService from "../services/UserService";
type Props = {};
type State = {};

class Profile extends React.Component<Props, State> {
  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      console.log(data);
    } catch (e) {
      console.log(e.response.data);
    }
  }
  render() {
    return (
      <Row>
        <h2 className="text-primary mb-4">Profile Details</h2>
        <Column size={4}>
          <div className="container user">
            <h3>UserName</h3>
            <h4>User Email</h4>
          </div>
        </Column>
        <Column size={8}>
          <div className="container order">
            <h5>Product Name</h5>
            <h5>Product Quantity</h5>
            <h5>Total Amount</h5>
            <h5>Order Date</h5>
            <h5>Address</h5>
          </div>
        </Column>
      </Row>
    );
  }
}
export default Profile;
