import React,{useEffect} from "react";
import { connect } from "react-redux";
import style from "../style.module.css";
import {actionGetBoardInfo} from "../store/actionCreator";


function BoardWrapper(props) {
    console.log(props);
    const {getBoardUrl} = props;
    useEffect(()=>{
        getBoardUrl();
    },[getBoardUrl])
	return (
		<div className={style.board}>
			{props.boardList.map((value, index) => {
				return (
					<a href={value.href} target="_blank" rel="noopener noreferrer" key={index}>
						<img src={value.imgUrl} alt="" />
					</a>
				);
			})}
		</div>
	);
}

const mapStateToProps = (state)=>{
    return {
        boardList: state.getIn(["home","boardList"]).toJS(),
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        getBoardUrl: ()=>{
            const action = actionGetBoardInfo();
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardWrapper);
