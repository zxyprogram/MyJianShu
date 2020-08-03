import {
	ACTION_GET_LIST,
	ACTION_GET_BANNER_INFO,
	ACTION_GET_BOARD_INFO,
	ACTION_GET_MORE_ARTICLE,
	ACTION_GET_QR_INFO,
	ACTION_GET_AUTHOR_LIST,
	ACTION_HANDLE_CHANGE_AUTHOR_LIST,
} from "./actionTypes";
import axios from "axios";
import splitData from "../../../common/header/splitData";

export const actionGetList = () => {
	return (dispatch) => {
		axios
			.get("/api/home/homeArticle.json")
			.then((res) => {
				const action = {
					type: ACTION_GET_LIST,
					data: res.data,
				};
				console.log(action);
				dispatch(action);
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const actionGetBannerInfo = () => {
	return async (dispatch) => {
		try {
			const result = await axios.get("/api/home/homeBanner.json");
			const action = {
				type: ACTION_GET_BANNER_INFO,
				data: result.data,
			};
			console.log(action);
			dispatch(action);
		} catch (err) {
			console.log(err);
		}
	};
};

export const actionGetBoardInfo = () => {
	return async (dispatch) => {
		try {
			const result = await axios.get("/api/home/homeBoard.json");
			const action = {
				type: ACTION_GET_BOARD_INFO,
				data: result.data,
			};
			dispatch(action);
		} catch (err) {
			console.log(err);
		}
	};
};

export const actionGetMore = (pageNum) => {
	return (dispatch) => {
		axios
			.get("/api/home/homeArticleMore.json?page=" + Number(pageNum + 1))
			.then(function (result) {
				const action = {
					type: ACTION_GET_MORE_ARTICLE,
					data: result.data,
					page: pageNum + 1,
				};
				dispatch(action);
			})
			.catch(function (err) {
				console.log(err);
			});
	};
};

export const actionGetQrInfo = () => {
	return (dispatch) => {
		axios
			.get("/api/home/homeQr.json")
			.then((result) => {
				const action = {
					type: ACTION_GET_QR_INFO,
					data: result.data,
				};
				dispatch(action);
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const actionGetAuthorList = () => {
	return (dispatch) => {
		axios
			.get("/api/home/authorList.json")
			.then((result) => {
				const dataList = splitData(result.data.list, 5);
				const action = {
					type: ACTION_GET_AUTHOR_LIST,
					dataList,
					succeed: result.data.succeed,
				};
				dispatch(action);
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const actionHandleChangeAuthorList = (authorPage) => {
	const action = {
		type: ACTION_HANDLE_CHANGE_AUTHOR_LIST,
		authorPage: authorPage + 1,
	};
	return action;
};
