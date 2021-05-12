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
        <h3 className="text-primary">Profile Details</h3>
        <Column size={4}>
          <div className="container">

          </div>
        </Column>
        <Column size={8}>
            <div className="container">
                
            </div>
        </Column>
      </Row>
    );
  }
}
export default Profile;
