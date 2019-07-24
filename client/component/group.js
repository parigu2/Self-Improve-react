import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllGoalsTargets} from '../store'
import {Grid, Table, Header} from 'semantic-ui-react'

class Group extends Component {
    constructor() {
        super()
        this.state = {
            result: undefined,
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
        this.props.getAllGoal().then(()=>{
            this.presentNumber();
            this.totalPercent();
        });
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
        const result = {}
        this.props.goals.map(user=>{
            const totalScore = document.querySelectorAll(`#${user.name}calculate`) || []
            let name = user.name
            let score = 0
            let percent = 0
            totalScore.forEach(ele=>{
                score += parseFloat(ele.dataset.score),
                percent += parseFloat(ele.dataset.percent)
            })
            percent = percent/this.state.week/user.details.length
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

    totalScoreCalculator(timesheet, start='2019-07-15', to=new Date('2019-07-30')) {
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
        return (this.maxLimit(score * 100/target)/week).toFixed(2)
    }

    totalPercent() {
        this.props.goals.map(user=>{
            let totalPercent = document.querySelectorAll(`#${user.name}byGoal`)
            if (totalPercent.length < 1) totalPercent = [];
            let percent = 0;
            totalPercent.forEach(ele=>{
                percent += parseFloat(ele.dataset.percent)
            })
            document.querySelector(`#${user.name}result`).innerHTML = (percent/(totalPercent.length || 1)).toFixed(2) + '%'
        })
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
        const {goals} = this.props
        const {weeks, result} = this.state
        return (
            <div>
                <Header as='h1'>Members</Header>

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

                            {goals && goals.map(user=>{
                                return (
                                    <Table.Body key={user.id}>
                                        {user.details.map(list=>{
                                            return (
                                                <Table.Row key={list.id}>
                                                    <Table.Cell>{list.goal}</Table.Cell>
                                                    <Table.Cell textAlign='right'>{list.target}</Table.Cell>
                                                        {weeks.map(week=>{
                                                            if(week <= this.state.week) {
                                                                return(<Table.Cell key={week} selectable textAlign='center' className={this.notice(this.weeklyScoreCalculator(list.timesheet)[week], list.target)} id={`${user.name}calculate`} data-score={this.weeklyScoreCalculator(list.timesheet)[week] || 0} data-percent={this.maxLimit((this.weeklyScoreCalculator(list.timesheet)[week]*100/list.target) || 0)}>{this.weeklyScoreCalculator(list.timesheet)[week] || 0} / {(this.maxLimit((this.weeklyScoreCalculator(list.timesheet)[week]*100/list.target))|| 0).toFixed(2)}%</Table.Cell>)
                                                            } else {
                                                                return(<Table.Cell key={week}>-</Table.Cell>)
                                                            }
                                                        })}
                                                    <Table.Cell textAlign='center'>{this.totalScoreCalculator(list.timesheet)}</Table.Cell>
                                                    <Table.Cell id={`${user.name}byGoal`} textAlign='center' data-percent={this.percentageCalculator(this.totalScoreCalculator(list.timesheet), list.target)}>{this.percentageCalculator(this.totalScoreCalculator(list.timesheet), list.target)+'%'}</Table.Cell>
                                                </Table.Row>
                                            )
                                        })}
                                        {result && (
                                            <Table.Row>
                                                <Table.Cell active colSpan={weeks.length+2} textAlign='right'><Header as='h3' style={{margin: '0.1em'}}>{user.name}</Header></Table.Cell>
                                                <Table.Cell textAlign='center'><Header as='h3' style={{margin: '0.1em'}}>{result[user.name].score}</Header></Table.Cell>
                                                <Table.Cell className={this.notice(result[user.name].percent, 100)} textAlign='center'><Header as='h3' style={{margin: '0.1em'}} className={this.noticeHeader(this.notice(result[user.name].percent, 100))} id={`${user.name}result`}></Header></Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                )
                            })}
                    </Table>
                </Grid.Column>
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