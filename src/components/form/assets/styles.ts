import styled from "styled-components";

export const FormStyled = styled.form`
  width: 90%;
  height: 90%;
  display: flex;
  min-height: max-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  width: 20rem;
  max-height: 30rem;
  border: 0.0625rem solid #000;
  border-radius: 0.3125rem;

  backdrop-filter: blur(0px) saturate(0%);
  -webkit-backdrop-filter: blur(0px) saturate(0%);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  .send__data {
    width: 13rem;
    height: 40px;
  }
`;
