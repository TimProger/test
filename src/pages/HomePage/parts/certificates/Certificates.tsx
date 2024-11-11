import React from 'react';
import s from './styles.module.scss';
import { ICertificate } from '../../../../../types/certificate';
import Select from '../../../../components/Select/Select';
import Button from '../../../../components/Button/Button';
import classNames from 'classnames';
import { useAppContext } from '../../../../contexts/certificates';

interface ICertificatesProps {
    certificateArray: ICertificate[];
}

const Certificates: React.FC<ICertificatesProps> = ({certificateArray = []}) => {

    const {
      selectedCertificate,
      changeCurrentPage,
      changeSelectedCertificate,
    } = useAppContext();

    return (
        <div className={s.certificates}>
            <div className={s.certificates__container}>
                <div className={s.options}>
                    <Select value={selectedCertificate} values={certificateArray} onClick={changeSelectedCertificate} />
                </div>
                <div className={classNames(s.price, {[s.price_active]: selectedCertificate})}>
                    {selectedCertificate && <>
                        <p>Цена - <span>{selectedCertificate.SUMMA} р.</span></p>
                        <Button onClick={()=>changeCurrentPage('form')}>Оформить</Button>
                    </>}
                </div>
            </div>
        </div>
    );
}

export default Certificates;
