import React from 'react'
import styled from 'styled-components'
import planeImage from '../gameplane.png'

function Plane({planeWidth, planePosX, planePosY}) {
    return (
        <PlaneContainer src={planeImage} alt="" style={{width: planeWidth, left: planePosX, bottom: planePosY}}/>
    )
}

export default Plane

const PlaneContainer = styled.img`
    transform: rotate(-90deg);
    position: absolute;
`;