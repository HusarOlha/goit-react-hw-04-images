import styled from '@emotion/styled';

export const ButtonStyled = styled.button`
  background-image: linear-gradient(
    to right,
    #232526 0%,
    #414345 51%,
    #232526 100%
  );
  margin: 0 auto;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
  &:hover,
  &:focus {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
`;
