import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {Container} from 'semantic-ui-react'
import Self from './self'
import Group from './group'

class Home extends Component {
    render() {
        return (
            <Container style={{marginTop: '60px', width: '90vw'}}>
                <Switch>
                    <Route path="/home" component={Self}/>
                    <Route path="/group" component={Group}/>
                    <Route component={Self}/>
                </Switch>
            </Container>
        )
    }
}

const mapState = state => {
    return {
        name: state.user.name
    }
}

export default connect(mapState)(Home)