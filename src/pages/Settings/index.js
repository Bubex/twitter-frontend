import React, { useContext, useRef, useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Form } from '@unform/web';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import api from '../../services/api';
import { Container, Card } from './styles';
import { Context } from '../../contexts/AuthContext';

const schema = Yup.object().shape({
    username: Yup.string()
                .min(4, 'Your username must be between 4 and 16 characters')
                .max(16, 'Your username must be between 4 and 16 characters')
                .matches('^[a-zA-Z0-9]*$', 'Your username cannot contain blanks or special characters'),
    name: Yup.string().min(3, 'Your name must be at least 3 characters').required('Enter your fullname'),
    location: Yup.string().max(20),
    website: Yup.string().url(),
    bio: Yup.string().max(150),
    password: Yup.string().required('Choose a password').min(8, 'The password must be at least 8 characters'),
    password2: Yup.string().oneOf([Yup.ref('password'), null], 'The passwords do not match').required('Confirm your password')
});

export default function Settings() {
    const { profileInfo } = useContext(Context);
    const formRef = useRef(null);
    const [ avatar, setAvatar ] = useState('');
    const [ cover, setCover ] = useState('');
    const [ showNotific, setShowNotific ] = useState(false);

    useEffect(() => {
        setAvatar(profileInfo.avatar);
        setCover(profileInfo.cover);
        // eslint-disable-next-line
    }, []);

    async function handleSubmit(formData) {
        try {
            formData['avatar'] = avatar;
            formData['cover'] = cover;
            const { data } = await api.post('/update', formData);
            if(data.error) return console.log('Erro');
            setShowNotific(true);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleChangePreview(e, myType) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        const { data } = await api.post('/pictures/upload', formData);
        console.log(data);
        myType === 'avatar' ? setAvatar(data.path) : setCover(data.path);
    }

    return (
        <>
            {showNotific ? 
                <SlideDown className="save-notific"><button onClick={() => setShowNotific(false)}>
                    <FaCheck /><h1>Successfully Saved!</h1></button>
                </SlideDown> 
                : null
            }
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
                        <Form schema={schema} onSubmit={handleSubmit} ref={formRef}>
                            <label>Username</label>
                            <Input name="username" defaultValue={profileInfo.username} minlength="4" maxlength="16"/>
                            <label>Full Name</label>
                            <Input name="name" defaultValue={profileInfo.name} minlength="3"/>
                            <label>Location</label>
                            <Input name="location" defaultValue={profileInfo.location} maxlength="20" />
                            <label>Website</label>
                            <Input name="website" defaultValue={profileInfo.website} />
                            <label>Bio</label>
                            <Textarea name="bio" defaultValue={profileInfo.bio} maxlength="150" />
                            <button type="submit">Save</button>
                        </Form>
                    </div>
                </Card>
            </Container>
        </>
    )
}
