import styled, { keyframes } from 'styled-components'
import { CountriesContainer } from '../components/Styles'

const loading = keyframes`
    from {
        left: -200px;
    }
    to {
        left: 100%;
    }
`

const StyledSkeleton = styled.div`
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    background-color: ${({ theme }) => (theme.highlight)};
    box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.0294384);
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    
    ::before {
        content: '';
        display: block;
        position: absolute;
        left: -200px;
        top: 0;
        height: 100%;
        width: 200px;
        background: linear-gradient(120deg, #edede9 0%, #ffffff 50%, #edede9 100%);
        animation: ${loading} 1000ms ease-in-out infinite;
    }
`

export default function Skeleton({ width, height, number }) {
    return <CountriesContainer>
        {number &&
            (
                [...Array(number)].map((skeleton, index) => {
                    return <StyledSkeleton width={width} height={height} key={index} />
                })
            )}

    </CountriesContainer>
}