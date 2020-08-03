import { actionTypes } from "./index";
import axios from "axios";
import { fromJS } from "immutable";
import splitData from "../splitData";

export function actionInputActive() {
  return {
    type: actionTypes.INPUT_ACTIVE,
  };
}

export function actionInputBlur() {
  return {
    type: actionTypes.INPUT_BLUR,
  };
}

export function changeSearchList() {
  return {
    type: actionTypes.CHANGE_LIST,
  };
}

export function mouseIn() {
  return {
    type: actionTypes.MOUSE_IN,
  };
}

export function mouseLeave() {
  return {
    type: actionTypes.MOUSE_LEAVE,
  };
}

export function getSearchTips() {
  return function (dispatch) {
    axios
      .get("/api/searchTip.json")
      .then(function (data) {
        const dataList = fromJS(splitData(data.data.data, 4));
        const action = {
          type: actionTypes.GET_SEARCH_TIPS,
          dataList,
        };
        dispatch(action);
      })
      .catch(function (e) {
        console.log(e);
      });
  };
}

