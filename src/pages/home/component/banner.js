import React, { useEffect } from "react";
import style from "../style.module.css";
import { connect } from "react-redux";
import { actionGetBannerInfo } from "../store/actionCreator";
function Banner(props) {
	const {getBannerInfo} = props;
	useEffect(() => {
		getBannerInfo();
	}, [getBannerInfo]);
	return (
		<a
			className={style.banner}
			href={props.bannerHref}
			target="_blank"
			rel="noopener noreferrer"
		>
			<img src={props.bannerUrl} alt="" />
		</a>
	);
}
const mapStateToProps = (state) => {
	return {
		bannerUrl: state.getIn(["home", "bannerUrl"]),
		bannerHref: state.getIn(["home", "bannerHref"]),
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getBannerInfo: () => {
			const action = actionGetBannerInfo();
			dispatch(action);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
