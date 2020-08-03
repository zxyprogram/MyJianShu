import React from "react";
import style from "./likeAndDislikeLeft.module.css";

export default function likeAndDislikeLeft(props) {
    const {setRewardMoneyShow} = props;
    function handleRewardClick(){
        setRewardMoneyShow(true);
    }
	return (
		<div className={style.left}>
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
			<div className={[style.likesText,props.likesClicked ? style.activeText : null].join(" ")}>
				{props.articleInfo.likes}赞
			</div>
			<div
				className={[
					style.iconBox,
					// props.likesClicked ? style.activeLikes : null,
				].join(" ")}
				onClick={handleRewardClick}
			>
				<svg
					className={["icon", style.shang].join(" ")}
					aria-hidden="true"
				>
					<use xlinkHref="#icon-shang"></use>
				</svg>
			</div>
			<div className={style.rewardText}>
				{props.rewardInfo.rewardList.length}赞赏
			</div>
		</div>
	);
}
