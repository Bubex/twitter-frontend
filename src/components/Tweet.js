import React from 'react';
import { Link } from 'react-router-dom';
// import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
// import update from 'immutability-helper';

// import api from '../services/api';
// import { Context } from '../contexts/AuthContext'; 

export const Style = styled.div`
    padding: 15px;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    display: flex;
    background: white;

    img {
        height: 40px;
        border-radius: 100%;
        margin-right: 10px;
    }

    .name {
        font-weight: 600;
    }

    .user, .date {
        color: grey;
        font-size: 14px;
        margin-left: 5px;
    }

    p {
        margin-top: 10px;
    }

    :hover {
        background: #e8e8e8;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    button {
        border: none;
        background: transparent;
        color: red;
    }
`;

export default function Tweet({ tweet, user }) {
    // const { profileInfo, setProfileInfo } = useContext(Context);
    // const [ loading, setLoading ] = useState(false);

    const pDate = new Date(tweet.createdAt); 
    const pMonth = pDate.toLocaleString('en-us', { month: 'long' });
    const pDay = pDate.getDate();

    // async function handleDelete() {
    //     try {
    //         console.log(profileInfo);
    //         setLoading(true);
    //         const { data } = await api.post('/post/delete', { _id: tweet._id });
    //         if(data.error) console.log(data.error);
    //         const newTweetList = update(profileInfo, { posts: { $unset: [tweet._id] }});
    //         setProfileInfo(newTweetList);
    //     } catch (err) {
    //         console.log(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return(
        <Style>
            <Link to={`/profile/${user.username}`}><img src={user.avatar} alt="Avatar"/></Link>
            <div>
                <Link to={`/profile/${user.username}`}><span className="name">{user.name}</span></Link>
                <Link to={`/profile/${user.username}`}><span className="user">@{user.username}</span></Link>
                <span className="date">- {pMonth} {pDay}</span>
                {/* <button onClick={handleDelete} disabled={loading}><FaTimes /></button> */}
                <br />
                <p>{tweet.text}</p>
            </div>
        </Style>
    )
}
