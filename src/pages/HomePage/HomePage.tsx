import { useEffect, useState } from 'react';
import { ICertificate } from '../../../types/certificate';
import Certificates from './parts/certificates/Certificates';
import Form from './parts/form/Form';
import { useAppContext } from '../../contexts/certificates';

function App() {

  const [certificateArray, setCertificateArray] = useState<ICertificate[]>([]);

  const {
    currentPage,
    changeCurrentPage,
  } = useAppContext();

  useEffect(() => {
    window.location.hash = `certificates`;
    changeCurrentPage('certificates')
    fetch('https://sycret.ru/service/api/api', {method: 'POST', body: JSON.stringify({
      APIKey: '011ba11bdcad4fa396660c2ec447ef14',
      MethodName: 'OSGetGoodList'
    })}).then(res => res.json()).then(data => setCertificateArray(data.data));
  }, [changeCurrentPage])

  const displayPages = () => {
    if(currentPage === 'certificates'){
      return <Certificates certificateArray={certificateArray} />
    }
    if(currentPage === 'form'){
      return <Form />
    }else{
      return <></>
    }
  }

  return (
    <div className="App">
      {displayPages()}
    </div>
  );
}

export default App;
