import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleGoalTarget} from '../store'

class Self extends Component {
    constructor() {
        super()
        this.state = {
            score: 0,
            percent: 0,
            weeks: []
        }
        this.presentNumber = this.presentNumber.bind(this)
        this.weeklyScoreCalculator = this.weeklyScoreCalculator.bind(this)
        this.totalScoreCalculator = this.totalScoreCalculator.bind(this)
        this.percentageCalculator = this.percentageCalculator.bind(this)
    }

    componentDidMount() {
        this.props.getGoalTarget(this.props.id).then(()=>{
            this.presentNumber();
        })
    }
    
    presentNumber() {
        const totalScore = document.querySelectorAll('#calculate') || []
        let score = 0
        let percent = 0
        totalScore.forEach(ele=>{
            score += parseInt(ele.dataset.score),
            percent += parseInt(ele.dataset.percent)
        })
        percent = percent.toFixed(2)
        this.setState({score, percent})
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
        const {goal, name} = this.props
        return (
            <div>
                <h3>Your Goal {name}</h3>
                {goal && goal.map(list=>{
                    return (
                        <div key={list.id}>
                            <p>{list.goal}</p>
                            <p>{list.target}</p>
                            {Object.keys(this.weeklyScoreCalculator(list.timesheet)).map(week=>{
                                return (<p key={week}>week: {week}, score: {this.weeklyScoreCalculator(list.timesheet)[week]}</p>)
                            })}
                            <p id="calculate" data-score={this.totalScoreCalculator(list.timesheet)} data-percent={this.percentageCalculator(this.totalScoreCalculator(list.timesheet), list.target)}>score {this.totalScoreCalculator(list.timesheet)} and percent {this.percentageCalculator(this.totalScoreCalculator(list.timesheet), list.target)+'%'}</p>
                        </div>
                    )
                })}
                <h3>Total:</h3>
                score: {this.state.score} percent: {this.state.percent + '%'}
            </div>
        )
    }
}

const mapState = state => {
    return {
        id: state.user.id,
        name: state.user.name,
        goal: state.goal.goal
    }
}

const mapDispatch = dispatch => {
    return {
        getGoalTarget: id => dispatch(getSingleGoalTarget(id))
    }
}

export default connect(mapState, mapDispatch)(Self)