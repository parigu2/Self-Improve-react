import axios from 'axios'

const initialState={};

const GET_USER_GOAL_TARGET = 'GET_USER_GOAL_TARGET'

const getSingleGoal = goal => ({type: GET_USER_GOAL_TARGET, goal})

export const getSingleGoalTarget = id => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:9999/join/user/${id}`)
        return dispatch(getSingleGoal(res.data))
    } catch (err) {
        console.error(err)
    }
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_USER_GOAL_TARGET:
            return {...state, goal: action.goal}
        default:
            return state
    }
}