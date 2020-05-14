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
`;