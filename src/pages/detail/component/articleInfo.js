import React, { useEffect, useState } from "react";
import style from "./articleInfo.module.css";
import { CSSTransition } from "react-transition-group";
import otherTransition from "./otherTransition.module.css";

/*
* 模块说明
* @module ArticleInfo
	<ArticleInfo
		articleInfo={props.articleInfo.toJS()}
		handleOtherShow={props.handleOtherShow}
		handleOtherHide={props.handleOtherHide}
		handleLike={likeClick}
		likesClicked = {likesClicked}
		handleDislike={dislikeClick}
		loginState={loginState}
	></ArticleInfo>
* @props {object} articleInfo 包含{hide:Boolean,likes:Number,dislikes:Number}三个属性，hide属性用来控制
							  .otherBox的显示和隐藏
		 {function} handleOtherShow用来在.tribleDot被点击时处理(.otherBox)的显示和隐藏
	     {function} handleOtherHide用来在.tribleDot以外的元素被点击时处理(.otherBox)的隐藏
		 {boolean} likesClicked用来表示该文章被点赞的状态
		 {function} handleLike用来处理喜欢按钮被点击事件
		 {boolean} dislikesClicked用来表示该文章被踩的状态
		 {function} handleDislike用来处理喜欢按钮被点击事件
		 {boolean} loginState用来表示登录状态
	-
*/
function ArticleInfo(props) {
	const { handleOtherHide} = props;
	const [otherShow, setOtherShow] = useState(false);
	useEffect(() => {
		if (otherShow) {
			document.addEventListener("click", handleOtherHide, false);
		}
		return () => {
			document.removeEventListener("click", handleOtherHide, false);
		};
	}, [handleOtherHide, otherShow]);
	useEffect(() => {
		setOtherShow(!props.articleInfo.hide);
	}, [props.articleInfo.hide]);
	return (
		<div className={style.articleInfo}>
			<div className={style.infoPart}>
				<div
					className={[
						style.iconBox,
						props.likesClicked ? style.activeLikes : null,
					].join(" ")}
					onClick={props.handleLike}
				>
					<svg
						className={["icon", style.like].join(" ")}
						aria-hidden="true"
					>
						<use xlinkHref="#icon-like"></use>
					</svg>
				</div>
				{props.articleInfo.likes}人点赞&gt;
				<div
					className={[
						style.iconBox,
						props.dislikesClicked ? style.activeLikes : null,
					].join(" ")}
					onClick={props.handleDislike}
				>
					<svg
						className={["icon", style.dislike].join(" ")}
						aria-hidden="true"
					>
						<use xlinkHref="#icon-dislike"></use>
					</svg>
				</div>
			</div>
			<div className={style.infoPart}>
				<div className={[style.iconBox, style.noBorder].join(" ")}>
					<svg
						className={["icon", style.noteBook].join(" ")}
						aria-hidden="true"
					>
						<use xlinkHref="#icon-notebook"></use>
					</svg>
				</div>
				日摘
				<div className={style.others}>
					<div
						className={style.tribleDot}
						onClick={props.handleOtherShow}
					>
						···
					</div>
					<CSSTransition
						in={otherShow}
						timeout={200}
						classNames={{ ...otherTransition }}
						unmountOnExit
					>
						<div className={style.otherBox}>
							<div className={style.otherPart}>分享文章</div>
							<div className={style.otherPart}>收入专题</div>
							<div className={style.otherPart}>收藏文章</div>
							<div className={style.otherPart}>举报文章</div>
						</div>
					</CSSTransition>
				</div>
			</div>
		</div>
	);
}

export default ArticleInfo;
