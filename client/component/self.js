import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleGoalTarget} from '../store'
import {Grid, Table, Icon, Header} from 'semantic-ui-react'

class Self extends Component {
    constructor() {
        super()
        this.state = {
            score: 0,
            percent: 0,
            weeks: [],
            week: 1
        }
        this.presentNumber = this.presentNumber.bind(this)
        this.weeklyScoreCalculator = this.weeklyScoreCalculator.bind(this)
        this.totalScoreCalculator = this.totalScoreCalculator.bind(this)
        this.percentageCalculator = this.percentageCalculator.bind(this)
        this.totalPercent = this.totalPercent.bind(this)
        this.notice = this.notice.bind(this)
        this.noticeHeader = this.noticeHeader.bind(this)
        this.maxLimit = this.maxLimit.bind(this)
    }

    componentDidMount() {
        this.props.getGoalTarget(this.props.id).then(()=>{
            this.presentNumber();
            this.totalPercent();
        })
        const between = new Date('2019-09-22').valueOf() - new Date('2019-07-15').valueOf()+1
        const week = Math.ceil(between/604800000)
        const result = [];
        for (let i = 1; i < week+1; i++) {
            result.push(i)
        }
        const betweenWeek = new Date('2019-07-29').valueOf() - new Date('2019-07-15').valueOf()+1
        const weekWeek = Math.ceil(betweenWeek/604800000)
        this.setState({weeks: result, week: weekWeek})
    }
    
    presentNumber() {
        const totalScore = document.querySelectorAll('#calculate') || []
        let score = 0
        let percent = 0
        totalScore.forEach(ele=>{
            score += parseFloat(ele.dataset.score),
            percent += parseFloat(ele.dataset.percent)
        })
        percent = percent/this.state.weeks.length/this.props.goal.length;
        percent = percent.toFixed(2)
        this.setState({score, percent})
    }

    weeklyScoreCalculator(timesheet=[], start='2019-07-15', to=new Date()) {
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

    percentageCalculator(score, target, start='2019-07-15', to=new Date('2019-07-30')) {
        const between = new Date(to).valueOf() - new Date(start).valueOf()
        const week = Math.ceil(between/604800000)
        return this.maxLimit(((score / target) / week * 100).toFixed(2))
    }

    totalPercent() {
        const totalPercent = document.querySelectorAll('#byGoal')
        if (totalPercent.length < 1) totalPercent = [];
        let percent = 0;
        totalPercent.forEach(ele=>{
            percent += parseFloat(ele.dataset.percent)
        })
        document.querySelector('#result').innerHTML = (percent/totalPercent.length).toFixed(2) + '%'
    }

    notice(score, target) {
        const rate = score/target
        if (rate >= 0.95) {
            return 'positive'
        } else if(rate >= 0.75 && rate < 0.85) {
            return 'warning'
        } else {
            return 'negative'
        }
    }

    noticeHeader(condition) {
        if(condition === 'positive') {
            return 'green'
        } else if (condition === 'warning') {
            return 'yellow'
        } else if (condition === 'negative')
            return 'red'
    }

    maxLimit(number) {
        return number > 120 ? 120 : number
    }

    render() {
        const {goal, name} = this.props
        const weeks = this.state.weeks
        return (
            <div>
                <Header as='h1'>Your Goal! {name}</Header>

                <Grid.Column width={16}>
                    <Table celled structured>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell rowSpan='2'>Goal</Table.HeaderCell>
                                <Table.HeaderCell rowSpan='2'>Target</Table.HeaderCell>
                                <Table.HeaderCell colSpan={weeks.length}>Week</Table.HeaderCell>
                                <Table.HeaderCell rowSpan='2'>Score</Table.HeaderCell>
                                <Table.HeaderCell rowSpan='2'>Percent</Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                {weeks.map(week=>{return (<Table.HeaderCell key={week}>{week}</Table.HeaderCell>)})}
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {goal && goal.map(list=>{
                                return (
                                    <Table.Row key={list.id}>
                                        <Table.Cell>{list.goal}</Table.Cell>
                                        <Table.Cell textAlign='right'>{list.target}</Table.Cell>
                                            {weeks.map(week=>{
                                                if(week <= this.state.week) {
                                                    return(<Table.Cell key={week} className={this.notice(this.weeklyScoreCalculator(list.timesheet)[week], list.target)} id="calculate" data-score={this.weeklyScoreCalculator(list.timesheet)[week] || 0} data-percent={this.maxLimit((this.weeklyScoreCalculator(list.timesheet)[week]*100/list.target) || 0)}>{this.weeklyScoreCalculator(list.timesheet)[week] || 0} / {(this.maxLimit((this.weeklyScoreCalculator(list.timesheet)[week]*100/list.target))|| 0).toFixed(2)}%</Table.Cell>)
                                                } else {
                                                    return(<Table.Cell key={week}>-</Table.Cell>)
                                                }
                                            })}
                                        <Table.Cell>{this.totalScoreCalculator(list.timesheet)}</Table.Cell>
                                        <Table.Cell id="byGoal" data-percent={this.percentageCalculator(this.totalScoreCalculator(list.timesheet), list.target)}>{this.percentageCalculator(this.totalScoreCalculator(list.timesheet), list.target)+'%'}</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={weeks.length+2}><Header as='h3'>Total</Header></Table.HeaderCell>
                                <Table.HeaderCell><Header as='h3'>{this.state.score}</Header></Table.HeaderCell>
                                <Table.HeaderCell className={this.notice(this.state.percent, 100)}><Header as='h3' className={this.noticeHeader(this.notice(this.state.percent, 100))} id="result"></Header></Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Grid.Column>
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