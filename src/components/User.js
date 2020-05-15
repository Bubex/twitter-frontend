import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaLink, FaRegClock } from 'react-icons/fa';

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
        color: black;
    }

    .user, .joined, a, label, svg {
        color: grey;
        font-size: 14px;
        margin-left: 5px;
        text-decoration: none;
    }

    svg {
        margin-bottom: -2px;
    }

    p {
        font-size: 14px;
        margin: 5px;
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
            <img src={user.avatar} alt="Avatar"/>
            <div>
                <Link to={`/profile/${user.username}`}><span className="name">{user.name}</span></Link>
                <Link to={`/profile/${user.username}`}><span className="user">@{user.username}</span></Link><br/>
                {user.bio ? <><p>{user.bio}</p></> : null }
                {user.location ? <><FaMapMarkerAlt/><label>{user.location}</label><br/></> : null}
                {user.website ? <><FaLink/><a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a><br/></> : null}
                <FaRegClock/><label>Joined {pMonth} {pYear}</label>
            </div>
        </Style>
    )
}
