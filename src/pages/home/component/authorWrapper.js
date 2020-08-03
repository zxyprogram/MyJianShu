import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { AuthorItem } from "./authorItem";
import style from "./authorWrapper.module.css";
import { useRef } from "react";
import { Link } from "react-router-dom";

const AuthorWrapper = (props) => {
	const { getAuthorList } = props;
	const spin = useRef(null);
	const spinRotateAndChangeList = () => {
		props.handleChangeAuthorList(props.authorPage);
		let deg = Number(/[0-9]+/.exec(spin.current.style.transform)) + 360;
		spin.current.style.transform = "rotate(" + deg + "deg)";
	};
	useEffect(() => {
		getAuthorList();
	}, [getAuthorList]);
	return (
		<div className={style.authorWrapper}>
			<div className={style.title}>
				推荐作者
				<span
					className={style.toRight}
					onClick={spinRotateAndChangeList}
				>
					<svg
						className={[style.icon, style.spin].join(" ")}
						aria-hidden="true"
						ref={spin}
					>
						<use xlinkHref="#icon-spin"></use>
					</svg>
					换一批
				</span>
			</div>
			<ul className={style.listBox}>
				{props.list.toJS().map((value, index) => {
					return (
						<AuthorItem dataSource={value} key={index}></AuthorItem>
					);
				})}
			</ul>
			<Link className={style.loadMore} to={`/recommendations`}>查看全部&gt;</Link>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		succeed: state.getIn(["home", "authorSucceed"]),
		list: state.getIn(["home", "authorShowList"]),
		authorPage: state.getIn(["home","authorPage"]),
	};
};

const mapDispatchToProps = (disptach) => {
	return {
		getAuthorList: () => {
			const action = actionCreators.actionGetAuthorList();
			disptach(action);
		},
		handleChangeAuthorList: (authorPage) => {
			const action = actionCreators.actionHandleChangeAuthorList(authorPage);
			disptach(action);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorWrapper);
