import React from "react";
import "./reset.css";
import Header from "./common/header/index";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Login from "./pages/login";
import Write from "./pages/write";
function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Route path="/" exact>
					<Header></Header>
					<Home></Home>
				</Route>
				<Route path="/detail/:id" exact>
					<Header></Header>
					<Detail></Detail>
				</Route>
				<Route path="/login" exact>
					<Login></Login>
				</Route>
				<Route path="/write">
					<Header></Header>
					<Write></Write>
				</Route>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
