import React, { useEffect, useState } from 'react';
import './App.css';
import { ICertificate } from '../types/certificate';
import Certificates from './parts/certificates/Certificates';
import useApp from './useApp';
import Form from './parts/form/Form';

function App() {

  const [certificateArray, setCertificateArray] = useState<ICertificate[]>([]);

  useEffect(() => {
    fetch('https://sycret.ru/service/api/api', {method: 'POST', body: JSON.stringify({
      APIKey: '011ba11bdcad4fa396660c2ec447ef14',
      MethodName: 'OSGetGoodList'
    })}).then(res => res.json()).then(data => setCertificateArray(data.data));
  }, [])

  const {
    currentPage,
    selectedCertificate,
    changeSelectedCertificate,
    changeCurrentPage
  } = useApp({certificateArray})

  const displayPages = () => {
    if(currentPage === 'certificates'){
      return <Certificates changeCurrentPage={changeCurrentPage} selectedCertificate={selectedCertificate} changeSelectedCertificate={changeSelectedCertificate} certificateArray={certificateArray} />
    }
    if(currentPage === 'form'){
      return <Form />
    }
  }

  return (
    <div className="App">
      {displayPages()}
    </div>
  );
}

export default App;
