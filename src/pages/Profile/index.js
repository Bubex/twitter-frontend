import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaLink, FaRegClock, FaEdit } from 'react-icons/fa';

import Tweet from '../../components/Tweet';
import User from '../../components/User';
import FollowButton from '../../components/FollowButton';

import api from '../../services/api';
import history from '../../services/history';
import { connect, disconnect, subscribeToUpdateProfile } from '../../services/socket';

import { Context } from '../../contexts/AuthContext';
import { EditProfile, Container, Content } from './styles';

export default function Profile() {
    const { profileInfo, setHeaderTab } = useContext(Context);

    const [ isFollowing, setIsFollowing ] = useState(false);
    const [ profile, setProfile ] = useState([]);
    const [ activatedTab, setActivatedTab ] = useState(1);
    const { username } = useParams();

    useEffect(() => {
        (async function() {
            try {
                const { data } = await api.get(`/profile/${username}`);
                if(data.error) history.push('/');
                setProfile(data);
                data.followers.filter(p => { if(p._id === profileInfo._id) setIsFollowing(true) });
            } catch (err) {
                console.log(err);
            }

            setupWebSocket();

            if(profileInfo.username === username) setHeaderTab(2);
            else setHeaderTab(0);
        })();
        // eslint-disable-next-line
    }, [username]);

    useEffect(() => {
        subscribeToUpdateProfile(newProfile => setProfile(newProfile));
        console.log('houve alteração no perfil')
    }, [profile]);

    function setupWebSocket() {
        disconnect();
        connect(profileInfo.username, username);
    }

    const date = new Date(profile.createdAt); 
    const month = date.toLocaleString('en-us', { month: 'long' });
    const year = date.getFullYear();

    return (
        <>
            {profileInfo.username === username ? <EditProfile><Link to="/settings"><FaEdit /><h1>Edit Profile</h1></Link></EditProfile> : null}
            <Container>
                <div className="cover">
                    <img src={profile.cover} alt="Cover"/>
                </div>
                <div className="menu">
                    <div className="container">
                        <div></div>
                        <div className="tab-list">
                            <ul>
                                <li className={activatedTab === 1 ? 'active' : null} onClick={() => setActivatedTab(1)}>Tweets 
                                    <span>{profile.posts ? profile.posts.length : 0}</span>
                                </li>
                                <li className={activatedTab === 2 ? 'active' : null} onClick={() => setActivatedTab(2)}>Following 
                                    <span>{profile.following ? profile.following.length : 0}</span>
                                </li>
                                <li className={activatedTab === 3 ? 'active' : null} onClick={() => setActivatedTab(3)}>Followers 
                                    <span>{profile.followers ? profile.followers.length : 0}</span>
                                </li>
                            </ul>
                        </div>
                        {username !== profileInfo.username ?
                            <FollowButton username={username} extIsFollowing={isFollowing}/> : null
                        }
                    </div>
                </div>
                <Content>
                    <div className="profile">
                        <img src={profile.avatar} alt="Avatar"/>
                        
                        <h1>{profile.name}</h1>
                        
                        <h2>@{profile.username}</h2>
                        
                        <p>{profile.bio}</p>
                        
                        {profile.location ? <><FaMapMarkerAlt/><label>{profile.location}</label></> : null}
                        <br />
                        
                        {profile.website ? <><FaLink/><a href={profile.website}>{profile.website}</a></> : null}
                        <br />
                        
                        <FaRegClock/><label>Joined {month} {year}</label>
                        
                        <div className="tweet-to">
                            <input type="text" placeholder={`Tweet to ${profile.username}`}/>
                        </div>
                    </div>
                    <div className="timeline">
                        {/* TWEETS */}
                        {activatedTab === 1 ? 
                            <div className="tweets">
                                {profile.posts ? profile.posts.map(p => <Tweet key={p._id} tweet={p} user={profile}/>) : null}
                            </div>
                        : null}
                        {/* FOLLOWING USERS */}
                        {activatedTab === 2 ? 
                            <div className="profiles">
                                {profile.following ? profile.following.map(p => <User key={p._id} user={p}/>) : null}
                            </div> 
                        : null}
                        {/* FOLLOWERS USERS */}
                        {activatedTab === 3 ? 
                            <div className="profiles">
                                {profile.followers ? profile.followers.map(p => <User key={p._id} user={p}/>) : null}
                            </div>
                        : null}
                    </div>
                    <div className="utilities">

                    </div>
                </Content>
            </Container>
        </>
    )
}
