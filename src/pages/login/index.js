import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import style from "./login.module.css";
import { Link } from "react-router-dom";
import { actionLogin } from "./store/actionCreator";
import { useHistory, useLocation } from "react-router-dom";
import {message} from "antd";
import 'antd/dist/antd.css';


function Login(props) {
	const [account, setAccount] = useState("");
	const [password, setPassword] = useState("");

	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		if (props.loginState) {
			if(location.state.from){
				history.push(location.state.from);
			}else{
				history.push("/");
			}
			
		}
	}, [props.loginState,history,location.state.from]);

	function handleAccountChange(e) {
		setAccount(e.target.value);
	}
	function handlePasswordChange(e) {
		setPassword(e.target.value);
	}
	function handleLoginClick() {
		if (account.length > 0 && password.length > 0) {
			message.success("登录成功！",1).then(()=>{
				props.handleLoginClick(account, password);
			});
		}else{
			message.error("请输入正确的账号和密码！");
		}
	}

	return (
		<div className={style.loginBg}>
			<Link
				to={{
					pathname: "/",
					state: {
						from: "login",
					},
				}}
				className={style.toHome}
			>
				<img src="/logo.png" alt="" className={style.imgLogo} />
			</Link>
			<div className={style.loginBox}>
				<div className={style.login}>
					<div className={style.title}>登录</div>
					<div className={style.inputBox}>
						<svg
							className={["icon", style.iconUser].join(" ")}
							aria-hidden="true"
						>
							<use xlinkHref="#icon-user"></use>
						</svg>
						<input
							type="text"
							className={style.account}
							name="account"
							value={account}
							onChange={handleAccountChange}
						/>
					</div>
					<div className={style.inputBox}>
						<svg
							className={["icon", style.iconLock].join(" ")}
							aria-hidden="true"
						>
							<use xlinkHref="#icon-Lock"></use>
						</svg>
						<input
							type="password"
							name="password"
							id=""
							className={style.password}
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>
					<button
						className={style.buttonLogin}
						onClick={handleLoginClick}
					>
						登录
					</button>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		loginState: state.getIn(["login", "loginState"]),
		account: state.getIn(["login", "account"]),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleLoginClick: (account, password) => {
			const action = actionLogin(account, password);
			dispatch(action);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
