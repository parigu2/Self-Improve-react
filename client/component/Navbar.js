import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../store'
import {Container, Menu, Dropdown, Image} from 'semantic-ui-react'

const Navbar = ({handleLogout, isLoggedIn, isAdmin, name}) => (
    <div>
        <div className="navBar"></div>
        <Menu fixed='top' inverted>
            {isLoggedIn ? (
                <Container>
                    {/* <Menu.Item as='a' header>
                        <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
                        자기계발
                    </Menu.Item> */}
                    {/* <Menu.Item><Link to='/home'>Home</Link></Menu.Item> */}
                    <Menu.Item>Hi, {name}</Menu.Item>
                    <Menu.Item as='a' onClick={handleLogout}>Sign out</Menu.Item>

                    <Dropdown item simple text='Dropdown'>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>Header Item</Dropdown.Header>
                            {
                                isAdmin ? (
                                    <Dropdown.Item>
                                        <i className='dropdown icon' />
                                        <span className='text'>Admin</span>
                                        <Dropdown.Menu>
                                            <Dropdown.Item><Link to='/admin/member' style={{color: 'black'}}>Members</Link></Dropdown.Item>
                                            <Dropdown.Item><Link to='/admin/goal' style={{color: 'black'}}>Goal</Link></Dropdown.Item>
                                            <Dropdown.Item>Achievement</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Item>
                                ) : (
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            ):(
                <Container>
                    <Menu.Item as='a' header>
                        <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
                        자기계발
                    </Menu.Item>
                </Container>
            )}
        </Menu>
    </div>
)

const mapState = state => {
    return {
      isLoggedIn: !!state.user.id,
      isAdmin: !!state.user.isAdmin,
      name: state.user.name
    }
}

const mapDispatch = dispatch => {
    return {
        handleLogout() {
            dispatch(logout())
        }
    }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    username: PropTypes.string
}