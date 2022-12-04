import { FormStyled } from "./styles";
import { Input } from "../input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainStyled } from "../../pages/report/assets/styles";
import { API } from "../../api";
import { toast } from "react-toastify";

export const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassowrd, setInputPassowrd] = useState("");
  const navigate = useNavigate();

  const sendData = async () => {
    const data = {
      email: inputEmail,
      password: inputPassowrd,
    };
    console.log(data);
    await API.post("/login", data)
      .then((res) => {
        localStorage.setItem("@Token", res.data.token);
        localStorage.setItem("@Userid", res.data.userID);
        toast.success("Logado com sucesso");
        setTimeout(() => {
          navigate("/clients");
        }, 2000);
      })
      .catch((err) => toast.error("Email ou senha inválidas"));
  };

  return (
    <MainStyled>
      <FormStyled onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>
        <Input
          label="Email"
          type="email"
          placeholder=""
          setState={setInputEmail}
          required={true}
          value={inputEmail}
        />
        <Input
          label="Password"
          type="password"
          placeholder=""
          setState={setInputPassowrd}
          required={true}
          value={inputPassowrd}
        />
        <button type="submit" onClick={sendData} className="send__data">
          Enviar
        </button>
        <p>
          {" "}
          Não e cliente crie seu <Link to="/criarcontato"> Contato</Link>
        </p>
      </FormStyled>
    </MainStyled>
  );
};
