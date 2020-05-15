import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1640px;
    height: 100%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-gap: 15px;
    align-items: flex-start;

    .profile {
        padding: 5px;
        
        .resume {
            margin-top: 10px;
            background: white;
            border-radius: 5px;

            > img {
                border-top-right-radius: 5px;
                border-top-left-radius: 5px;
                width: 100%;
                height: 150px;
                object-fit: cover;
            }
        }
    }

    .timeline {
        width: 100%;
        margin-bottom: auto;
        margin-top: 15px;

        .new-tweet {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            border-radius: 5px;

            img {
                width: 30px;
                height: 30px;
                border-radius: 100%;
                margin: 0 10px;
                background: white;
            }

            form {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                textarea {
                    width: 100%;
                    resize: vertical;
                    padding: 5px 10px;
                    border-radius: 5px;
                    height: 35px;
                    max-height: 70px;
                    border: 1px solid #dadada;
                    background-color: white;
                    font-size: 16px;
                    overflow-y: hidden;
                }

                button {
                    margin-top: 10px;
                    margin-left: auto;
                    border-radius: 5px;
                    border: none;
                    background: #1da1f2;
                    color: white;
                    width: 70px;
                    height: 30px;
                }
            }
        }

        .tweets {
            margin-top: 20px;
        }
    }

    .utilities {
        width: 100%;
        margin-bottom: auto;
        margin-top: 15px;
        padding: 5px;
        background: white;
        border-radius: 5px;
        
        h1 {
            display: inline-block;
            font-size: 16px;
            color: #535454;
            margin: 10px 10px;
        }

        button {
            border: none;
            background: transparent;
            font-size: 14px;
            color: grey;
        }
    }
`;

export const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .user {
        width: 100%;
        display: flex;
        justify-content: flex-start;

        img {
            width: 100px;
            height: 100px;
            border-radius: 100%;
            margin: -50px 10px 0 10px;
            background: white;
            border: 2px solid white;
        }

        h1 {
            font-size: 18px;
        }

        span {
            color: grey;
            font-size: 14px;
        }
    }

    .counters {
        width: 100%;
        margin-bottom: 10px;

        ul {
            height: 100%;
            width: 100%;
            list-style: none;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 20px;

            li {
                height: 100%;
                display: flex;
                justify-content: center;
                flex-direction: column;
                padding: 0 15px;
                font-size: 14px;
                font-weight: 600;
                color: #5a5a5a;
                margin: 4px 10px;

                span {
                    font-size: 22px;
                    color: #1da1f2;
                }
            }
        }
    }
`;