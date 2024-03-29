import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../../store'
import {Container, Message, Table, Menu, Icon, Button} from 'semantic-ui-react'

class AdminMember extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.getAllMember()
    }

    render() {
        const {members} = this.props
        return (
            <div>
                <Container>
                    <h2 className="pageTitle">Admin Page</h2>
                    <Message attached='top' header='Members' icon='user' info />
                    <Table attached>
                        <Table.Header>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Password</Table.HeaderCell>
                            <Table.HeaderCell>Admin</Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            {members && (members.map(member=>{
                                return (
                                    <Table.Row key={member.id}>
                                        <Table.Cell>{member.name}</Table.Cell>
                                        <Table.Cell>{member.password}</Table.Cell>
                                        <Table.Cell>{member.admin ? <Icon color='green' name='checkmark' size='large'/>: <Icon name='x'/>}</Table.Cell>
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
        members: state.member.users
    }
}

const mapDispatch = dispatch => {
    return {
        getAllMember: () => {dispatch(getUsers())}
    }
}

export default connect(mapState, mapDispatch)(AdminMember)