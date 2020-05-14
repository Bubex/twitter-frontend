import styled from 'styled-components';

export const Content = styled.div`
    max-width: 1440px;
    height: 100vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 18px;
        font-family: 'Segoe UI', sans-serif;
        font-weight: 500;
        margin: 10px 0;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 350px;

        span {
            color: red;
            font-size: 12px;
            margin-left: auto;
        }

        input {
            background: #E6EAEF;
            border-radius: 25px;
            border: none;
            width: 100%;
            height: 38px;
            margin: 5px 0;
            padding: 10px 15px;
        }

        button {
            width: 100%;
            height: 38px;
            background: #1CA0F0;
            color: white;
            font-weight: 500;
            border-radius: 25px;
            border: none;
            margin: 5px 0;
        }

        a {
            font-size: 14px;
            color: #1ca0f0;
            text-decoration: none;
            margin-top: 5px;
        }
    }
`;