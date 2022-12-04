import { Form } from "../../components/form";
import { MainStyled } from "./assets/styles";
import { User } from "../report";
export const RegisterPage = () => {
  // por causa do form props data para prencher o formulario automaticamente
  const fakeData: User = {
    emails: [
      { id: "", email: "" },
      { id: "", email: "" },
      { id: "", email: "" },
    ],
    nome: "",
    telefones: [
      { id: "", telefone: "" },
      { id: "", telefone: "" },
      { id: "", telefone: "" },
    ],
    id: "",
    created: "",
  };
  return (
    <MainStyled>
      <Form data={fakeData} />
    </MainStyled>
  );
};
