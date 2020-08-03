import React from "react";
import style from "./authorItem.module.css";
import { Link } from "react-router-dom";

export function AuthorItem(props) {
	return (
		<li className={style.authorItem}>
			<Link to={`/author/${props.dataSource.authorId}`}>
			<img src={props.dataSource.headIconUrl} alt="" className={style.iconHead}/>
			</Link>
			<Link to={`/author/${props.dataSource.authorId}`} className={style.authorName}>
				{props.dataSource.authorName}
			</Link>
			<div className={style.info}>
				写了{props.dataSource.wordsNumber}k字&ensp;·&ensp;
				{props.dataSource.likes}k喜欢
			</div>
			<div className={style.follow}>
				<svg className={["icon",style.iconPlus].join(" ")} aria-hidden="true">
					<use xlinkHref="#icon-jia"></use>
				</svg>
				关注
			</div>
		</li>
	);
}
