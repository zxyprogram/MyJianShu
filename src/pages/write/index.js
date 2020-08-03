import React from "react";
import { connect } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import "antd/dist/antd.css";

function Write(props) {
	let location = useLocation();
	let write;
	if (props.loginState) {
		write = <div>{props.account}的写文章页面</div>;
	} else {
		write = (
			<Redirect
				to={{ pathname: "/login", state: { from: location } }}
			></Redirect>
		);
	}
	return write;
}

const mapStateToProps = (state) => {
	return {
		loginState: state.getIn(["login", "loginState"]),
		account: state.getIn(["login", "account"]),
	};
};

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		handleLoginClick: (account, password) => {
// 			const action = actionLogin(account, password);
// 			dispatch(action);
// 		},
// 	};
// };

export default connect(mapStateToProps, null)(Write);
