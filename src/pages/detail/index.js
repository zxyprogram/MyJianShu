import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import AuthorInfo from "./component/authorInfo";
import { connect } from "react-redux";
import {
	actionGetDetailInfo,
	actionChangeOtherShow,
	actionOtherHide,
	actionLikeAdd,
	actionLikeCancel,
	actionDislikeAdd,
	actionDislikeCancel,
	actionGetMoneyInfo,
} from "./store/actionCreator";
import Article from "./component/article";
import ArticleInfo from "./component/articleInfo";
import Reward from "./component/reward";
import GapLine from "./component/gapLine";
import LikeAndDislikeLeft from "./component/likeAndDislikeLeft";
import { useParams, useHistory, useLocation } from "react-router-dom";

function Detail(props) {
	// console.log(props.match.params);
	const { getDetailInfo, loginState } = props;
	const [likesClicked, setLikesClicked] = useState(false);
	const [dislikesClicked, setDislikesClicked] = useState(false);
	const [tipShow, setTipShow] = useState(false);
	const [rewardMoneyShow, setRewardMoneyShow] = useState(false);
	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	//异步获取详情页所需信息
	useEffect(() => {
		getDetailInfo(id);
	}, [getDetailInfo, id]);
	//动态改变页面title
	useEffect(() => {
		document.title = props.articleInfo.articleTitle;
	}, [props.articleInfo.articleTitle]);
	function likeClick() {
		if (loginState) {
			//likesCliked和dislikeClicked都没被点击
			if (!likesClicked && !dislikesClicked) {
				setLikesClicked(true);
				return props.handleLikeAdd();
				//dislikes被点击了但是likes没被点击
			} else if (dislikesClicked && !likesClicked) {
				setTipShow(true);
				setTimeout(() => {
					setTipShow(false);
				}, 2000);
			} else {
				setLikesClicked(false);
				return props.handleLikeCancel();
			}
		} else {
			toLogin();
		}
	}
	function dislikeClick() {
		if (loginState) {
			//likesCliked和dislikeClicked都没被点击
			if (!dislikesClicked && !likesClicked) {
				setDislikesClicked(true);
				return props.handleDislikeAdd();
				//likes被点击了但是dislikes没被点击
			} else if (!dislikesClicked && likesClicked) {
				setTipShow(true);
				setTimeout(() => {
					setTipShow(false);
				}, 2000);
			} else {
				setDislikesClicked(false);
				return props.handleDislikeCancel();
			}
		}else{
			toLogin();
		}
	}
	function toLogin(){
		const locationTo = {
			pathname: "/login",
			state: {
				from: location,
			},
		};
		history.push(locationTo);
	}
	return (
		<div className={style.detailPart}>
			{tipShow ? (
				<div className={style.tipInfo}>
					<svg
						className={["icon", style.chahao].join(" ")}
						aria-hidden="true"
					>
						<use xlinkHref="#icon-chahao"></use>
					</svg>
					您不能同时对一篇文章又赞又踩哦
				</div>
			) : null}
			<section className={style.articlePart}>
				<h2 className={style.title}>
					{props.articleInfo.articleTitle}
				</h2>
				<AuthorInfo
					authorInfo={props.authorInfo}
					infoType="article"
				></AuthorInfo>
				<Article articleHtml={props.articleHtml}></Article>
				<ArticleInfo
					articleInfo={props.articleInfo}
					handleOtherShow={props.handleOtherShow}
					handleOtherHide={props.handleOtherHide}
					likesClicked={likesClicked}
					handleLike={likeClick}
					dislikesClicked={dislikesClicked}
					handleDislike={dislikeClick}
					loginState={props.loginState}
				></ArticleInfo>
				<GapLine></GapLine>
				<Reward
					rewardInfo={props.rewardInfo}
					authorInfo={props.authorInfo}
					getMoneyInfo={props.getMoneyInfo}
					moneyInfo={props.moneyInfo}
					rewardMoneyShow={rewardMoneyShow}
					setRewardMoneyShow={setRewardMoneyShow}
				></Reward>
				<AuthorInfo
					authorInfo={props.authorInfo}
					infoType="author"
				></AuthorInfo>
				<LikeAndDislikeLeft
					articleInfo={props.articleInfo}
					likesClicked={likesClicked}
					handleLike={likeClick}
					rewardMoneyShow={rewardMoneyShow}
					setRewardMoneyShow={setRewardMoneyShow}
					rewardInfo={props.rewardInfo}
				></LikeAndDislikeLeft>
			</section>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		authorInfo: state.getIn(["detail", "authorInfo"]).toJS(),
		articleHtml: state.getIn(["detail", "articleHtml"]),
		articleInfo: state.getIn(["detail", "articleInfo"]).toJS(),
		rewardInfo: state.getIn(["detail", "rewardInfo"]).toJS(),
		moneyInfo: state.getIn(["detail", "moneyInfo"]).toJS(),
		loginState: state.getIn(["login", "loginState"]),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDetailInfo: (id) => {
			const action = actionGetDetailInfo(id);
			dispatch(action);
		},
		getMoneyInfo: (result) => {
			const action = actionGetMoneyInfo(result);
			dispatch(action);
		},
		handleOtherShow: (e) => {
			e.nativeEvent.stopImmediatePropagation();
			const action = actionChangeOtherShow();
			dispatch(action);
		},
		handleOtherHide: () => {
			const action = actionOtherHide();
			dispatch(action);
		},
		handleLikeAdd: () => {
			const action = actionLikeAdd();
			dispatch(action);
		},
		handleLikeCancel: () => {
			const action = actionLikeCancel();
			dispatch(action);
		},
		handleDislikeAdd: () => {
			const action = actionDislikeAdd();
			dispatch(action);
		},
		handleDislikeCancel: () => {
			const action = actionDislikeCancel();
			dispatch(action);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
