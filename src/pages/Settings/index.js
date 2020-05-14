import React, { useContext, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import api from '../../services/api';
import { Container, Card } from './styles';
import { Context } from '../../contexts/AuthContext';

export default function Settings() {
    const { profileInfo, setProfileInfo } = useContext(Context);
    const formRef = useRef(null);
    const [ avatar, setAvatar ] = useState('');
    const [ cover, setCover ] = useState('');

    useEffect(() => {
        setAvatar(profileInfo.avatar);
        setCover(profileInfo.cover);
    }, []);

    async function handleSubmit(formData) {
        try {
            formData['avatar'] = avatar;
            formData['cover'] = cover;
            const { data } = await api.post('/update', formData);
            if(data.error) return console.log('Erro');
        } catch (err) {
            console.log(err);
        }
    }

    async function handleChangePreview(e, myType) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        const { data } = await api.post('/pictures/upload', formData);
        myType === 'avatar' ? setAvatar(data.path) : setCover(data.path);
    }

    return (
        <Container>
            <Card>
                <label className="label-cover" htmlFor="cover">
                    <img src={cover} alt="Cover" />
                    <span>Click to change</span>
                </label>
                <input id="cover" className="cover" name="cover" type="file" accept="image/*" onChange={(e) => handleChangePreview(e, 'cover')}/>

                <div>
                    <label className="label-avatar" htmlFor="avatar">
                        <img src={avatar} alt="Avatar" />
                        <span>Click to change</span>
                    </label>
                    <input id="avatar" className="avatar" name="avatar" type="file" accept="image/*" onChange={(e) => handleChangePreview(e, 'avatar')}/>
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <label>Username</label>
                        <Input name="username" defaultValue={profileInfo.username} />
                        <label>Full Name</label>
                        <Input name="name" defaultValue={profileInfo.name} />
                        <label>Location</label>
                        <Input name="location" defaultValue={profileInfo.location} />
                        <label>Website</label>
                        <Input name="website" defaultValue={profileInfo.website} />
                        <label>Bio</label>
                        <Textarea name="bio" defaultValue={profileInfo.bio} />
                        <button type="submit">Save</button>
                    </Form>
                </div>
            </Card>
        </Container>
    )
}
