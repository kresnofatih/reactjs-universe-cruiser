import React from 'react'
import styled from 'styled-components'
import gamegem from '../gamegem.png'
import gameasteroid from '../gameasteroid.png'

function Objects({objectPosX, objectPosY, objectType, objectWidth}) {
    return (
        <ObjectContainer src={objectType==='gem' ? gamegem : gameasteroid} alt="" style={{width: objectWidth, left: objectPosX, bottom: objectPosY}}/>
    )
}

export default Objects

const ObjectContainer = styled.img`
    position: absolute;
`;