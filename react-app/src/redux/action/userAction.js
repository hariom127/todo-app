import { Toast } from '../../components/sweetalert/swal'
import axios from '../../helper/axios'

import { UserActionTypes } from '../constant/user-action-type'

export const createUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: UserActionTypes.CREATE_USER_REQUEST })
    const res = await axios.post(`/users/create`, user)

    if (res.status === 200) {
      const payload = res.data.data
      dispatch({ type: UserActionTypes.CREATE_USER_SUCCESS, payload })
      const msg = res?.data?.message ? res?.data?.message : 'success'
      Toast.fire({
        icon: 'success',
        title: msg,
      })
    }
  } catch (error) {
    dispatch({
      type: UserActionTypes.CREATE_USER_FAILED,
      payload: error.message,
    })
    const msg = error?.response?.data?.message
      ? error?.response?.data?.message
      : 'Something went wrong!'
    Toast.fire({
      icon: 'error',
      title: msg,
    })
  }
}

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: UserActionTypes.GET_USER_REQUEST })
    const res = await axios.get(`/users/get-users`)

    if (res.status === 200) {
      const payload = res?.data.results || []
      dispatch({ type: UserActionTypes.GET_USER_SUCCESS, payload })
    }
  } catch (error) {
    console.log(error.message)
    dispatch({ type: UserActionTypes.GET_USER_FAILED, payload: error.message })
  }
}

export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: UserActionTypes.GET_SINGLE_USER_REQUEST })
    const res = await axios.get(`/users/get-user/${id}`)

    if (res.status === 200) {
      const payload = res?.data.results || {}
      dispatch({ type: UserActionTypes.GET_SINGLE_USER_SUCCESS, payload })
    }
  } catch (error) {
    dispatch({ type: UserActionTypes.GET_USER_FAILED, payload: error.message })
    const msg = error?.response?.data?.message
      ? error?.response?.data?.message
      : 'Something went wrong!'
    Toast.fire({
      icon: 'error',
      title: msg,
    })
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: UserActionTypes.DELETE_USER_REQUEST })
    const res = await axios.delete(`/users/delete-user/${id}`)

    if (res.status === 200) {
      const payload = res?.data.results || []
      dispatch({ type: UserActionTypes.DELETE_USER_SUCCESS, payload })
      dispatch(getUsers())
      const msg = res?.data?.message ? res?.data?.message : 'success'
      Toast.fire({
        icon: 'success',
        title: msg,
      })
    }
  } catch (error) {
    dispatch({
      type: UserActionTypes.DELETE_USER_FAILED,
      payload: error.message,
    })
    const msg = error?.response?.data?.message
      ? error?.response?.data?.message
      : 'Something went wrong!'
    Toast.fire({
      icon: 'error',
      title: msg,
    })
  }
}

export const updateUser = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: UserActionTypes.UPDATE_USER_REQUEST })
    const res = await axios.put(`/users/update-user`, reqData)

    if (res.status === 200) {
      dispatch({ type: UserActionTypes.UPDATE_USER_SUCCESS })
      dispatch(getUsers())
      const msg = res?.data?.message ? res?.data?.message : 'success'
      Toast.fire({
        icon: 'success',
        title: msg,
      })
    }
  } catch (error) {
    dispatch({
      type: UserActionTypes.UPDATE_USER_FAILED,
      payload: error.message,
    })
    const msg = error?.response?.data?.message
      ? error?.response?.data?.message
      : 'Something went wrong!'
    Toast.fire({
      icon: 'error',
      title: msg,
    })
  }
}
