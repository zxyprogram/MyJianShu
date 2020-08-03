import React,{useEffect} from "react";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import style from "./style.module.css";
import ArticleWrapper from "./component/articleWrapper";
import Banner from "./component/banner";
import BoardWrapper from "./component/boardWrapper";
import QrWrapper from "./component/qrWrapper";
import AuthorWrapper from "./component/authorWrapper";

function Home(props) {
	let location = useLocation();
	useEffect(()=>{
		document.title = props.homeTitle;
	},[props.homeTitle]);
	useEffect(()=>{
		console.log(location);
	})
	return (
		<div className={style.home}>
			<div className={style.leftPart}>
				<Banner></Banner>
				<ArticleWrapper></ArticleWrapper>
			</div>
			<div className={style.rightPart}>
				<BoardWrapper></BoardWrapper>
			</div>
			<div className={style.rightPart}>
				<QrWrapper></QrWrapper>
			</div>
			<div className={style.rightPart}>
				<AuthorWrapper></AuthorWrapper>
			</div>
			
		</div>
	);
}

const mapStateToProps = (state)=>{
	return {
		homeTitle:state.getIn(["home","homeTitle"]),
	}
}
export default connect(mapStateToProps,null)(Home);
