import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../types";
import formatter from "../utils/formatter";
import ImageWithFallback from "./ImageWithFallback";
import ProductPrice from "./ProductPrice";

type ProductProps = {
    pdata: ProductType;
    wishlist?: boolean;
    currencyCode: string;
    btnClick: () => void;
};
class Product extends React.Component<ProductProps> {
    renderStock(stock: number) {
        if (stock <= 0) {
            return (
                <button
                    disabled
                    className="btn btn-sm w-100 btn-danger text-uppercase"
                >
                    <i className="far fa-frown"></i>Out of stock
                </button>
            );
        }
        return (
            <button
                onClick={() => this.props.btnClick()}
                className="btn btn-sm w-100 btn-primary text-uppercase"
            >
                <i className="fab fa-opencart"></i> Add to Cart
            </button>
        );
    }

    // url: string =
    //     "http://api.exchangeratesapi.io/v1/latest?access_key=c2a261cbbb657d1d2850d279d5784ac6&format=1";
    // getPriceCountry = () => {
    //     return axios.get(this.url).then((data) => console.log(data.data.rates));
    // };

    render() {
        const { pdata, wishlist, currencyCode } = this.props;

        let finalprice: any = pdata.productPrice;
        let finalsaleprice: any = pdata.productSalePrice;
        // this.getPriceCountry();
        return (
            <div className="p-4 shadow-sm text-center">
                <Link to={`/productdetail/${pdata.productId}`}>
                    <ImageWithFallback source={pdata.productImage} />
                </Link>
                <h5 className={"mt-4"}>
                    {formatter.titlecase(pdata.productName)}
                </h5>
                <ProductPrice
                    {...(currencyCode === "EUR"
                        ? ((finalprice = JSON.parse(pdata.productPrice) / 90),
                          (finalsaleprice =
                              JSON.parse(pdata.productSalePrice) / 90))
                        : currencyCode === "USD"
                        ? ((finalprice = JSON.parse(pdata.productPrice) / 73),
                          (finalsaleprice =
                              JSON.parse(pdata.productSalePrice) / 73))
                        : currencyCode === "CAD"
                        ? ((finalprice = JSON.parse(pdata.productPrice) / 60),
                          (finalsaleprice =
                              JSON.parse(pdata.productSalePrice) / 60))
                        : currencyCode === "GBP"
                        ? ((finalprice = JSON.parse(pdata.productPrice) / 103),
                          (finalsaleprice =
                              JSON.parse(pdata.productSalePrice) / 103))
                        : null)}
                    price={finalprice}
                    salePrice={finalsaleprice}
                    code={currencyCode}
                />
                {/* <button>Add to {wishlist ? "Wishlist" : "Cart"}</button> */}
                {this.renderStock(pdata.productStock)}
            </div>
        );
    }
}
export default Product;
