import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllGoalsTargets} from '../store'

class Group extends Component {
    constructor() {
        super()
        this.state = {
            result: undefined
        }
        this.presentNumber = this.presentNumber.bind(this)
        this.totalScoreCalculator = this.totalScoreCalculator.bind(this)
        this.percentageCalculator = this.percentageCalculator.bind(this)
    }

    componentDidMount() {
        this.props.getAllGoal().then(()=>{
            this.presentNumber()
        });
    }

    presentNumber() {
        const result = {}
        this.props.goals.map(user=>{
            const totalScore = document.querySelectorAll(`#${user.name}calculate`) || []
            let name = user.name
            let score = 0
            let percent = 0
            totalScore.forEach(ele=>{
                score += parseInt(ele.dataset.score),
                percent += parseInt(ele.dataset.percent)
            })
            percent = percent.toFixed(2)
            result[name] = {score, percent}
        })
        this.setState({result})
    }

    totalScoreCalculator(timesheet) {
        return timesheet.reduce((first, current)=>{
            const from = new Date('2019-07-15').valueOf()
            const end = new Date('2019-07-29').valueOf()
            if (current.date > from && current.date < end) {
                return first + current.score
            } else {
                return first
            }
        }, 0)
    }

    percentageCalculator(score, target) {
        const between = new Date('2019-07-29').valueOf() - new Date('2019-07-15').valueOf()
        const week = Math.ceil(between/604800000)
        return ((score / target) / week * 100).toFixed(2)
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
                                        <p id={`${user.name}calculate`} data-score={this.totalScoreCalculator(list.timesheet)} data-percent={this.percentageCalculator(this.totalScoreCalculator(list.timesheet), list.target)}>score {this.totalScoreCalculator(list.timesheet)} and percent {this.percentageCalculator(this.totalScoreCalculator(list.timesheet), list.target)+'%'}</p>
                                    </div>
                                )    
                            })}
                            <h3>Total {user.name}:</h3>
                            {this.state.result && (
                               <p>score: {this.state.result[user.name].score} percent: {this.state.result[user.name].percent + '%'}</p>
                            )}
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