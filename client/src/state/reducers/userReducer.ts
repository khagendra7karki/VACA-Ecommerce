import { ActionType } from "../action-types";
import { Action } from "../actions/index";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") || "{}")
  : null;

const registerReducer = (
  state = {
    hasJustRegistered: false,
    error: null,
    loading: false,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionType.USER_REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionType.USER_REGISTER_SUCCESS:
      return {
        ...state,
        hasJustRegistered: true,
        loading: false,
        error: null,
      };
    case ActionType.USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const loginReducer = (
  state = {
    isLoggedIn: userInfoFromStorage ? true : false ,
    error: null,
    loading: false,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionType.USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    case ActionType.USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ActionType.USER_LOGOUT:
      return { ...state, isLoggedIn: false, loading: false, error: null };
    default:
      return state;
  }
};

const getUserReducer = (
  state = {
    userInfo: userInfoFromStorage,
    error: null,
    loading: false,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionType.GET_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionType.GET_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      };
    case ActionType.GET_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const updateProfileReducer = (
  state = {
    profileUpdate: {},
    error: null,
    loading: false,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionType.UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionType.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profileUpdate: action.payload,
        loading: false,
        error: null,
      };
    case ActionType.UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionType.UPDATE_PROFILE_RESET:
      return {
        ...state,
        loading: false,
        profileUpdate: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

const updateUserReducer = (
  state = {
    userUpdate: {},
    error: null,
    loading: false,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionType.UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionType.UPDATE_USER_SUCCESS:
      return {
        ...state,
        userUpdate: action.payload,
        loading: false,
        error: null,
      };
    case ActionType.UPDATE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionType.UPDATE_PROFILE_RESET:
      return {
        ...state,
        loading: false,
        userUpdate: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

const getUserReview = (state = { 
    userReview: [] as Array<any>,
    error: null, 
    loading: false,
  },
  action: Action
) =>{
  switch( action.type ){
    case ActionType.GET_USER_REVIEW_REQUEST:
      return { ...state, loading: true, error: null}
    case ActionType.GET_USER_REVIEW_SUCCESS:
      return { ...state, userReview: action.payload, loading: false, error: null }
    case ActionType.GET_USER_REVIEW_FAIL:
      return { ...state, userReview: [], loading: false, error: action.payload }
    default: 
      return state
  }
}

// const updateUserReview
// const 
export {
  registerReducer,
  loginReducer,
  getUserReducer,
  updateProfileReducer,
  updateUserReducer,
  getUserReview,
};
