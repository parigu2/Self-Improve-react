import axios from 'axios'
import history from '../history'

const initialState = {};

const GET_USER = 'GET_USER';
const LOG_IN = "LOG_IN";

const getUser = user => ({type: GET_USER, user})

const logIn = user => ({
    type: LOG_IN,
    user
})

export const me = () => async dispatch => {
    try {
        const res = await axios.get('/auth/me')
        dispatch(getUser(res.data || initialState))
    } catch (err) {
        console.error(err)
    }
}

export const auth = user => async dispatch => {
    try {
        dispatch(logIn(user))
    } catch (err) {
        console.error(err)
    }
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_USER:
            return action.user
        case LOG_IN:
            return action.user
        default:
            return state
    }
}