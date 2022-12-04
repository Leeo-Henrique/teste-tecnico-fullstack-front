import { Dispatch } from "react";
import { StyledInput } from "./assets/styles";
interface PropsInput {
  label: string;
  type: string;
  placeholder: string;
  setState: Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  value?: string;
}

export const Input = ({
  label,
  type,
  placeholder,
  setState,
  required,
  value,
}: PropsInput) => {
  return (
    <StyledInput>
      <label>{label}: </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        required={required || false}
        value={value}
      />
    </StyledInput>
  );
};
