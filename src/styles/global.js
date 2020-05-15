import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    html, body, #root {
        min-height: 100vh;
    }
    body {
        background: white;
        -webkit-font-smoothing: antialiased;
    }
    body, input, button, textarea {
        font-size: 16px;
        font-family: Roboto, sans-serif;
    }
    button {
        cursor: pointer;
    }

    .save-notific {
        width: 100%;
        position: fixed;
        background: #2fab33;
        z-index: 50;

        button {
            padding: 10px 0;
            width: 100%;
            height: 100%;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            text-decoration: none;
            background: transparent;
        }
        
        h1 {
            font-size: 20px;
        }

        svg {
            margin-right: 7px;
            font-size: 20px;
        }
    }
`;