import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Message, Table, Icon, Menu} from 'semantic-ui-react'
import {getUsersGoals} from '../../store'

class AdminGoal extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.getAllGoals();
    }

    render() {
        const {goals} = this.props
        return (
            <div>
                <Container>
                    <h2 className="pageTitle">Admin Page</h2>
                    <Message attached='top' header='Goals' icon='folder open' info />
                    <Table attached>
                        <Table.Header>
                            <Table.HeaderCell>Member</Table.HeaderCell>
                            <Table.HeaderCell>Target</Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            {goals && (goals.map(member=>{
                                return (
                                    <Table.Row key={member.id}>
                                        <Table.Cell>{member.name}</Table.Cell>
                                        {member.goals.map(goal=>{
                                            return (
                                                <Table.Row key={goal.id}>
                                                    <Table.Cell>{goal.goal} : {goal.target}</Table.Cell>
                                                </Table.Row>
                                            ) 
                                        })}
                                    </Table.Row>
                                )})
                            )}
                        </Table.Body>
                    </Table>
                    <Menu attached='bottom' compact widths={2}>
                        <Menu.Item as='a'>Edit</Menu.Item>
                        <Menu.Item as='a'>Delete</Menu.Item>
                    </Menu>
                </Container>
            </div>
        )
    }
}

const mapState = state => {
    return {
        goals: state.member.goals
    }
}

const mapDispatch = dispatch => {
    return {
        getAllGoals: () => {dispatch(getUsersGoals())}
    }
}

export default connect(mapState, mapDispatch)(AdminGoal)