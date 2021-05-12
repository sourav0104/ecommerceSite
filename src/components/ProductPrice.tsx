import axios from "axios";
import React, { useState } from "react";
import formatter from "../utils/formatter";

type Props = {
    price: string;
    salePrice: string;
    code?: string;
};

const ProductPrice: React.FC<Props> = ({ price, salePrice, code }) => {
    // const [finalPrice, setFinalPrice] = useState(price) as any;

    // let final = JSON.parse(finalPrice);

    // const access_key: string = "c2a261cbbb657d1d2850d279d5784ac6";

    // const url: string =
    //     "http://api.exchangeratesapi.io/v1/latest?access_key=c2a261cbbb657d1d2850d279d5784ac6&format=1";

    // async const getPriceCountry = () => {
    //     await return axios
    //         .get(url)
    //         .then((data) =>
    //             code === "EUR"
    //                 ? console.log(setFinalPrice(final * data.data.rates.EUR))
    //                 : null
    //         );
    // };

    // getPriceCountry();

    return (
        <div className="d-flex align-items-center justify-content-center my-2">
            <span>{formatter.price(salePrice, code)}</span>
            {salePrice !== price ? (
                <>
                    <small className="text-muted mx-2">
                        <del>{formatter.price(price, code)}</del>
                    </small>
                    <small className="badge rounded-pill bg-success">
                        {formatter.discount(salePrice, price)}
                    </small>
                </>
            ) : (
                <small className="badge rounded-pill bg-warning mx-2">
                    <i className="fas fa-award"></i> New
                </small>
            )}
        </div>
    );
};
export default ProductPrice;
