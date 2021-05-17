import React from "react";
import { connect, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import ErrorBoundary from "../components/ErrorBoundary";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import { StoreType } from "../types";

type Props = {
    selectedCurrency: string;
} & RouteComponentProps;

class ProductDetail extends React.Component<Props> {
    productPrices: number = 1;
    productSalePrices: number = 1;

    state = {
        // itemdata: {},
        productId: null,
        productImage: "",
        productName: "",
        productPrice: 1,
        productSalePrice: 1,
        productStock: null,
        lan: "",
    };

    overLine = {
        textDecoration: "line-through",
        color: "red",
    };
    async componentDidMount() {
        try {
            const params: any = this.props.match.params;
            const { data } = await ProductService.getProductById(params.id);

            this.setState({ productId: data.productId });
            this.setState({ productImage: data.productImage });
            this.setState({ productName: data.productName });
            this.setState({ productStock: data.productStock });
            this.setState({
                productPrice: JSON.parse(data.productPrice),
            });
            this.setState({
                productSalePrice: JSON.parse(data.productSalePrice),
            });

            const currencyValue = () => {
                if (this.props.selectedCurrency === "GBP") {
                    this.setState({
                        productPrice: JSON.parse(data.productPrice) / 103,
                    });
                    this.setState({
                        productSalePrice:
                            JSON.parse(data.productSalePrice) / 103,
                    });
                } else if (this.props.selectedCurrency === "USD") {
                    this.setState({
                        productPrice: JSON.parse(data.productPrice) / 73,
                    });
                    this.setState({
                        productSalePrice:
                            JSON.parse(data.productSalePrice) / 73,
                    });
                } else if (this.props.selectedCurrency === "CAD") {
                    this.setState({
                        productPrice: JSON.parse(data.productPrice) / 60,
                    });
                    this.setState({
                        productSalePrice:
                            JSON.parse(data.productSalePrice) / 60,
                    });
                } else if (this.props.selectedCurrency === "EUR") {
                    this.setState({
                        productPrice: JSON.parse(data.productPrice) / 90,
                    });
                    this.setState({
                        productSalePrice:
                            JSON.parse(data.productSalePrice) / 90,
                    });
                } else {
                    this.setState({
                        productPrice: JSON.parse(data.productPrice),
                    });
                    this.setState({
                        productSalePrice: JSON.parse(data.productSalePrice),
                    });
                }
            };

            currencyValue();

            console.log("success", data);
        } catch (e) {
            console.log("error", e);
        }
    }

    render() {
        

        return (
            <ErrorBoundary>
                <Row>
                    <Column size={12}>
                        <h1>Product Detail</h1>
                    </Column>
                </Row>
                <div>
                    <div>
                        <img src={this.state.productImage} alt="" />
                    </div>
                    <div>
                        <h1>{this.state.productName.toLocaleUpperCase()}</h1>
                        {this.state.productPrice !==
                        this.state.productSalePrice ? (
                            <h3 style={this.overLine}>
                                Old Price {this.props.selectedCurrency}{" "}
                                {this.state.productPrice}
                            </h3>
                        ) : null}
                        <h3>
                            Price {this.props.selectedCurrency}{" "}
                            {this.state.productSalePrice}
                        </h3>
                        <h4>Stock Left {this.state.productStock}</h4>
                    </div>
                </div>
            </ErrorBoundary>
        );
    }
}

const mapStoreToProps = (store: StoreType) => {
    return {
        selectedCurrency: store.currency, // undefined => INR => USD
    };
};
export default connect(mapStoreToProps, null)(ProductDetail);
