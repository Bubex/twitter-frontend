import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1640px;
    margin: auto;
    display: flex;
    justify-content: center;
`;

export const Card = styled.div`
    width: 100%;
    max-width: 500px;
    background: white;
    border-radius: 20px;
    margin-top: 50px;

    form {
        display: flex;
        flex-direction: column;
    }

    .cover, .avatar {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    .label-avatar, .label-cover {
        display: block;
        position: relative;
        cursor: pointer;

        :hover > span {
            visibility: visible;
        }

        :hover > img {
            filter: brightness(0.3);
        }
    }

    label span {
        position: absolute;
        top: 0; bottom: 0; left: 0; right: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        color: white;
    }

    > label > img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }

    div {
        width: 70%;
        margin: 30px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .label-avatar {
            border-radius: 100%;
            width: 150px;
            height: 150px;
            margin: auto;
            margin-top: -110px;
            margin-bottom: 30px;
            z-index: 10;
        }

        .label-avatar img {
            border: 2px solid white;
            width: 150px;
            height: 150px;
            border-radius: 100%;
        }

        label {
            margin-top: 20px;
            margin-bottom: 5px;
        }

        input {
            height: 40px;
            border-radius: 50px;
            background: #eff8fd;
            border: 0.5px solid gainsboro;
            padding: 0 15px;
        }

        textarea {
            height: 150px;
            border-radius: 20px;
            background: #eff8fd;
            border: 0.5px solid gainsboro;
            padding: 15px;
        }

        button {
            width: 80px;
            height: 30px;
            margin-left: auto;
            margin-top: 20px;
            background: #1da1f2;
            border-radius: 20px;
            border: none;
            color: white;

            :hover {
                background: #2784bd;
            }
        }
    }
`;