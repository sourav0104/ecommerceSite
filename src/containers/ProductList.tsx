import React from "react";
import Column from "../components/Column";
import Product from "../components/Product";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import { ProductType, StoreType } from "../types";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";
import Paginate from "../components/Paginate";
import LoadingWrapper from "../components/LoadingWrapper";
import LoadingActions from "../store/actions/LoadingActions";
import classes from "../components/Filter.module.css";
import { Slider } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ThemeSwitch from "../components/ThemeSwitch";

type Props = {
  selectedCurrency: string;
  showLoader: () => void;
  hideLoader: () => void;
  addItem: (product: ProductType) => void;
} & RouteComponentProps;
type State = {
  plist: ProductType[];
  totalPages: number;
  pageNumber: number;
  value: any;
};
class ProductList extends React.Component<Props, State> {
  state: State = {
    plist: [],
    totalPages: 0,
    pageNumber: 1,
    value: [0, 100000],
  };
  componentDidMount() {
    this.getData();
  }
  
  async getData() {
    try {
      this.props.showLoader();
      const { data } = await ProductService.getProducts(this.state.pageNumber);
      this.setState({
        plist: data.data,
        totalPages: data.totalPages,
        pageNumber: data.currentPage,
      });
      this.props.hideLoader();
    } catch (e) {
      console.log("error", e);
      this.props.hideLoader();
    }
  }
  addToCart(product: ProductType) {
    this.props.addItem(product); // add to cart logic
    this.props.history.push("/cart"); // redirect to cart page
  }
  updateData = (page: number) =>
    this.setState({ pageNumber: page }, () => this.getData());

  rangeSelector = (event: any, newValue: any) => {
    this.setState({ value: newValue });
  };

  render() {
    return (
      <>
        <div className={classes.slidermain}>
          <Slider
            max={100000}
            value={this.state.value}
            onChange={this.rangeSelector}
            valueLabelDisplay="auto"
          />
          <h5>
            {this.state.value[0]}-{this.state.value[1]}
          </h5>
          {/* <select
            name="sort"
            id="sort"
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="">-SORT-</option>
            <option value="Price Low-High">Price Low-High</option>
            <option value="Price High-Low">Price High-Low</option>
            <option value="Name Low-High">Name Low-High</option>
            <option value="Name High-Low">Name High-Low</option>
          </select> */}
        </div>
        <LoadingWrapper>
          <Row>
            {this.state.plist.map((val) =>
              JSON.parse(val.productSalePrice) > this.state.value[0] &&
              JSON.parse(val.productSalePrice) < this.state.value[1] ? (
                <Column size={3} classes={"my-3"} key={val.productId}>
                  <Product
                    btnClick={() => this.addToCart(val)}
                    pdata={val}
                    key={val.productId}
                    currencyCode={this.props.selectedCurrency}
                  />
                  {console.log(val.productPrice)}
                </Column>
              ) : null
            )}
            <Column size={12} classes={"text-center"}>
              <Paginate
                itemCountPerPage={10}
                totalPages={this.state.totalPages}
                currentPage={this.state.pageNumber}
                changePage={this.updateData}
              />
            </Column>
          </Row>
        </LoadingWrapper>
      </>
    );
  }
}
// connect(how to connect)(what to connect/component)
// store data can be accessed thru the props of the component
const mapStoreToProps = (store: StoreType) => {
  return {
    selectedCurrency: store.currency, // undefined => INR => USD
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    hideLoader: () => dispatch(LoadingActions.hideLoader()),
    showLoader: () => dispatch(LoadingActions.showLoader()),
    addItem: (p: ProductType) => dispatch(CartActions.addToCart(p)),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(ProductList);
