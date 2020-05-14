import React, { useState, useEffect } from 'react';
import { FaUserMinus, FaUserPlus } from 'react-icons/fa';

import api from '../services/api';

export default function FollowButton({ username, extIsFollowing }) {
    const [ loading, setLoading ] = useState(false);
    const [ isFollowing, setIsFollowing ] = useState(false);

    useEffect(() => {
        setIsFollowing(extIsFollowing);
    }, [extIsFollowing]);

    async function handleFollow() {
        try {
            setLoading(true);
            const { data } = await api.post(`/profile/${username}/follow`);
            if(data.error) console.log(data.error);
            setIsFollowing(true);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleUnfollow() {
        try {
            setLoading(true);
            const { data } = await api.post(`/profile/${username}/unfollow`);
            if(data.error) console.log(data.error);
            setIsFollowing(false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    if(isFollowing) {
        return <button disabled={loading} className="unfollow" onClick={handleUnfollow}><FaUserMinus />Unfollow</button>
    } else {
        return <button disabled={loading} className="follow" onClick={handleFollow}><FaUserPlus />Follow</button>
    }
}
