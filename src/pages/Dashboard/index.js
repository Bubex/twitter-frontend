import React, { useContext, useEffect, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import HashLoader from 'react-spinners/HashLoader';
import update from 'immutability-helper';
import { Form } from '@unform/web';
import * as _ from 'lodash';

import api from '../../services/api';
import { connect, disconnect, subscribeToUpdateMe } from '../../services/socket';
import { Context } from '../../contexts/AuthContext';
import { Container, Content } from './styles';

import Textarea from '../../components/Textarea';
import Tweet from '../../components/Tweet';
import User from '../../components/User';

export default function Dashboard() {
    const { profileInfo, setProfileInfo, setHeaderTab } = useContext(Context);
    const [ loading, setLoading ] = useState(true);
    const [ sending, setSending ] = useState(false);
    const [ whoToFollow, setWhoFollow ] = useState([]);
    const [ tweets, setTweets ] = useState([]);

    useEffect(() => {
        (async function() {
            try {
                setLoading(true);
                const response1 = await api.get('/timeline');
                setTweets(response1.data);

                const response2 = await api.post('/who-to-follow', {
                    count: 3
                });
                setWhoFollow(response2.data);
                
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();

        setHeaderTab(1);

        setupWebSocket();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        subscribeToUpdateMe(me => setProfileInfo(me));
        // eslint-disable-next-line
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
            document.getElementById('tweet-form').reset();
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
                    <img src={profileInfo.cover} alt="Cover"/>
                    <Content>
                        <div className="user">
                            <img src={profileInfo.avatar} alt="Avatar"/>
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
                    <img src={profileInfo.avatar} alt="Avatar"/>
                    <Form onSubmit={handleTweet} id="tweet-form">
                        <Textarea name="text" placeholder="What's happening?"/>
                        <button type="submit" disabled={sending}>
                            {sending ? <PulseLoader size={8} color={"white"} loading={sending} /> : 'Tweet'}
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
                <h1>Who to follow</h1> - <button>Refresh</button>
                <div className="profiles">
                    {whoToFollow ? whoToFollow.map(p => <User key={p._id} user={p}/>) : null}
                </div>
            </div>
        </Container>
    )
}