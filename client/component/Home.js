import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleGoalTarget} from '../store'

class Home extends Component {
    componentDidMount() {
        this.props.getGoalTarget(this.props.id)
    }

    render() {
        const {goal} = this.props
        return (
            <div>
                <h2>Main Page</h2>
                <h3>Your Goal</h3>
                {goal && goal.map(list=>{
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
    }
}

const mapState = state => {
    return {
        id: state.user.id,
        goal: state.goal.goal
    }
}

const mapDispatch = dispatch => {
    return {
        getGoalTarget: id => dispatch(getSingleGoalTarget(id))
    }
}

export default connect(mapState, mapDispatch)(Home)