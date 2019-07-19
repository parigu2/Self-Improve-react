import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTpyes from 'prop-types'
import {me} from './store'

import {Login, Home} from './component'

class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
        const {isLoggedIn} = this.props

        return (
            <Switch>
                <Route path='/login' component={Login}/>
                {isLoggedIn && (
                    <Switch>
                        <Route path='/home' component={Home}/>
                    </Switch>
                )}
                <Route component={Login}/>
            </Switch>
        )
    }
}

const mapState = state => {
    return {
        isLoggedIn: !!state.user.id
    }
}

const mapDispatch = dispatch => {
    return {
        loadInitialData() {
            dispatch(me())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
    loadInitialData: PropTpyes.func.isRequired,
    isLoggedIn: PropTpyes.bool.isRequired
}