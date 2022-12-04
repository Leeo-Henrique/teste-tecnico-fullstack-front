import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../api";
import { User } from "../report";
import { MainStyled } from "./assets/styles";
import { FaTrashAlt } from "react-icons/fa";
import { phoneFormat } from "../../utils/formatPhone";
import { toast } from "react-toastify";

interface Props {
  openModal: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}
export const ClientPage = ({ openModal, setShowModal, showModal }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@Token");
    if (!token) {
      return navigate("/criarcontato");
    }
    API.get(`/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeContact = (contactId: string) => {
    const token = localStorage.getItem("@Token");
    API.delete(`/users/${contactId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        toast.success("Contato removido com sucesso");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => console.log(err));
  };
  return (
    <MainStyled>
      <ul>
        {users.length === 0 ? (
          <div className="contacts__empty">
            <h1>Nenhum contato cadastrado?</h1>
            <Link to="/criarcontato">Cadastrar contato</Link>
          </div>
        ) : (
          users?.map((user) => {
            return (
              <li key={user.id}>
                <button
                  onClick={(e) => {
                    removeContact(user.id);
                  }}
                >
                  <FaTrashAlt />
                </button>
                <div>
                  <h2>
                    Nome: <br />
                    <p>{user.nome}</p>
                  </h2>
                </div>
                <div>
                  <h2>
                    Emails: <br />
                  </h2>
                  {user.emails.map((email: any) => {
                    return (
                      <p className="about__user" key={email.id}>
                        {email.email}
                      </p>
                    );
                  })}
                </div>
                <div>
                  <h2>
                    Telefones: <br />
                  </h2>
                  {user.telefones.map((telefone: any) => {
                    return (
                      <p className="about__user" key={telefone.id}>
                        {phoneFormat(telefone.telefone)}
                      </p>
                    );
                  })}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </MainStyled>
  );
};
