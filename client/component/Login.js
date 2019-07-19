import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const Login = props => {
    const {handleSubmit, error} = props
    return (
        <Grid textAlign='center' style={{ height: '60vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='/logo.png' /> Log-in to your account
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' name="username" placeholder='E-mail address' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            name="password"
                            placeholder='Password'
                            type='password'
                        />
                        <Button color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
                {error ? <Message negative header={error} list={['Check your password', 'Otherwise, contact to MinQ']} style={{textAlign: 'left'}}></Message>: <div></div>}
            </Grid.Column>
        </Grid>
    )
}

const mapState = state => {
    return {
        error: state.user.error
    }
}

const mapdispatch = dispatch => {
    return {
        handleSubmit(evt) {
            evt.preventDefault()
            const name = evt.target.username.value
            const password = evt.target.password.value
            dispatch(auth(name, password))
        }
    }
}

export default connect(mapState, mapdispatch)(Login)

Login.prototype = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.object
}