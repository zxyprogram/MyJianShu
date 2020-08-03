import { ACTION_GET_DETAIL_INFO,ACTION_CHANGE_OTHER_SHOW,ACTION_OTHER_HIDE,ACTION_LIKE_ADD ,ACTION_LIKE_CANCEL,ACTION_DISLIKE_ADD,ACTION_DISLIKE_CANCEL,ACTION_GET_MONEY_INFO} from "./actionTypes";
import axios from "axios";

export const actionGetDetailInfo = (id) => {
	return (dispatch) => {
		axios
			.get(`/api/detail/detail${id}.json`)
			.then((result)=>{
                console.log(result);
                const action = {
                    type:ACTION_GET_DETAIL_INFO,
                    data:result.data
                }
                dispatch(action);
            })
			.catch((err) => {
				console.log(err);
			});
	};
};
export const actionChangeOtherShow = ()=>{
	return{
		type: ACTION_CHANGE_OTHER_SHOW,
	}
}
export const actionOtherHide = ()=>{
	return{
		type: ACTION_OTHER_HIDE,
	}
}
export const actionLikeAdd =()=>{
	return (dispatch)=>{
		//此处应该使用post向指定服务器接口传递Likes数量增加的信息，但由于没有实际的服务器接口，故先省略
		// axios.post("指定服务器接口",{
		// 	type:"LikesAdd",
		// });
		const action = {
			type: ACTION_LIKE_ADD,
		}
		dispatch(action);
	}
}
export const actionLikeCancel =()=>{
	return (dispatch)=>{
		//此处应该使用post向指定服务器接口传递Likes数量减少的信息，但由于没有实际的服务器接口，故先省略
		// axios.post("指定服务器接口",{
		// 	type:"LikesCancel",
		// });
		const action = {
			type: ACTION_LIKE_CANCEL,
		}
		dispatch(action);
	}
}
export const actionDislikeAdd =()=>{
	return (dispatch)=>{
		//此处应该使用post向指定服务器接口传递dislikes数量增加的信息，但由于没有实际的服务器接口，故先省略
		// axios.post("指定服务器接口",{
		// 	type:"dislikesAdd",
		// });
		const action = {
			type: ACTION_DISLIKE_ADD,
		}
		dispatch(action);
	}
}
export const actionDislikeCancel =()=>{
	return (dispatch)=>{
		//此处应该使用post向指定服务器接口传递dislikes数量减少的信息，但由于没有实际的服务器接口，故先省略
		// axios.post("指定服务器接口",{
		// 	type:"dislikesCancel",
		// });
		const action = {
			type: ACTION_DISLIKE_CANCEL,
		}
		dispatch(action);
	}
}
export const actionGetMoneyInfo = (moneyInfo)=>{
	return (dispatch)=>{
		//此处应该使用post向指定服务器接口传递result(打赏金钱，被打赏作者ID，留言，支付方式)，然后使用服务器返回的支付二维码信息来生成二维码，但由于没有实际的服务器接口，故先用mock返回二维码图片url信息
		// axios.post("指定服务器接口",moneyInfo{
		// 	
		// });
		//本地proxy不接受post请求，只能使用get方法

		axios.get(`/api/detail/qrCode.json?authoId=${moneyInfo.authorId}&wayToPay=${moneyInfo.wayToPay}&moneyNumber=${moneyInfo.moneyNumber}&message=${moneyInfo.message}`).then((result)=>{
			console.log(result);
			const action = {
				type: ACTION_GET_MONEY_INFO,
				data: result.data,
			};
			dispatch(action);
		}).catch((err)=>{
			console.log(err);
		})
	}
}