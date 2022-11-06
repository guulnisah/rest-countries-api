import styled from 'styled-components'

export const Container = styled.main`
    max-width: 90%;
    margin: 0 auto;
`

export const Header = styled.header`
  background-color: ${({ theme }) => (theme.highlight)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0562443);
  height: 5rem; 
  margin-bottom: 3rem;
  
  nav {
    max-width: 90%;
    margin: 0 auto;
    padding-top: 1.43rem;
    padding-bottom: 1.43rem;
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => (theme.text)};
    
    h1 {
      a {
        all:unset;
        cursor: pointer;
        font-style: normal;
        font-weight: 800;
        font-size: 24px;
        line-height: 1.38;
      }
    }
}
`

export const Button = styled.button`
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => (theme.text)};
    
    path {
        stroke: ${({ theme }) => (theme.text)};
        fill: ${({ theme }) => (theme.text)};
    }
`

export const SettingsContainer = styled.div`
  position: relative;
  height: 56px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  input {
    all: unset;
    width: 25%;
    padding: 1.125rem;
    padding-left: 74px;
    background-color: ${({ theme }) => (theme.highlight)};
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
    border-radius: 5px;
    font-size: 0.875rem;
    line-height: 1.43;
    color: ${({ theme }) => (theme.text)};
    background-image: url('../public/search.svg');
    background-size: 1.25rem;
    background-repeat: no-repeat;
    background-position: 32px 19px;
  }
  
  select {
    background-color: ${({ theme }) => (theme.body)};
    border: none;
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
    border-radius: 5px;
    font-size: 14px;
    line-height: 1.43;
    color: ${({ theme }) => (theme.text)};
  }
`

export const CountriesContainer = styled.section`
  margin: 0 auto;
  display: grid;
  gap: 75px;
   
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (min-width: 1400px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`

export const Country = styled.article`
  background-color: ${({ theme }) => (theme.highlight)};
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.0294384);
  border-radius: 5px;
  
  h2 {
    margin-bottom: 1rem;
    font-weight: 800;
    font-size: 1.125rem;
    line-height: 1.44;
  }
  
  img {
    padding: 0;
    width: 100%;
    height: 48%;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
  }
`

export const TextContainer = styled.div`
    padding: 24px 0 46px 24px;
    color: ${({ theme }) => (theme.text)};

    h2 {
        margin-bottom: 1rem;
        font-weight: 800;
        font-size: 1.125rem;
        line-height: 1.44;
    }
    
    p {
        margin-bottom: 0.5rem;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 120%;
    }

    span {
        font-weight: 300;
        font-size: 0.875rem;
        line-height: 1.14;
    }
`
