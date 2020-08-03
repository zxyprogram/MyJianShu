import React from "react";
import style from "./article.module.css";

const Article = (props)=>{
    return(
        <div dangerouslySetInnerHTML={{__html: props.articleHtml}} className={style.article}>
            
        </div>
    )
} 

export default Article;