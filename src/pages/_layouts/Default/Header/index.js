import React, { useContext } from 'react';
import { FaHome, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../../../services/api';
import history from '../../../../services/history';
import { Context } from '../../../../contexts/AuthContext';
import { Container, Content } from './styles';
import logoBlue from '../../../../assets/logo-blue.png';

export default function Header() {
    const { setAuthenticated, profileInfo, headerTab } = useContext(Context);

    function handleSignOut() {
        localStorage.removeItem('TWITTER@JWT_TOKEN');
        api.defaults.headers.Authorization = undefined;
        setAuthenticated(false);
        history.push('/login');
    }

    return (
        <Container>
            <Content>
                <div className="tabs">
                    <ul>
                        <li className={headerTab === 1 ? 'active' : null}><Link to="/"><FaHome/>Home</Link></li>
                        <li className={headerTab === 2 ? 'active' : null}><Link to={`/profile/${profileInfo.username}`}><FaUserAlt/>My Profile</Link></li>
                    </ul>
                </div>
                <div className="logo">
                    <img src={logoBlue} width="28px" alt="Twitter" />
                </div>
                <div className="utility">
                    <img src={profileInfo.avatar ?? 'https://vectorified.com/images/google-user-icon-19.png'} alt="Profile" />
                    <Link to="/">Tweet</Link>
                    <span onClick={handleSignOut}>Logout</span>
                </div>
            </Content>
        </Container>
    );
}