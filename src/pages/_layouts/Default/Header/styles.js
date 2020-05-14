import styled from 'styled-components';

export const Container = styled.header`
    width: 100vw;
    height: 50px;
    position: fixed;
    background: white;
    box-shadow: 0px 3px 9px -7px black;
    z-index: 100;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 1640px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;

    .tabs {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        ul {
            list-style: none;
            display: flex;
            height: 100%;

            li {
                color: grey;
                font-weight: 500;
                margin-right: 20px;
                height: 100%;
                display: flex;
                align-items: center;
                cursor: pointer;

                a {
                    color: inherit;
                    text-decoration: none;
                    height: 100%;
                    display: flex;
                    align-items: center;
                }

                &.active {
                    color: #1da1f2;
                    font-weight: 600;
                    border-bottom: 4px solid #1da1f2;
                }

                svg {
                    margin-right: 5px;
                    margin-bottom: -2px;
                }
            }
        }
    }

    .logo {
        margin: auto;
    }

    .utility {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        img {
            width: 40px;
            height: 40px;
            border-radius: 100%;
        }

        a {
            border-radius: 20px;
            border: none;
            background: #1da1f2;
            color: white;
            width: 100px;
            height: 30px;
            margin-left: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
        }

        span {
            font-size: 14px;
            margin-left: 20px;
            text-decoration: underline;
            cursor: pointer;
        }
    }
`;