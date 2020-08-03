import React from "react";
import style from "./reward.module.css";
import { Link } from "react-router-dom";
import RewardMoney from "./rewardMoney";
import { CSSTransition } from "react-transition-group";
import boxTransition from "./boxTransition.module.css";

function Reward(props) {
	const { rewardMoneyShow, setRewardMoneyShow } = props;
	function handleButtonClick(e) {
		setRewardMoneyShow(true);
	}
	return (
		<div className={style.reward}>
			<div className={style.rewardText}>
				{props.rewardInfo.rewardText}
			</div>
			<button className={style.buttonReward} onClick={handleButtonClick}>
				赞赏支持
			</button>

			<CSSTransition
				in={rewardMoneyShow}
				timeout={300}
				unmountOnExit
				classNames={{ ...boxTransition }}
			>
				<RewardMoney
					headUrl={props.authorInfo.headUrl}
					authorId={props.authorInfo.authorId}
					setRewardMoneyShow={setRewardMoneyShow}
					rewardMoneyShow={rewardMoneyShow}
					getMoneyInfo={props.getMoneyInfo}
					moneyInfo={props.moneyInfo}
				></RewardMoney>
			</CSSTransition>
			<div className={style.rewardInfo}>
				{props.rewardInfo.rewardList.length ? (
					<div>
						<div className={style.headListBox}>
							{props.rewardInfo.rewardList.map((value, index) => {
								return (
									<Link
										to={value.authorUrl}
										className={style.headBox}
										key={index}
									>
										<img src={value.imgUrl} alt="" />
									</Link>
								);
							})}
						</div>
						共{props.rewardInfo.rewardList.length}人赞赏
					</div>
				) : (
					`还没有人赞赏，支持一下`
				)}
			</div>
		</div>
	);
}

export default Reward;
