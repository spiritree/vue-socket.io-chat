import * as api from '../api'
import * as types from './mutation-types'

export const getAllMessages = ({ commit }) => {
  api.getAllMessages(messages => {
    commit(types.RECEIVE_ALL, {
      messages
    })
  })
}

export const sendMessage = ({ commit }, payload) => {
  api.createMessage(payload, message => {
    commit(types.RECEIVE_MESSAGE, {
      message
    })
  })
}

export const switchThread = ({ commit }, payload) => {
  commit(types.SWITCH_THREAD, payload)
}

export const addUserNumber = ({ commit }) => {
  commit(types.ADD_USERNUMBER)
}

export const updateUserNumber = ({ commit }, payload) => {
  commit(types.UPDATE_USERNUMBER, payload)
}

export const addUserName = ({ commit }, payload) => {
  commit(types.ADD_USERNAME, payload)
}

export const updateUserNameList = ({ commit }, payload) => {
  commit(types.UPDATE_USERNAMELIST, payload)
}