import React from 'react'
import {Link }from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

class CustomHeader extends React.Component {
        constructor(props) {
        super(props);
        this.state = { username: null };
        }
    componentDidMount() {
    if (localStorage.getItem('username')) {
        this.setState({ username: localStorage.getItem('username') });
        this.setState({ usertype: localStorage.getItem('usertype') });
        this.setState({ userid: localStorage.getItem('userid') });
        }
            }
    handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('usertype');
        localStorage.removeItem('userid');
        this.setState({ username: null });
        }
        
        render() {
        return (
        <div>
            <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
                <a href="https://javaguides.net" className="navbar-brand">
                Management System
                </a>
            </div>
        <div>
            {this.state.username ? (
                <Link
                to="/Login" style={{ marginLeft: "auto", marginRight: "10px" }}
                className="btn btn-danger"  onClick={this.handleLogout}>Logout</Link>) : 
                (<Link to="/login" style={{ marginLeft: "auto", marginRight: "10px" }}
                className="btn btn-primary" onClick={this.handleLogout}>Login</Link>)
                }
            </div>
            </nav>
            </header>
        </div>
        );
        }
        }
export default CustomHeader;