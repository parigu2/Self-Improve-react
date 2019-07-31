import axios from 'axios'

const initialState={};

const GET_ALL_USER = 'GET_ALL_USER';
const GET_ALL_USER_GOAL = 'GET_ALL_USER_GOAL';

const getAllUser = users => ({type: GET_ALL_USER, users})
const getAllUserGoal = userGoal => ({type: GET_ALL_USER_GOAL, userGoal})

export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get('https://selfimprovement.cfapps.io/getUser')
        return dispatch(getAllUser(res.data))
    } catch (err) {
        console.error(err)
    }
}

export const getUsersGoals = () => async dispatch => {
    try {
        const res = await axios.get('https://selfimprovement.cfapps.io/goal/getGoalList')
        return dispatch(getAllUserGoal(res.data))
    } catch (err) {
        console.error(err)
    }
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_ALL_USER:
            return {...state, users: action.users}
        case GET_ALL_USER_GOAL:
            return {...state, goals: action.userGoal}
        default:
            return state
    }
}