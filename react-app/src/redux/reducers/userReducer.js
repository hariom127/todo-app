import { UserActionTypes } from '../constant/user-action-type'

const initialState = {
  location: false,
  redirectTo: false,
}
// (state, action) --------destructure action------> (state, {type, payload})  -----------
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserActionTypes.CREATE_USER_REQUEST:
      return (state = { ...state, loading: true })
    case UserActionTypes.CREATE_USER_SUCCESS:
      return (state = {
        ...state,
        users: payload,
        loading: false,
      })
    case UserActionTypes.CREATE_USER_FAILED:
      return {
        ...state,
        error: payload,
        message: payload,
        loading: false,
      }
    case UserActionTypes.GET_USER_REQUEST:
      return (state = { ...state, loading: true })
    case UserActionTypes.GET_USER_SUCCESS:
      return (state = {
        ...state,
        users: payload,
        loading: false,
      })
    case UserActionTypes.GET_USER_FAILED:
      return {
        ...state,
        error: payload,
        message: payload,
        loading: false,
      }

    case UserActionTypes.GET_SINGLE_USER_REQUEST:
      return (state = { ...state, loading: true })
    case UserActionTypes.GET_SINGLE_USER_SUCCESS:
      return (state = {
        ...state,
        users: payload,
        loading: false,
      })
    case UserActionTypes.GET_SINGLE_USER_FAILED:
      return {
        ...state,
        error: payload,
        message: payload,
        loading: false,
      }
    case UserActionTypes.UPDATE_USER_REQUEST:
      return (state = { ...state, loading: true })
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return (state = {
        ...state,
        users: payload,
        loading: false,
      })
    case UserActionTypes.UPDATE_USER_FAILED:
      return {
        ...state,
        error: payload,
        message: payload,
        loading: false,
      }

    default:
      return state
  }
}
