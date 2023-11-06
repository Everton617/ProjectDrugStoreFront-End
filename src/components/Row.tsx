import "./Row.css"

interface RowProps{
    codigo?: number,
    name: string,
    marca : string,
    classe : string,
    qtdestoque : number
}

export function Row({codigo = 0,name, marca, classe, qtdestoque} : RowProps){
    return(
        <tr className="row">
            <td>{codigo}</td>
            <td>{name}</td>
            <td>{marca}</td>
            <td>{classe}</td>
            <td>{qtdestoque}</td>
        </tr>
    )
}