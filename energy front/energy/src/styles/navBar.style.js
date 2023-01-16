import styled, {css} from 'styled-components/macro'
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
    padding: 0.5rem calc((100vw - 1450px) / 2);
    z-index: 100;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    z-index: 100;
    position: fixed;
    width: 100%;
    background: #01200F;
    text-decoration: none;

`
export const MeniuBar = styled.i``;

export const NavLink = css`
    color: #fff;
    display: flex;
    align-items: center;
    padding 0 1rem;
    heigth: 100%;
    cursor: pointer;
    text-decoration: none;
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px){
        display: none;
    }
`;

export const NavMenuLinks = styled(Link)`
  ${NavLink}
`;

export const NavBtn = styled.div`
    display: flex;
    align-items: center;
    margin-right: 80px;

    @media screen and (max-width: 768px){
        display: none;
    }
`;
