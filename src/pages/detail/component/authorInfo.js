import React from "react";
import { Link } from "react-router-dom";
import style from "./authorInfo.module.css";

/*
	@props type:string ["article"|"author"] 值为article时显示和特定文章有关的作者信息，值为author时显示作者本身的信息
*/

export default function AuthorInfo(props) {
	return (
		<div className={style.info}>
			<Link
				to={`/author/${props.authorInfo.authorId}`}
				className={style.iconHead}
			>
				<img src={props.authorInfo.headUrl} alt="" />
			</Link>

			<div className={style.text}>
				<div className={style.line}>
					<Link
						className={style.name}
						to={`/author/${props.authorInfo.authorId}`}
					>
						{props.authorInfo.authorName}
					</Link>
					<img
						src="/images/icon-leaf.png"
						alt=""
						className={style.iconLeaf}
					/>

					{props.infoType === "author" ? (
						<span className={style.declaration}>
							{props.authorInfo.declaration}
						</span>
					) : null}
					<span
						className={[
							style.follow,
							props.infoType === "author"
								? style.followRight
								: null,
						].join(" ")}
					>
						关注
					</span>
				</div>
				<div className={style.line}>
					{props.infoType === "article" ? (
						<React.Fragment>
							<span className={style.diamond}>
								<svg
									className={["icon", style.iconDiamond].join(
										" "
									)}
									aria-hidden="true"
								>
									<use xlinkHref="#icon-diamond"></use>
								</svg>
								{props.authorInfo.diamond}
							</span>
							<span className={style.writeDate}>
								{props.authorInfo.data}&emsp;
								{props.authorInfo.time}
							</span>
							<span className={style.wordsNumber}>
								字数&ensp;{props.authorInfo.wordsNumber}
							</span>
							<span className={style.readingNumber}>
								阅读&ensp;{props.authorInfo.readings}
							</span>
						</React.Fragment>
					) : null}
					{props.infoType === "author" ? (
						<React.Fragment>
							<span className={style.mRight}>总资产{props.authorInfo.asset.value}(约{props.authorInfo.asset.inRMB}元)</span>
							<span className={style.mRight}>共写了{props.authorInfo.totalWordsNumber}W字</span>
							<span className={style.mRight}>获得{props.authorInfo.totalLikes}个赞</span>
							<span className={style.mRight}>共{props.authorInfo.totalFans}个粉丝</span>
						</React.Fragment>
					) : null}
				</div>
			</div>
		</div>
	);
}
