import styled from "styled-components";

export const MainStyled = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ul::-webkit-scrollbar {
    cursor: grab;
    width: 12px;
  }
  ul::-webkit-scrollbar-track {
    cursor: grab;
    background: none; /* color of the tracking area */
  }
  ul::-webkit-scrollbar-thumb {
    cursor: grab;
    background-color: #001f54;
    background-image: linear-gradient(
      180deg,
      #001f54 0%,
      #68004c 50%,
      #000000 100%
    );

    border-radius: 20px; /* roundness of the scroll thumb */
    border: 1px solid orange;
  }
  ul {
    width: 31.25rem;
    display: flex;
    padding-top: 0.625rem;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 3.125rem;
    max-height: 31.25rem;
    overflow-y: scroll;
  }
  ul li {
    background-color: #fff;
    border-radius: 5px;
    padding: 0.875rem 1.25rem 1.25rem 1.25rem;
    min-height: 12.8125rem;
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
  }
  ul li button {
    cursor: pointer;
    background: none;
    border: 0;
    font-size: 20px;
    width: min-content;
    position: relative;
    top: -5px;
    left: 93%;
  }
  .about__user {
    margin-left: 15px;
  }
  .contacts__empty {
    border-radius: 0.625rem;
    display: flex;
    background-color: #fff;
    width: 100%;
    height: 18.75rem;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  a{
    text-decoration: none;
  }
`;
