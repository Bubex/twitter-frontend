import React from 'react';
import styled from 'styled-components';

export const Style = styled.div`
    padding: 15px;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    display: flex;
    cursor: pointer;
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
`;

export default function Tweet({ tweet, user }) {

    const pDate = new Date(tweet.createdAt); 
    const pMonth = pDate.toLocaleString('en-us', { month: 'long' });
    const pDay = pDate.getDate();

    return(
        <Style>
            <img src={user.avatar ?? 'https://vectorified.com/images/google-user-icon-19.png'} alt="Avatar"/>
            <div>
                <span className="name">{user.name}</span>
                <span className="user">@{user.username}</span>
                <span className="date">- {pMonth} {pDay}</span>
                <br />
                <p>{tweet.text}</p>
            </div>
        </Style>
    )
}
