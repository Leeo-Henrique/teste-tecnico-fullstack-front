import { FormStyled } from "./assets/styles";
import { Input } from "../input";
import { useEffect, useState } from "react";
import { API } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { User } from "../../pages/report";
interface Props {
  rota?: string;
  data: User;
}
export const Form = ({ rota = "", data }: Props) => {
  const [user, setUser] = useState<any>({});
  const [inputName, setInputName] = useState(data.nome || "");
  const [inputEmail, setInputEmail] = useState(data.emails[0].email || "");
  const [inputSecondEmail, setInputSecondEmail] = useState(
    data.emails[1]?.email || ""
  );
  const [inputThirdEmail, setInputThirdEmail] = useState(
    data.emails[2]?.email || ""
  );
  const [inputPhone, setInputPhone] = useState(
    data.telefones[0].telefone || ""
  );
  const [inputSecondPhone, setInputSecondPhone] = useState(
    data.telefones[1]?.telefone || ""
  );
  const [inputThirdPhone, setInputThirdPhone] = useState(
    data.telefones[2]?.telefone || ""
  );
  const navigate = useNavigate();
  useEffect(() => {
    API.get(`/users/${localStorage.getItem("@Userid")}`).then((res) =>
      setUser(res.data)
    );
  }, []);
  const sendData = () => {
    const data = {
      nome: inputName,
      emails: [inputEmail, inputSecondEmail, inputThirdEmail],
      telefones: [inputPhone, inputSecondPhone, inputThirdPhone],
    };
    // removing empty values
    data.emails = data.emails.filter((email) => email !== "");
    data.telefones = data.telefones.filter((telefone) => telefone !== "");

    // Verify if emails is not the same

    if (
      data.emails[0] === inputSecondEmail ||
      data.emails[0] === inputThirdEmail
    ) {
      return toast.warning("Não repetir emails");
    }
    if (data.emails[1] === inputThirdEmail || data.emails[1] === inputEmail) {
      return toast.warning("Não repetir emails");
    }
    if (data.emails[2] === inputSecondEmail || data.emails[2] === inputEmail) {
      return toast.warning("Não repetir emails");
    }

    // Verify if phones is not the same

    if (
      data.telefones[0] === inputSecondPhone ||
      data.telefones[0] === inputThirdPhone
    ) {
      return toast.warning("Não repetir telefones");
    }
    if (
      data.telefones[1] === inputThirdPhone ||
      data.telefones[1] === inputPhone
    ) {
      return toast.warning("Não repetir telefones");
    }
    if (
      data.telefones[2] === inputSecondPhone ||
      data.telefones[2] === inputPhone
    ) {
      return toast.warning("Não repetir telefones");
    }

    const testRegex = data.telefones.map((telefone) => {
      const regExp =
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
      return regExp.test(telefone);
    });

    if (inputEmail === "" || inputName === "" || inputPhone === "") {
      return toast.warning("Preencha ao menos um email nome e telefone");
    } else if (testRegex.includes(false)) {
      return toast.warning("Formato invalido de telefone");
    } else {
      if (rota === "patch") {
        let data: any = {
          telefones: [
            {
              id: user.telefones[0]?.id,
              telefone: inputPhone,
            },
            {
              id:
                // eslint-disable-next-line no-self-compare
                user.telefones[1]?.id === undefined
                  ? ""
                  : user.telefones[1]?.id,
              telefone: inputSecondPhone,
            },
            {
              id:
                // eslint-disable-next-line no-self-compare
                user.telefones[2]?.id === undefined
                  ? ""
                  : user.telefones[2]?.id,
              telefone: inputThirdPhone,
            },
          ],
          emails: [
            {
              id:
                // eslint-disable-next-line no-self-compare
                user.emails[0]?.id === undefined ? "" : user.emails[0]?.id,
              email: inputEmail,
            },
            {
              id:
                // eslint-disable-next-line no-self-compare
                user.emails[1]?.id === undefined ? "" : user.emails[1]?.id,
              email: inputSecondEmail,
            },
            {
              id:
                // eslint-disable-next-line no-self-compare
                user.emails[2]?.id === undefined ? "" : user.emails[2]?.id,
              email: inputThirdEmail,
            },
          ],
        };
        data.emails = data.emails.filter((email: any) => email.email !== "");
        data.telefones = data.telefones.filter(
          (telefone: any) => telefone.telefone !== ""
        );

        const updateUser = API.patch(
          `/users/${localStorage.getItem("@Userid")}`,
          data
        )
          .then((res) => {
            localStorage.setItem("@Userid", res.data.id);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((err) => console.log(err));

        return toast.promise(updateUser, {
          pending: "Atualizando usuario",
          success: "Usuario atualizado",
          error: "Algo deu errado",
        });
      } else {
        const toastPend = toast.loading("Criando usuario");
        API.post("/users", data)
          .then((res) => {
            localStorage.setItem("@Userid", res.data.id);
            setTimeout(() => {
              navigate(`/${localStorage.getItem("@Userid")}`);
            }, 2000);
            toast.update(toastPend, {
              render: "User criado",
              type: "success",
              isLoading: false,
              draggable: true,
              closeOnClick: true,
              autoClose: 2000,
              hideProgressBar: false,
            });
            toast.dismiss();
          })
          .catch((err) => {
            toast.update(toastPend, {
              render: "Email ja criado",
              type: "error",
              isLoading: false,
              draggable: true,
              closeOnClick: true,
              autoClose: 2000,
              hideProgressBar: false,
            });
            toast.dismiss();
          });
      }
    }
  };

  return (
    <FormStyled onSubmit={(e) => e.preventDefault()}>
      <Input
        label="Nome"
        type="text"
        placeholder="Leonardo Henrique"
        setState={setInputName}
        required={true}
        value={inputName}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Example@gmail.com"
        setState={setInputEmail}
        required={true}
        value={inputEmail}
      />
      <Input
        label="Segundo email"
        type="email"
        placeholder="Example@gmail.com"
        setState={setInputSecondEmail}
        value={inputSecondEmail}
      />
      <Input
        label="Terceiro email"
        type="email"
        placeholder="Example@gmail.com"
        setState={setInputThirdEmail}
        value={inputThirdEmail}
      />
      <Input
        label="Telefone"
        type="text"
        placeholder="+99 (99) 99999-9999"
        setState={setInputPhone}
        required={true}
        value={inputPhone}
      />
      <Input
        label="Segundo telefone"
        type="text"
        placeholder="+99 (99) 99999-9999"
        setState={setInputSecondPhone}
        value={inputSecondPhone}
      />
      <Input
        label="Terceiro telefone"
        type="text"
        placeholder="+99 (99) 99999-9999"
        setState={setInputThirdPhone}
        value={inputThirdPhone}
      />
      <button type="submit" onClick={sendData} className="send__data">
        Enviar
      </button>
    </FormStyled>
  );
};
