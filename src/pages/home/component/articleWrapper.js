import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { ArticleItem } from "./articleItem";
import style from "./articleWrapper.module.css";

const ArticleWrapper = (props) => {
	const { getArticleList } = props;
	useEffect(() => {
		getArticleList();
	}, [getArticleList]);
	return (
		<div className={style.articleWrapper}>
			{props.list.toJS().map((value,index) => {
				return (
					<ArticleItem
						dataSource={value}
						key={index}
					></ArticleItem>
				);
			})}
			<div className={style.loadMore} onClick={()=>{props.getMoreArticle(props.pageNum)}}>阅读更多</div>
		</div>
		
	);
};

const mapStateToProps = (state) => {
	return {
		succeed: state.getIn(["home", "succeed"]),
		list: state.getIn(["home", "list"]),
		pageNum: state.getIn(["home","page"]),
	};
};

const mapDispatchToProps = (disptach) => {
	return {
		getArticleList: () => {
			const action = actionCreators.actionGetList();
			disptach(action);
		},
		getMoreArticle: (pageNum)=>{
			const action = actionCreators.actionGetMore(pageNum);
			disptach(action);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleWrapper);
