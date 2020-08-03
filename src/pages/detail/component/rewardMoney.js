import React, { useState, useEffect, useRef } from "react";
import style from "./reward.module.css";
import { CSSTransition } from "react-transition-group";
import moneyTransition from "./moneyTransition.module.css";
import tipInfoTransition from "./tipInfoTransition.module.css";
/*
@props {string} headUrl 用来接收上部头像图片的url
       {string} authorId 用来接收被打赏的作者id
       {boolean} scaleStart 用来表示组件缩放动画的状态
       {function} setScaleStart 用来设置组件缩放动画的状态
       {function} setRewardMoneyShow(Boolean:show) 用来设置组件显示与否的函数 
       {function} getMoneyInfo(Object:result) 父组件用来获取支付相关信息的函数
*/

function RewardMoney(props) {
	const [rewardBoxShow, setRewardBoxShow] = useState(false);
	const [scaleStart, setScaleStart] = useState(false);
	const [tipInfoShow, setTipInfoShow] = useState(false);
	const [diyNumber, setDiyNumber] = useState(1);
	const [activeIndex, setActiveIndex] = useState(1);
	const [message, setMessage] = useState("");
	const [activePayIndex, setActivePayIndex] = useState(1);
	const [moneyNumber, setMoneyNumber] = useState(2);
	const [wayToPay, setWayToPay] = useState("wechatpay");
	const [qrUrl, setqrUrl] = useState("");
	const [qrShow, setqrShow] = useState(false);

	let input = useRef(null);

	useEffect(() => {
		switch (activePayIndex) {
			case 1:
				setWayToPay("wechatpay");
				setqrUrl(props.moneyInfo.weixinImgUrl);
				break;
			case 2:
				setWayToPay("alipay");
				setqrUrl(props.moneyInfo.aliImgUrl);
				break;
			default:
		}
	}, [activePayIndex, props.moneyInfo]);

	useEffect(() => {
		setScaleStart(true);
	}, [setScaleStart]);

	useEffect(()=>{
		setMoneyNumber(diyNumber);
	},[diyNumber])

	useEffect(()=>{
		if(props.rewardMoneyShow){
			document.body.style.overflow = "hidden";
			
		}else{
			document.body.style.overflow = "auto";
		}
		return ()=>{
			document.body.style.overflow = "auto";
		}
	},[props.rewardMoneyShow])
	function handleOtherClick() {
		setRewardBoxShow(false);
		console.log(rewardBoxShow);
	}
	function handleDiyClick(e) {
		handleMoneyClick(e);
		setMoneyNumber(diyNumber);
		e.nativeEvent.stopImmediatePropagation();
		setRewardBoxShow(true);
		setTimeout(() => {
			input.current.focus();
		}, 300);
	}
	function handleInputChange(e) {
		if (e.target.value >= 1) {
			setDiyNumber(e.target.value);
		} else {
			setDiyNumber(1);
		}
	}
	function handleMoneyClick(e) {
		setActiveIndex(Number(e.currentTarget.dataset.index));
		setMoneyNumber(
			Number(e.currentTarget.dataset.money)
				? Number(e.currentTarget.dataset.money)
				: null
		);
		handleOtherClick();
	}
	function handleMessageChange(e) {
		setMessage(e.target.value);
	}
	function handlePayWayClick(e) {
		setActivePayIndex(Number(e.currentTarget.dataset.index));
		console.log(e.currentTarget.dataset.value);
	}
	function handleLayerClick() {
		props.setRewardMoneyShow(false);
		setScaleStart(false);
	}
	function handleConfirmClick() {
		props.getMoneyInfo({
			moneyNumber,
			message,
			wayToPay,
			authorId: props.authorId,
		});

		setScaleStart(false);
		setqrShow(true);
	}
	function handleCloseClick() {
		props.setRewardMoneyShow(false);
		setScaleStart(false);
	}
	function handleTipMouseEnter() {
		setTipInfoShow(true);
	}
	function handleTipMouseLeave() {
		setTipInfoShow(false);
	}
	function handleQrCloseClick() {
		setqrShow(false);
		props.setRewardMoneyShow(false);
	}
	
	return (
		<div className={style.rewardBox} >
			<CSSTransition
				in={scaleStart}
				timeout={300}
				unmountOnExit
				classNames={{ ...moneyTransition }}
			>
				<div className={style.rewardPartBox}>
					<div
						className={style.buttonClose}
						onClick={handleCloseClick}
					>
						<svg
							className={["icon", style.iconClose].join(" ")}
							aria-hidden="true"
						>
							<use xlinkHref="#icon-baseline-close-px"></use>
						</svg>
					</div>

					<div className={style.rewardPart}>
						<div className={style.titleReward}>
							<img
								src={props.headUrl}
								alt=""
								className={style.rewardHead}
							/>
							给作者送糖
						</div>
						<div className={style.moneyBox}>
							<div
								className={[
									style.moneyPart,
									activeIndex === 1 ? style.active : null,
								].join(" ")}
								data-index="1"
								data-money="2"
								onClick={handleMoneyClick}
							>
								<svg
									className={["icon", style.candy].join(" ")}
									aria-hidden="true"
								>
									<use xlinkHref="#icon-tangguotianshilingshi"></use>
								</svg>
								<span>2</span>
							</div>
							<div
								className={[
									style.moneyPart,
									activeIndex === 2 ? style.active : null,
								].join(" ")}
								data-index="2"
								data-money="5"
								onClick={handleMoneyClick}
							>
								<svg
									className={["icon", style.candy].join(" ")}
									aria-hidden="true"
								>
									<use xlinkHref="#icon-tangguotianshilingshi"></use>
								</svg>
								<span>5</span>
							</div>
							<div
								className={[
									style.moneyPart,
									activeIndex === 3 ? style.active : null,
								].join(" ")}
								data-index="3"
								data-money="10"
								onClick={handleMoneyClick}
							>
								<svg
									className={["icon", style.candy].join(" ")}
									aria-hidden="true"
								>
									<use xlinkHref="#icon-tangguotianshilingshi"></use>
								</svg>
								<span>10</span>
							</div>
							<div
								className={[
									style.moneyPart,
									activeIndex === 4 ? style.active : null,
								].join(" ")}
								data-index="4"
								data-money="20"
								onClick={handleMoneyClick}
							>
								<svg
									className={["icon", style.candy].join(" ")}
									aria-hidden="true"
								>
									<use xlinkHref="#icon-tangguotianshilingshi"></use>
								</svg>
								<span>20</span>
							</div>
							<div
								className={[
									style.moneyPart,
									activeIndex === 5 ? style.active : null,
								].join(" ")}
								data-index="5"
								data-money="50"
								onClick={handleMoneyClick}
							>
								<svg
									className={["icon", style.candy].join(" ")}
									aria-hidden="true"
								>
									<use xlinkHref="#icon-tangguotianshilingshi"></use>
								</svg>
								<span>50</span>
							</div>
							<div
								className={[
									style.moneyPart,
									style.diyPart,
								].join(" ")}
								onClick={handleDiyClick}
								data-index="6"
							>
								<span>自定义</span>
								{rewardBoxShow ? (
									<input
										type="number"
										ref={input}
										className={style.input}
										value={diyNumber}
										onChange={handleInputChange}
									/>
								) : null}
							</div>
						</div>
						<div className={style.messageBox}>
							<textarea
								className={style.message}
								placeholder="给Ta留言..."
								value={message}
								onChange={handleMessageChange}
							></textarea>
						</div>
						<div className={style.titlePayWay}>选择支付方式</div>
						<div className={style.wayToPayBox}>
							<div
								className={[
									style.wayToPay,
									activePayIndex === 1
										? style.activePay
										: null,
								].join(" ")}
								data-index="1"
								onClick={handlePayWayClick}
								data-value="wechatpay"
							>
								<svg
									className={[
										"icon",
										style.iconWeChatPay,
									].join(" ")}
									aria-hidden="true"
								>
									<use xlinkHref="#icon-wechat-pay"></use>
								</svg>
								<span>微信支付</span>
							</div>
							<div
								className={[
									style.wayToPay,
									activePayIndex === 2
										? style.activePay
										: null,
								].join(" ")}
								data-index="2"
								onClick={handlePayWayClick}
								data-value="alipay"
							>
								<svg
									className={["icon", style.iconAlipay].join(
										" "
									)}
									aria-hidden="true"
								>
									<use xlinkHref="#icon-alipay"></use>
								</svg>
								<span>支付宝</span>
							</div>
							<div
								className={[style.wayToPay, style.yu_e].join(
									" "
								)}
								onMouseEnter={handleTipMouseEnter}
								onMouseLeave={handleTipMouseLeave}
							>
								<span>简书余额</span>
								<CSSTransition
									in={tipInfoShow}
									timeout={50}
									unmountOnExit
									classNames={{ ...tipInfoTransition }}
								>
									<div className={style.tipInfo}>
										<div className={style.relative}>
											网站该功能暂时下线，如需使用，请到简书App操作
										</div>
										<div className={style.triBot}></div>
									</div>
								</CSSTransition>
							</div>
						</div>
						<button
							className={style.button_confirm_to_pay}
							onClick={handleConfirmClick}
						>
							确认支付￥{moneyNumber}
						</button>
					</div>
				</div>
			</CSSTransition>
			<CSSTransition
				in={qrShow}
				timeout={300}
				unmountOnExit
				classNames={{ ...moneyTransition }}
			>
				<div className={style.qrBox}>
					<div className={style.qrBoxPart}>
						<div
							className={style.qrClose}
							onClick={handleQrCloseClick}
						>
							<svg
								className={["icon", style.iconClose].join(" ")}
								aria-hidden="true"
							>
								<use xlinkHref="#icon-baseline-close-px"></use>
							</svg>
						</div>
						<div className={style.qrTitle}>
							{wayToPay === "wechatpay" ? "微信" : null}
							{wayToPay === "alipay" ? "支付宝" : null}扫码支付
						</div>
						<div className={style.imgBox}>
							<img src={qrUrl} alt="" className={style.qrImg} />
						</div>
						<div className={style.moneyCost}>
							支付金额:<span>￥{moneyNumber}</span>
						</div>
					</div>
				</div>
			</CSSTransition>
			<div className={style.maskLayer} onClick={handleLayerClick}></div>
		</div>
	);
}

export default RewardMoney;
