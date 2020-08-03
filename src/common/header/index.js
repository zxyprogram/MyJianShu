import React, { useRef } from "react";
import style from "./style.module.css";
import transition from "./transition.module.css";
import tipTransition from "./tipTransition.module.css";
import imgLogo from "../../statics/logo.png";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { actionLogout } from "../../pages/login/store/actionCreator";
import { NavLink, Link, useLocation } from "react-router-dom";
import { message } from "antd";
import "antd/dist/antd.css";

const Header = (props) => {
	let spin = useRef(null);
	const spinRotateAndChangeList = () => {
		props.handleChangeList();
		let deg = Number(/[0-9]+/.exec(spin.current.style.transform)) + 360;
		spin.current.style.transform = "rotate(" + deg + "deg)";
	};
	let location = useLocation();
	return (
		<header>
			<div className={style.emptyHead}></div>
			<div className={style.head}>
				<Link to="/" className={style.logo}>
					<img src={imgLogo} alt="" />
				</Link>
				<div className={style.nav}>
					<NavLink
						to="/"
						exact
						className={style.left}
						activeClassName={style.active}
					>
						<svg className={style.icon} aria-hidden="true">
							<use xlinkHref="#icon-zhinanzhen"></use>
						</svg>
						首页
					</NavLink>
					<NavLink
						to="/downloadApp"
						exact
						className={style.left}
						activeClassName={style.active}
					>
						<svg className={style.icon} aria-hidden="true">
							<use xlinkHref="#icon-phone"></use>
						</svg>
						下载APP
					</NavLink>
					<div className={style.inputBox}>
						<CSSTransition
							in={props.inputActive}
							timeout={500}
							classNames={{ ...transition }}
						>
							<input
								type="text"
								placeholder="搜索"
								className={[
									style.input,
									props.inputActive
										? style.activeInput
										: null,
								].join(" ")}
								onFocus={props.handleInputFoucus}
								onBlur={props.handleInputBlur}
								onClick={
									props.firstClick
										? props.getSearchTips
										: null
								}
							/>
						</CSSTransition>
						<div
							className={[
								style.fangdaBox,
								props.inputActive ? style.activeIconBox : null,
							].join(" ")}
						>
							<svg
								className={[style.icon, style.iconFangda].join(
									" "
								)}
								aria-hidden="true"
							>
								<use xlinkHref="#icon-fangdajing_huaban1"></use>
							</svg>
						</div>
						<CSSTransition
							in={props.mouseIn || props.inputActive}
							timeout={500}
							classNames={{ ...tipTransition }}
							unmountOnExit
						>
							<div
								className={style.searchTipBox}
								onMouseEnter={props.handleMouseEnter}
								onMouseLeave={props.handleMouseLeave}
							>
								<div>
									<span className={style.trending}>
										热搜{" "}
									</span>
									<span
										className={style.toRight}
										onClick={spinRotateAndChangeList}
									>
										<svg
											className={[
												style.icon,
												style.spin,
											].join(" ")}
											aria-hidden="true"
											ref={spin}
										>
											<use xlinkHref="#icon-spin"></use>
										</svg>
										换一批
									</span>
								</div>
								<div>
									<ul className={style.tipList}>
										{props.showList
											.toJS()
											.map(function (value) {
												return (
													<li key={value}>{value}</li>
												);
											})}
									</ul>
								</div>
							</div>
						</CSSTransition>
					</div>
					<div className={style.rightPart}>
						<a className={style.right}>
							<svg
								className={[style.icon, style.iconAa].join(" ")}
								aria-hidden="true"
							>
								<use xlinkHref="#icon-Aa"></use>
							</svg>
						</a>
						<a className={style.right}>
							<svg
								className={[style.icon, style.iconDiamond].join(
									" "
								)}
								aria-hidden="true"
							>
								<use xlinkHref="#icon-diamond"></use>
							</svg>
							<svg
								className={[style.icon, style.iconBeta].join(
									" "
								)}
								aria-hidden="true"
							>
								<use xlinkHref="#icon-beta"></use>
							</svg>
						</a>
						<Link
							className={[style.right, style.login].join(" ")}
							to={{
								pathname: "/login",
								state: {
									from: location,
								},
							}}
							onClick={
								props.loginState
									? props.handleLogoutClick
									: null
							}
						>
							{props.loginState ? "退出" : "登录"}
						</Link>
						{props.loginState ? null : (
							<Link
								className={[
									style.right,
									style.radius,
									style.registration,
								].join(" ")}
								to="/registration"
							>
								注册
							</Link>
						)}

						<Link
							className={[
								style.right,
								style.radius,
								style.write,
							].join(" ")}
							to="/write"
						>
							<svg
								className={[style.icon, style.iconPen].join(
									" "
								)}
								aria-hidden="true"
							>
								<use xlinkHref="#icon-penleather"></use>
							</svg>
							写文章
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

const mapStateToProps = (state) => {
	return {
		inputActive: state.getIn(["head", "inputActive"]),
		showList: state.getIn(["head", "showList"]),
		firstClick: state.getIn(["head", "firstClick"]),
		mouseIn: state.getIn(["head", "mouseIn"]),
		loginState: state.getIn(["login", "loginState"]),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleInputFoucus: () => {
			const action = actionCreators.actionInputActive();
			dispatch(action);
		},
		handleInputBlur: () => {
			const action = actionCreators.actionInputBlur();
			dispatch(action);
		},
		getSearchTips: () => {
			const action = actionCreators.getSearchTips();
			dispatch(action);
		},
		handleChangeList: () => {
			const action = actionCreators.changeSearchList();
			dispatch(action);
		},
		handleMouseEnter: () => {
			const action = actionCreators.mouseIn();
			dispatch(action);
		},
		handleMouseLeave: () => {
			const action = actionCreators.mouseLeave();
			dispatch(action);
		},
		handleLogoutClick: (e) => {
			e.preventDefault();
			const action = actionLogout();
			dispatch(action);
			message.success("退出登录成功！", 2);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
