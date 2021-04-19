import React from 'react'
import styled from 'styled-components'
import logo from '../gamelogo.png'

function Home() {
    return (
        <HomeContainer>
            <img src={logo} alt=""/>
            <label>play</label>
            <label>about</label>
        </HomeContainer>
    )
}

export default Home

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;

    > img {
        margin-bottom: 30px;
    }

    > label {
        margin: 10px 0;
        background-color: var(--game-dgray);
        /* border: 5px solid var(--game-lred); */
        padding: 10px 0;
        border-radius: 50ch;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;

        :hover{
            cursor: pointer;
            background-color: var(--game-lgray);
        }
    }
`;