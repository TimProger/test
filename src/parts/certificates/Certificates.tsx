import React, { useEffect } from 'react';
import s from './styles.module.scss';
import { ICertificate } from '../../../types/certificate';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';

interface ICertificatesProps {
    selectedCertificate: ICertificate | null;
    changeSelectedCertificate: (certificate: ICertificate) => void;
    certificateArray: ICertificate[];
    changeCurrentPage: (page: 'certificates' | 'form') => void
}

const Certificates: React.FC<ICertificatesProps> = ({changeCurrentPage, certificateArray = [], selectedCertificate, changeSelectedCertificate}) => {

    return (
        <div className={s.certificates}>
            {<Select value={selectedCertificate} values={certificateArray} onClick={changeSelectedCertificate} />}
            <Button onClick={()=>changeCurrentPage('form')}>Офоримить</Button>
        </div>
    );
}

export default Certificates;
