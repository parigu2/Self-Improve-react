import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTpyes from 'prop-types'
import {me} from './store'

import {Login, Home, Group} from './component'
import {AdminMember, AdminGoal} from './component/admin'

class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
        const {isLoggedIn, isAdmin} = this.props

        return (
            <Switch>
                <Route path='/login' component={Login}/>
                {isLoggedIn && (
                    <Switch>
                        <Route path='/home' component={Home}/>
                        {isAdmin && (
                            <Switch>
                                <Route path='/admin/member' component={AdminMember}/>
                                <Route path='/admin/goal' component={AdminGoal}/>
                            </Switch>
                        )}
                        <Route component={Home}/>
                    </Switch>
                )}
                <Route component={Login}/>
            </Switch>
        )
    }
}

const mapState = state => {
    return {
        isLoggedIn: !!state.user.name,
        isAdmin: !!state.user.isAdmin
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
    isLoggedIn: PropTpyes.bool.isRequired,
    isAdmin: PropTpyes.bool.isRequired
}