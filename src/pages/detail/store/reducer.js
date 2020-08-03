import { fromJS } from "immutable";
import { ACTION_GET_DETAIL_INFO ,ACTION_CHANGE_OTHER_SHOW,ACTION_OTHER_HIDE, ACTION_LIKE_ADD,ACTION_LIKE_CANCEL,ACTION_DISLIKE_ADD,ACTION_DISLIKE_CANCEL,ACTION_GET_MONEY_INFO} from "./actionTypes";

const initialState = fromJS({
	succeed: true,
	authorInfo: {asset:{}},
	articleHtml: "",
	articleInfo: {},
	rewardInfo:{rewardText:"你的每一次赞赏，是我前进的动力",rewardList:[]},
	moneyInfo:{}
});

const reducer = (prevState = initialState, action) => {
	let newState = prevState;
	switch (action.type) {
		case ACTION_GET_DETAIL_INFO:
			newState = prevState.merge({
				authorInfo: fromJS(action.data.authorInfo),
				articleHtml: fromJS(action.data.articleHtml),
				articleInfo: fromJS(action.data.articleInfo),
				rewardInfo: fromJS(action.data.rewardInfo),
            });
            console.log(newState);
			break;
		case ACTION_CHANGE_OTHER_SHOW:
			let hideState = prevState.getIn(["articleInfo","hide"]);
			newState = prevState.setIn(["articleInfo","hide"],!hideState);
		break;
		case ACTION_LIKE_ADD:
			newState = prevState.setIn(["articleInfo","likes"],prevState.getIn(["articleInfo","likes"])+1);
		break;
		case ACTION_LIKE_CANCEL:
			newState = prevState.setIn(["articleInfo","likes"],prevState.getIn(["articleInfo","likes"])-1);
		break;
		case ACTION_OTHER_HIDE:
			newState = prevState.setIn(["articleInfo","hide"],true);
		break;
		case ACTION_DISLIKE_ADD:
			
		break;
		case ACTION_DISLIKE_CANCEL:
			
		break;
		case ACTION_GET_MONEY_INFO:
			newState = prevState.set("moneyInfo",fromJS(action.data));
		break;
		default:
	}
	return newState;
};

export default reducer;
