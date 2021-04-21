import React from 'react'
import styled from 'styled-components'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';

function GameHeader({points, playingStatus, setPlayingStatus, setPageToHome}) {
    const togglePlayer = ()=>{
        setPlayingStatus(i=>!i);
    }
    return (
        <GameHeaderComponent>
            <label onClick={setPageToHome}><h2>universe cruiser</h2></label>
            <h2>score<h3>{points}</h3></h2>
            <label onClick={togglePlayer}>
                <MusicNoteIcon style={{color: '#ff0077', display: !playingStatus && 'none'}}/>
                <MusicOffIcon style={{color: '#ff0077', display: playingStatus && 'none'}}/>
            </label>
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
    position: absolute;
    z-index: 100;
    left: 0;

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

        :hover {
            cursor: pointer;
        }
    }
`;