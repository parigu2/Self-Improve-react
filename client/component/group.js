import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllGoalsTargets} from '../store'

class Group extends Component {
    componentDidMount() {
        this.props.getAllGoal();
    }

    render() {
        const {goals} = this.props

        return (
            <div>
                <h3>Group Goals</h3>
                {goals && goals.map(user=>{
                    return (
                        <div key={user.id}>
                            <p>{user.name}</p>
                            {user.details.map(list=>{
                                return (
                                    <div key={list.id}>
                                        <p>{list.goal}</p>
                                        <p>{list.target}</p>
                                        {list.timesheet.map(time=>{
                                            return (
                                                <p key={time.id}>score: {time.score}</p>
                                            )
                                        })}
                                    </div>
                                )    
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapState = state => {
    return {
        goals: state.goal.goals
    }
}

const mapDispatch = dispatch => {
    return {
        getAllGoal: () => dispatch(getAllGoalsTargets())
    }
}

export default connect(mapState, mapDispatch)(Group)