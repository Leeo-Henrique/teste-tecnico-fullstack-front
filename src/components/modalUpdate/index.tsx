import Modal from "react-modal";
import { User } from "../../pages/report";
import { Form } from "../form";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  data: User;
}
export const ModalUpdate = ({ setShowModal, showModal, data }: Props) => {
  let subtitle: any;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={showModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Form rota={"patch"} data={data} />
      </Modal>
    </div>
  );
};
