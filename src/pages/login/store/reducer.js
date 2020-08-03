import { fromJS } from "immutable";
import { ACTION_SEND_ACCOUNT_AND_PASSWORD, ACTION_LOGOUT } from "./actionTypes";

const initialState = fromJS({
	loginState: false,
	account: "",
});

const reducer = (prevState = initialState, action) => {
	let newState;
	switch (action.type) {
		case ACTION_SEND_ACCOUNT_AND_PASSWORD:
			newState = prevState.merge({
				loginState: action.data.loginSuccess,
				account: action.account,
			});
			break;
		case ACTION_LOGOUT:
			newState = prevState.merge({ loginState: false, account: false });
			break;
		default:
			newState = prevState;
	}
	return newState;
};

export default reducer;
