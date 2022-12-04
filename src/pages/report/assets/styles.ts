import styled from "styled-components";

export const MainStyled = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    background-color: #fff;
    border-radius: 5px;
    padding: 0.625rem 1.25rem 1.25rem 1.25rem;
  }
  ul li {
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
  }
  ul li button {
    cursor: pointer;
    background: none;
    border: 0;
    width: 1.875rem;
    margin-left: 80%;
  }
  .about__user {
    margin-left: 15px;
  }
`;
