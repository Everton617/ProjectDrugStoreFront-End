
import { useProductDataDelete } from "../../hooks/useProductDataDelete";
import { useState, useEffect } from "react";
import "./delete-modal.css";

interface DeleteModalProps {
  closeModal: () => void;
}

export function DeleteModal({ closeModal }: DeleteModalProps) {
  const [codigo, setCodigo] = useState<number>(0); // Definindo o estado como um número
  const { mutate, isSuccess } = useProductDataDelete();

  const submit = () => {
    if (!codigo) {
      window.alert("Por favor, insira o código do medicamento a ser excluído!");
      return;
    }
    mutate(codigo);
  };

  useEffect(() => {
    if (!isSuccess) return;
    closeModal();
  }, [isSuccess]);

  return (
    <div className="modal-delete">
      <div className="modal-body-delete">
        <h2>Excluir um medicamento</h2>
        <form className="input-container">
          <label>Código:</label>
          <input
            value={codigo}
            onChange={(e) => setCodigo(parseInt(e.target.value))} 
          ></input>
        </form>
        <button onClick={submit} className="btn-secondary">
          Excluir
        </button>
      </div>
    </div>
  );
}
