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
        this.weeklyScoreCalculator = this.weeklyScoreCalculator.bind(this)
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

    weeklyScoreCalculator(timesheet, start='2019-07-15', to=new Date()) {
        const result = {};

        for (let i = 0; i < timesheet.length; i++) {
            if(timesheet[i].date > new Date(start).valueOf() && timesheet[i].date < new Date(to).valueOf()) {
                const between = new Date(timesheet[i].date).valueOf() - new Date(start).valueOf()
                const week = Math.ceil(between/604800000)
                result[week] ? result[week]+=timesheet[i].score : result[week]=timesheet[i].score
            }
        }
        return result;
    }

    totalScoreCalculator(timesheet, start='2019-07-15', to=new Date()) {
        return timesheet.reduce((first, current)=>{
            const from = new Date(start).valueOf()
            const end = new Date(to).valueOf()
            if (current.date > from && current.date < end) {
                return first + current.score
            } else {
                return first
            }
        }, 0)
    }

    percentageCalculator(score, target, start='2019-07-15', to=new Date()) {
        const between = new Date(to).valueOf() - new Date(start).valueOf()
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
                                        {Object.keys(this.weeklyScoreCalculator(list.timesheet)).map(week=>{
                                            return (<p key={week}>week: {week}, score: {this.weeklyScoreCalculator(list.timesheet)[week]}</p>)
                                        })}
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