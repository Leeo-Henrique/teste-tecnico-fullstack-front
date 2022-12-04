import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../api";
import { MainStyled } from "./assets/styles";
import { HiPencilAlt } from "react-icons/hi";
import { ModalUpdate } from "../../components/modalUpdate";
import { phoneFormat } from "../../utils/formatPhone";
interface Email {
  id: string;
  email: string;
}
interface Telefone {
  id: string;
  telefone: string;
}
export interface User {
  nome: string;
  id: string;
  created: string;
  emails: Email[];
  telefones: Telefone[];
}
export const ReportPage = ({ openModal, showModal, setShowModal }: any) => {
  const [user, setUser] = useState<User[]>([]);

  const params = useParams();

  useEffect(() => {
    API.get(`/users/${params.id}`)
      .then((res) => {
        setUser([res.data]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <MainStyled>
        <ul>
          {user?.map((aboutUser) => {
            return (
              <li key={aboutUser.id}>
                <button
                  onClick={(e) => {
                    openModal();
                  }}
                >
                  <HiPencilAlt />
                </button>
                <div>
                  <h2>
                    Nome: <br />
                    <p>{aboutUser.nome}</p>
                  </h2>
                </div>
                <div>
                  <h2>
                    Emails: <br />
                  </h2>
                  {aboutUser.emails.map((email: any) => {
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
                  {aboutUser.telefones.map((telefone: any) => {
                    return (
                      <p className="about__user" key={telefone.id}>
                        {phoneFormat(telefone.telefone)}
                      </p>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </MainStyled>
      {showModal && (
        <ModalUpdate
          showModal={showModal}
          setShowModal={setShowModal}
          data={user[0]}
        />
      )}
    </>
  );
};
