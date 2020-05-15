import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    .cover {
        width: 100%;
        height: 200px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .menu {
        background: white;
        width: 100%;
        height: 65px;
        border-bottom: 1px solid #cac9c9;

        .container {
            width: 100%;
            max-width: 1640px;
            height: 100%;
            margin: auto;
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            align-items: center;

            button {
                width: 110px;
                height: 30px;
                border-radius: 3px;
                background: white;
                border: 1px solid #b7b7b7;
                background-color: white;
                font-weight: 600;
                font-family: Calibri;

                &.follow{
                    :hover {
                        background-color: #b7b7b7;
                    }
                    svg {
                        margin-bottom: -2px;
                        margin-right: 6px;
                        color: #1da1f2;
                    }
                }

                &.unfollow{
                    :hover {
                        background-color: #b7b7b7;
                    }
                    svg {
                        margin-bottom: -2px;
                        margin-right: 6px;
                        color: red;
                    }
                }
            }
        }

        .tab-list {
            height: 100%;

            ul {
                height: 100%;
                list-style: none;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                li {
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    text-transform: uppercase;
                    padding: 0 15px;
                    font-size: 13px;
                    color: #5a5a5a;
                    letter-spacing: -0.4px;
                    margin-bottom: 4px;
                    cursor: pointer;

                    span {
                        font-size: 22px;
                        color: black;
                    }

                    &.active {
                        margin-bottom: 0;
                        border-bottom: 4px solid #3059ce;
                    }
                }
            }
        }
    }
`;

export const Content = styled.div`
    width: 100%;
    max-width: 1640px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;

    .profile {
        padding: 0 30px;

        img {
            background: white;
            width: 70%;
            border-radius: 20px;
            border: 2px solid #cac9c9;
            margin-top: -225px;
        }

        h1 {
            font-size: 24px;
            font-family: 'Segoe UI';
            letter-spacing: -1.2px;
        }

        h2 {
            font-size: 16px;
            color: #404040;
        }

        p {
            font-size: 15px;
            margin-top: 10px;
            color: #464646;
        }

        svg {
            vertical-align: baseline;
            margin: 8px 5px -2px 0;
            color: #464646;

            &:first-of-type{
                margin-top: 20px;
            }
        }

        label {
            color: #464646;
        }

        a {
            text-decoration: none;
            color: #464646;

            &:hover {
                font-weight: 600;
            }
        }

        .tweet-to {
            background: #bfe5ff;
            padding: 15px;
            border: 1px solid #b5b5b5;
            border-radius: 5px;
            margin-top: 20px;

            input {
                width: 100%;
                height: 50px;
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #b5b5b5;
            }
        }
    }

    .timeline {
        .tweets, .profiles {
            background: white;
            margin-top: 30px;
        }
    }
`;

export const Tweet = styled.div`
    padding: 15px;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    display: flex;
    cursor: pointer;

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

export const EditProfile = styled.div`
    width: 100%;
    height: 60px;

    a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        text-decoration: none;
        background: #2fab33;

        :hover {

        }
    }
    
    h1 {
        font-size: 20px;
    }

    svg {
        margin-right: 7px;
        font-size: 20px;
    }
`;