import styled from 'styled-components/macro'

export const BigDiv = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`

export const DeviceDiv = styled.div`
    width: 50%;
    height: 100%;
    background-color: #ccdbdc;
    border-right: 8px solid #2F3E46;
`

export const GraphicDiv = styled.div`
    width: 50%;
    height: 100%;
    background-color: #ccdbdc;
`

export const TitluDevices = styled.h1`
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid #2F3E46;
`

export const DeviceComponent = styled.div`
    margin-left: 5%;
    width: 88%;
    height: 20vh;
    border: 1px solid #2F3E46;
    margin-bottom : 20px;
`

export const DivNumber = styled.div`
    padding: 20px 0;
    margin-left: 10px;
`
export const DeviceDescription = styled.div`
    padding: 20px 0;    
    margin-left: 10px;
`
export const AuxDiv = styled.div`
    display : flex;
`
export const DeviceAddress = styled.div`
    margin-left: 10px;
    padding: 10px 0;  
    width: 70%;
`
export const MaxConsumtion = styled.div`

`
export const DeviceButton = styled.button`
  font-size: 1rem;
  padding: 0.25rem 1rem;
  border: none;
  background: #92DCE5;
  color: #000;
  transition: 0.2 ease-out;
  border-radius: 4px;
  outline: none;
  cursor: pointer;    
  text-decoration: none;
  margin-left: 400px;
  margin-right: 50px;
  margin-top: 80px;
  height: 35px;
  width: 175px;

&:hover {
  background: #fff;
  transition: 0.2s ease-out;
  cursor: pointer;
  color: #000;
}
`

export const ChartDiv = styled.div`
    display: flex;
    margin-left: 10px;
`;

export const ChartBtn = styled.div`
    margin-left: 5%;
`;

export const UserDiv = styled.div`
    display: grid;
`;

export const ElementsDiv = styled.div`
    margin-top: 5%;
`;