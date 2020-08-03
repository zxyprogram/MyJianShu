import { fromJS } from "immutable";
import {
	ACTION_GET_LIST,
	ACTION_GET_BANNER_INFO,
	ACTION_GET_BOARD_INFO,
	ACTION_GET_MORE_ARTICLE,
	ACTION_GET_QR_INFO,
	ACTION_GET_AUTHOR_LIST,
	ACTION_HANDLE_CHANGE_AUTHOR_LIST,
} from "./actionTypes";

const initialState = fromJS({
	articleSucceed: true,
	list: [],
	bannerSucceed: true,
	bannerUrl: "",
	bannerHref: "#",
	boardList: [],
	page: 1,
	qrUrl: "",
	qrHref: "",
	authorList: [],
	authorPage: 0,
	authorSucceed: true,
	authorShowList: [],
	homeTitle:"简书-创作你的创作",
});
const reducer = (prevState = initialState, action) => {
	let newState = prevState;
	switch (action.type) {
		case ACTION_GET_LIST:
			newState = newState.merge({
				articleSucceed: fromJS(action.data.succeed),
				list: fromJS(action.data.list),
			});
			break;
		case ACTION_GET_BANNER_INFO:
			newState = newState.merge({
				bannerSucceed: fromJS(action.data.succeed),
				bannerUrl: fromJS(action.data.bannerUrl),
				bannerHref: fromJS(action.data.bannerHref),
			});
			break;
		case ACTION_GET_BOARD_INFO:
			newState = newState.set("boardList", fromJS(action.data));
			break;
		case ACTION_GET_MORE_ARTICLE:
			const newList = newState
				.get("list")
				.toJS()
				.concat(action.data.list);
			newState = newState.merge({
				list: fromJS(newList),
				page: action.page,
			});

			break;
		case ACTION_GET_QR_INFO:
			newState = newState.merge({
				qrUrl: fromJS(action.data.qrUrl),
				qrHref: fromJS(action.data.qrHref),
			});
			break;
		case ACTION_GET_AUTHOR_LIST:
			newState = newState.merge({
				authorList: fromJS(action.dataList),
				authorSucceed: fromJS(action.succeed),
				authorShowList: fromJS(action.dataList[0]),
			});
			break;
		case ACTION_HANDLE_CHANGE_AUTHOR_LIST:
			console.log(action);
			let authorPage = 0;
			if(action.authorPage  < newState.get("authorList").size){
				console.log('haha')
				authorPage = action.authorPage
			}
			newState = newState.merge({
				authorShowList:newState.get("authorList").get(authorPage),
				authorPage,
			});
			break;
		default:
	}
	return newState;
};

export default reducer;
