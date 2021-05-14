import React from "react";
import Column from "./components/Column";

type State = { no: number; count: number };
class Demo extends React.Component<{}, State> {
  state: State = { no: 0, count: 0 };
  shouldComponentUpdate(nextProps: {}, nextState: State) {
    console.log("SHOULD COMPONENT UPDATE");
    console.log("PROPS", this.props, nextProps);
    console.log("STATE", this.state, nextState);
    return this.state.no !== nextState.no || nextState.count === 7;
  }
  render() {
    // console.log("RENDER CALLED", this.state);
    // const name = "Mike";
    return (
      <div className="row">
        <Column size={12}>
          {/* <h1>
            Save upto&nbsp;<del>40%</del>&nbsp;
            <span className="offer">50%</span>&nbsp;off
          </h1>
          <p className="p">
            <span className="offer1">OFFER</span> that everyone wants
          </p> */}

          {/* <img src="../image/img3.jpg" className="img" /> */}
          <img src="../image/img5.jpg" className="img" />
          {/* <img src="../image/img1.jpg" className="img" /> */}
          {/* <img src="../image/img2.jpg" className="img" /> */}
          {/* <img src="../image/img4.jpg" className="img1" /> */}
        </Column>
      </div>
    );
  }
}
export default Demo;
