import { ACTION_SEND_ACCOUNT_AND_PASSWORD ,ACTION_LOGOUT} from "./actionTypes";
import axios from "axios";

export const actionLogin = (account, password) => {
	return (dispatch) => {
		axios
			.get(
				`/api/user/userInfo.json?account=${account}&password=${password}`
			)
			.then((result) => {
				const action = {
					type: ACTION_SEND_ACCOUNT_AND_PASSWORD,
					data: result.data,
					account
				};
				dispatch(action);
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export function actionLogout(){
	return{
		type: ACTION_LOGOUT,
	}
  }