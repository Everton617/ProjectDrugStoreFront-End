import { useProductData } from './hooks/useProductData';
import './App.css';
import { useState } from 'react';
import { Row } from './components/Row';
import { ChangeEvent } from 'react';
import {SiAddthis} from 'react-icons/si'
import {GrUpdate} from 'react-icons/gr'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import { CreateModal } from './components/create-modal/create-modal';
import { UpdateModal } from './components/update-modal/update-modal';
import { DeleteModal } from './components/delete-modal/delete-modal';


function App() {
  const { data } = useProductData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');


  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchBy(event.target.value);
  };

  const sortedData = data?.sort((a, b) => a.codigo - b.codigo); // Ordena os dados pelo código
  const filteredData = sortedData?.filter((productData) =>
    productData[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModalUpdate = () => {
    setIsModalUpdateOpen(prev => !prev)
  }

  const handleOpenModalDelete = () => {
    setIsModalDeleteOpen(prev => !prev)
  }


  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  

  return (
    <div className="container">
      <h1>DrugStore</h1>
      <div className="search-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Pesquisar produto..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <span>por</span>
          <select value={searchBy} onChange={handleSelectChange} className='select'>
            <option value="name">Nome</option>
            <option value="marca">Marca</option>
            <option value="classe">Classe</option>
          </select>
        </div>
        <div className="crud-container">
          
          <span className='btn-add' onClick={handleOpenModal}>
          <SiAddthis/>
          </span>

          <span className='btn-uptade' onClick={handleOpenModalUpdate}>
          <GrUpdate/>
          </span>

          <span className='btn-delete' onClick={handleOpenModalDelete}>
          <RiDeleteBin6Fill/>
          </span>
          {isModalUpdateOpen&& <UpdateModal closeModal={handleOpenModalUpdate}/>}
          {isModalDeleteOpen&& <DeleteModal closeModal={handleOpenModalDelete}/>}
          {isModalOpen&& <CreateModal closeModal={handleOpenModal}/>}
        </div>
      <div className='container-table'>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Marca</th>
              <th>Classe</th>
              <th>Quantidade em Estoque</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((productData) => (
              <Row
                key={productData.codigo}
                codigo={productData.codigo}
                name={productData.name}
                marca={productData.marca}
                classe={productData.classe}
                qtdestoque={productData.qtdestoque}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
