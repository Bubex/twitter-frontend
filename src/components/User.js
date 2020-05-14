import React from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaLink, FaRegClock } from 'react-icons/fa';

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

    .user, .joined, a, label, svg {
        color: grey;
        font-size: 14px;
        margin-left: 5px;
    }

    svg {
        margin-bottom: -2px;
    }

    p {
        margin-top: 10px;
    }

    :hover {
        background: #e8e8e8;
    }
`;

export default function User({ user }) {

    const pDate = new Date(user.createdAt); 
    const pMonth = pDate.toLocaleString('en-us', { month: 'long' });
    const pYear = pDate.getFullYear();

    return(
        <Style>
            <img src={user.avatar ?? 'https://vectorified.com/images/google-user-icon-19.png'} alt="Avatar"/>
            <div>
                <span className="name">{user.name}</span>
                <span className="user">@{user.username}</span>
                <p>{user.bio}</p>
                {user.location ? <><FaMapMarkerAlt/><label>{user.location}</label></> : null}
                {user.website ? <><FaLink/><a href={user.website}>{user.website}</a></> : null}
                <FaRegClock/><label>Joined {pMonth} {pYear}</label>
            </div>
        </Style>
    )
}
