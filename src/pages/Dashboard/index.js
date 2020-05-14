import React, { useContext, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import PulseLoader from 'react-spinners/PulseLoader';
import HashLoader from 'react-spinners/HashLoader';
import update from 'immutability-helper';
import * as _ from 'lodash';

import api from '../../services/api';
import { connect, disconnect, subscribeToUpdateMe } from '../../services/socket';
import { Context } from '../../contexts/AuthContext';
import Textarea from '../../components/Textarea';
import Tweet from '../../components/Tweet';
import { Container, Content } from './styles';

export default function Dashboard() {
    const { profileInfo, setProfileInfo, setHeaderTab } = useContext(Context);
    const [ loading, setLoading ] = useState(true);
    const [ sending, setSending ] = useState(false);
    const [ tweets, setTweets ] = useState([]);

    useEffect(() => {
        (async function() {
            try {
                setLoading(true);
                const { data } = await api.get('/timeline');
                setTweets(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
        setHeaderTab(1);
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setupWebSocket();
        subscribeToUpdateMe(me => setProfileInfo(me));
    }, [profileInfo]);

    function setupWebSocket() {
        disconnect();
        connect(profileInfo.username, profileInfo.username);
    }

    async function handleTweet({ text }) {
        try {
            setSending(true);
            const { data } = await api.post('/post', {
                text 
            });
            if(data.error) return console.log(data.error);
            const newTweetList = update(tweets, { $unshift: [data] });
            setTweets(newTweetList);
        } catch (err) {
            console.log(err);
        } finally {
            setSending(false);
        }
    }

    return (
        <Container>
            <div className="profile">
                <div className="resume">
                    <img src={profileInfo.cover ?? 'https://www.millenefits.com/wp-content/uploads/2017/06/twitter-background.jpg'} alt="Cover"/>
                    <Content>
                        <div className="user">
                            <img src={profileInfo.avatar ?? 'https://vectorified.com/images/google-user-icon-19.png'} alt="Avatar"/>
                            <div>
                                <h1>{profileInfo.name}</h1>
                                <span>@{profileInfo.username}</span>
                            </div>
                        </div>
                        <div className="counters">
                            <ul>
                                <li>Tweets 
                                    <span>{profileInfo.posts ? profileInfo.posts.length : 0}</span>
                                </li>
                                <li>Following 
                                    <span>{profileInfo.following ? profileInfo.following.length : 0}</span>
                                </li>
                                <li>Followers 
                                    <span>{profileInfo.followers ? profileInfo.followers.length : 0}</span>
                                </li>
                            </ul>
                        </div>
                    </Content>
                </div>
            </div>
            <div className="timeline">
                <div className="new-tweet">
                    <img src={profileInfo.avatar ?? 'https://vectorified.com/images/google-user-icon-19.png'} alt="Avatar"/>
                    <Form onSubmit={handleTweet}>
                        <Textarea name="text" placeholder="What's happening?"/>
                        <button type="submit" disabled={sending}>
                        {sending
                        ? <PulseLoader size={8} color={"white"} loading={sending} />
                        : 'Tweet'}
                        </button>
                    </Form>
                </div>
                <div className="tweets">
                    {loading ? 
                        <HashLoader size={60} color={"#1da1f2"} loading={loading} css={'margin: auto;'}/> :
                        _.toArray(tweets).map(m => (
                            <Tweet key={m._id} tweet={m} user={m.user} />
                        ))
                    }
                </div>
            </div>
            <div className="utilities">

            </div>
        </Container>
    )
}