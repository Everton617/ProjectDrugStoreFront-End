import { useState, useEffect } from "react"
import { useProductDataMutate } from "../../hooks/useProductDataMutate";
import { ProductData } from "../../interface/ProductData";
import "./create-modal.css"

interface InputProps{
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface ModalProps{
    closeModal():void
}


const Input = ({ label, value, updateValue}: InputProps) => {
    return(
        <>
        <label>{label}</label>
        <input value={value} onChange={e => updateValue(e.target.value)}></input>
        </>
    )
}



export function CreateModal({closeModal}: ModalProps){
const [name, setName] = useState("");
const [marca, setMarca] = useState("");
const [classe, setClasse] = useState("");
const [qtdestoque, setQtdestoque] = useState(0);
const { mutate,isSuccess} = useProductDataMutate();

const submit = () => {
    if (!name || !marca || !classe || !qtdestoque) {
        window.alert("Por favor, preencha todos os campos!");
        return;
      }
    const productData: ProductData = {
        name,
        marca,
        classe,
        qtdestoque
    }
    mutate(productData)
}

useEffect(() =>{
    if(!isSuccess) return
    closeModal();

}, [isSuccess])


    return(
        <div className="modal-overflow">
            <div className="modal-body">
                <h2>Cadastre um novo medicamento</h2>
                <form className="input-container">
                    <Input label="Nome:" value={name} updateValue={setName} /> 
                    <Input label="Marca:" value={marca} updateValue={setMarca}/>
                    <Input label="Classe:" value={classe} updateValue={setClasse}/>
                    <Input label="Quantidade:" value={qtdestoque} updateValue={setQtdestoque}/>
                </form>
                <button onClick={submit} className="btn-secundary">Enviar</button>
            </div>
        </div>
    )
}