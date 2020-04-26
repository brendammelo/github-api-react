import styled from 'styled-components';

export const Loading = styled.div`
    color:#FFF;
    font-size:30px;
    font-weight: bold;
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a{
        color: #05386b;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1{
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #379683;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const CommiList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #05386b ;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #05386b;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }
    
    }

    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #eee;
    }

    div {
        flex:1;
        margin-left: 15px;

        strong {
            font-size: 16px;

            a {
               text-decoration: none;
               color: #333;

               &:hover {
                   color: #05386b;
               }
            }
        }

        p{
            margin-top: 5px;
            font-size: 12px;
            color: #999;
        }
    }
`;