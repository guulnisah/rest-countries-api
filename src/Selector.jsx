import styled from 'styled-components'
import { useState } from 'react'
import { nanoid } from 'nanoid';

const DropDownContainer = styled.div`
    position: absolute;
    right: 0;
    width: 16%;
    margin: 0 auto;
    cursor: pointer;
    
    div {
    margin-bottom: 0.25rem;
    padding: 1.125rem 1.125rem 1.125rem 1.5rem;
    background-color: ${({ isDarkMode }) => (isDarkMode ? '#2B3844' : '#FFFFFF')};
    color: ${({ isDarkMode }) => (isDarkMode ? '#FFF' : '#111517')};
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
    border-radius: 5px;
    font-size: 0.875rem;
    line-height: 1.43;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
        path {
            fill: ${({ isDarkMode }) => (isDarkMode ? '#FFF' : '#111517')};
        }
    }
`;

const DropDownList = styled.ul`
    padding: 1rem 0 1rem 1.5rem;
    background-color: ${({ isDarkMode }) => (isDarkMode ? '#2B3844' : '#FFFFFF')};
    color: ${({ isDarkMode }) => (isDarkMode ? '#FFF' : '#111517')};
    box-sizing: border-box;
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
    border-radius: 5px;
    
    li {
        list-style: none;
        margin-bottom: 0.5rem;
    }
`;


export default function Selector({ isDarkMode, selectedRegion, setSelectedRegion }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setSelectedRegion(value);
        setIsOpen(false);
    };

    const options = ["Africa", "Americas", "Asia", "Europe", "Oceania"].map((option) => {
        return (
            <li onClick={onOptionClicked(option)} key={nanoid()}>
                {option}
            </li>
        )
    });

    return (
        <DropDownContainer isDarkMode={isDarkMode}>
            <div onClick={toggling}>
                {selectedRegion || "Filter by Region"}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.45 3.45L6 6.9L2.55 3.45L1.5 4.5L6 9L10.5 4.5L9.45 3.45Z" fill="black" />
                </svg>
            </div>
            {isOpen && (
                <DropDownList isDarkMode={isDarkMode}>
                    {options}
                </DropDownList>
            )}
        </DropDownContainer>
    );
}