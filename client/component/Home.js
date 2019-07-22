import React, {Component} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Menu, Label} from 'semantic-ui-react'
import Self from './self'
import Group from './group'

class Home extends Component {
    state = {activeItem: ''}

    handleItemClick = (e, {name}) => {
        this.props.history.push(`/${name}`)
        this.setState({activeItem: name})
    }

    componentDidMount() {
        this.setState({activeItem: this.props.name})
    }

    render() {
        const {name} = this.props
        const {activeItem} = this.state
        return (
            <div>
                <h2>Main Page</h2>
                <Menu vertical>
                    <Menu.Item name={name} active={activeItem === name} onClick={this.handleItemClick}>
                        <Label color='teal'>1</Label>
                        {name}
                    </Menu.Item>
                    <Menu.Item name='group' active={activeItem === 'group'} onClick={this.handleItemClick}>
                        <Label>51</Label>
                        Group
                    </Menu.Item>
                </Menu>
                <Switch>
                    <Route path="/home" component={Self}/>
                    <Route path="/group" component={Group}/>
                    <Route component={Self}/>
                </Switch>
            </div>
        )
    }
}

const mapState = state => {
    return {
        name: state.user.name
    }
}

export default connect(mapState)(Home)