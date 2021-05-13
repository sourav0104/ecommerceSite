import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "./components/Container";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./containers/Cart";
import Login from "./containers/Login";
import ProductDetail from "./containers/ProductDetail";
import ProductList from "./containers/ProductList";
import Register from "./containers/Register";
// import Profile from "./containers/Profile";
import Demo from "./Demo";

const LazyProfile = React.lazy(() => import("./containers/Profile"));

const AppRouter: React.FC = (props) => {
    return (
        <main>
            <Container fluid>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path={"/"} component={Demo} exact />
                        <Route path={"/products"} component={ProductList} />
                        <Route path={"/login"} component={Login} />
                        <Route
                            path={"/profile"}
                            component={LazyProfile}
                        />
                        <Route
                            path={"/productdetail/:id"}
                            component={ProductDetail}
                        />
                        <Route path={"/cart"} component={Cart} />
                        <Route path={"/register"} component={Register} />

                        {/* 404 Route */}
                        <Route component={ErrorPage} />
                    </Switch>
                </React.Suspense>
            </Container>
        </main>
    );
};
export default AppRouter;
