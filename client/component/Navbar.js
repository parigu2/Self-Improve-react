import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Container, Menu, Dropdown, Image} from 'semantic-ui-react'

const Navbar = (isLoggedIn) => (
    <div>
        <h1>nav bar</h1>
        <nav>
            <Link to='/login'>Log-in</Link>
            <Link to='/home'>Home</Link>
        </nav>
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
                    자기계발
                </Menu.Item>
                <Menu.Item><Link to='/home'>Home</Link></Menu.Item>

                <Dropdown item simple text='Dropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                            <i className='dropdown icon' />
                            <span className='text'>Submenu</span>
                            <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Menu>
    </div>
)

const mapState = state => {
    return {
      isLoggedIn: !!state.user.id
    }
}

export default connect(mapState, null)(Navbar)

// Navbar.propTypes = {
//     isLoggedIn: PropTypes.bool.isRequired
// }