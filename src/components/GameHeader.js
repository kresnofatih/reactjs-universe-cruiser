import React from 'react'
import styled from 'styled-components'

function GameHeader({points}) {
    return (
        <GameHeaderComponent>
            <h2>universe cruiser</h2>
            <label>music</label>
            <h2>score<h3>{points}</h3></h2>
        </GameHeaderComponent>
    )
}

export default GameHeader

const GameHeaderComponent = styled.div`
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--game-dgray);

    > h2 {
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: 'Poppins', sans-serif;
        font-size: 30px;

        > h3 {
            padding-top: 2px;
            font-weight: 200;
            font-family: 'Poppins', sans-serif;
            font-size: 25px;
            margin-left: 10px;
        }
    }

    > label {
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: 'Poppins', sans-serif;
        font-size: 30px;
        color: var(--game-lred);
    }
`;