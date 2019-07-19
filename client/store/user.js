import axios from 'axios'

const initialState={};

const GET_ALL_USER = 'GET_ALL_USER';

const getAllUser = users => ({type: GET_ALL_USER, users})

export const getUsers =() => async dispatch => {
    try {
        const res = await axios.get('http://localhost:9999/getUser')
        return dispatch(getAllUser(res.data))
    } catch (err) {
        console.error(err)
    }
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_ALL_USER:
            return {...state, users: action.users}
        default:
            return state
    }
}