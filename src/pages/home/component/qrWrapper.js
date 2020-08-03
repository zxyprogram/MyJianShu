import React, { useEffect, useState } from "react";
import style from "./qrWrapper.module.css";
import { connect } from "react-redux";
import { actionGetQrInfo } from "../store/actionCreator";
import { CSSTransition } from "react-transition-group";
import qrTransition from "./qrTransition.module.css";

function QrWrapper(props) {
	const { getQrInfo } = props;
	const [qrShow, setQrShow] = useState(false);
	useEffect(() => {
		getQrInfo();
	}, [getQrInfo]);
	function handleMouseEnter() {
		setQrShow(true);
	}
	function handleMouseLeave() {
		setQrShow(false);
	}
	return (
		<div
			className={style.relativeBox}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<CSSTransition
				in={qrShow}
				timeout={500}
				unmountOnExit
				classNames={{ ...qrTransition }}
			>
				<div className={style.hiddenPart}>
					<img src={props.qrUrl} alt="" className={style.hiddenQr} />
					<div className={style.triDownBig}></div>
					<div className={style.triDown}></div>
				</div>
			</CSSTransition>
			<a
				className={style.qrWrapper}
				href={props.qrHref}
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={props.qrUrl} alt="" className={style.smallQr} />
				<div className={style.info}>
					<div className={style.title}>下载简书手机APP&ensp;&gt;</div>
					<div className={style.des}>随时随地发现和创作内容</div>
				</div>
			</a>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		qrUrl: state.getIn(["home", "qrUrl"]),
		qrHref: state.getIn(["home", "qrHref"]),
		qrShow: state.getIn(["home", "qrShow"]),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getQrInfo: () => {
			const action = actionGetQrInfo();
			console.log(action.data);
			dispatch(action);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QrWrapper);
