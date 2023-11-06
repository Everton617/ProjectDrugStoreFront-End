import { useState, useEffect } from "react";
import { useProductDataUpdate } from "../../hooks/useProductDataUpdate";
import { ProductData } from "../../interface/ProductData";


interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: any): void;
}

interface ModalProps {
  closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input value={value} onChange={(e) => updateValue(e.target.value)}></input>
    </>
  );
};

export function UpdateModal({ closeModal }: ModalProps) {
  const [codigo, setCodigo] = useState(0); // 
  const [name, setName] = useState("");
  const [marca, setMarca] = useState("");
  const [classe, setClasse] = useState("");
  const [qtdestoque, setQtdestoque] = useState(0);
  const { mutate, isSuccess } = useProductDataUpdate();

  const submit = () => {
    if (!codigo || !name || !marca || !classe || !qtdestoque) {
      window.alert("Por favor, preencha todos os campos!");
      return;
    }
    const productData: ProductData = {
        codigo,
        name,
        marca,
        classe,
        qtdestoque,
    };
    mutate({ id: codigo, data: productData });
};

  useEffect(() => {
    if (!isSuccess) return;
    closeModal();
  }, [isSuccess]);

  return (
    <div className="modal-overflow">
      <div className="modal-body">
        <h2>Atualize um medicamento</h2>
        <form className="input-container">
          <Input label="Código:" value={codigo} updateValue={setCodigo} />
          <Input label="Nome:" value={name} updateValue={setName} />
          <Input label="Marca:" value={marca} updateValue={setMarca} />
          <Input label="Classe:" value={classe} updateValue={setClasse} />
          <Input
            label="Quantidade:"
            value={qtdestoque}
            updateValue={setQtdestoque}
          />
        </form>
        <button onClick={submit} className="btn-secondary">
          Atualizar
        </button>
      </div>
    </div>
  );
}
