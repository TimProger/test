import React, {useState} from 'react';
import s from './styles.module.scss'
import classNames from "classnames";
import useOnclickOutside from "react-cool-onclickoutside";
import { ICertificate } from '../../../types/certificate';

export interface ISelectProps {
  value: ICertificate | null;
  values: ICertificate[];
  onClick: (value: ICertificate) => void;
}

const Select: React.FC<ISelectProps> = ({value, values, onClick}) => {

  const [open, setOpen] = useState<boolean>(false)

  const ref = useOnclickOutside((e: any) => {
    setOpen(false)
  });

  return (
    <div ref={ref} className={classNames(s.select, {[s.select_active]: open})}>
        <div onClick={()=>(value && setOpen(prev => !prev))} className={s.value}>
            <p>{value ? value.NAME : 'Загрузка...'}</p>
            <svg style={{transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}} width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L9 9L17 1" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <div className={classNames(s.values, {[s.values_active]: open})}>
            {values.map((el)=>{
                return <div key={el.ID} onClick={()=>{
                    onClick(el)
                    setOpen(false)
                }} className={classNames(s.values__block)}>
                    <p>{el.NAME}</p>
                </div>
            })}
        </div>
    </div>
  );
};

export default Select;