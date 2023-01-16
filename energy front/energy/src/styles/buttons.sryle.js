import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Button = styled(Link)`
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;


    &:hover{
        transform: translateY(-2px);
    }


`