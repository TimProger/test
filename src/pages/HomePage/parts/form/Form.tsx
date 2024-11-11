import React from 'react';
import s from './styles.module.scss';
import Input from '../../../../components/Input/Input';
import useForm from './useForm';
import Button from '../../../../components/Button/Button';
import { useAppContext } from '../../../../contexts/certificates';

interface IFormProps {
}

const Form: React.FC<IFormProps> = () => {

  const {
    selectedCertificate,
    changeCurrentPage,
  } = useAppContext();

  const {
    formData,
    onChangeName,
    errors,
    onChangeMessage,
    onChangeEmail,
    onChangePhone,
    buyHandler
  } = useForm({selectedCertificate})

  return (
    <div className={s.form}>
      <div className={s.form__container}>
        <div className={s.input}>
          <p>Имя</p>
          <Input value={formData.name} onChange={onChangeName} name="name" placeholder="Введите..." error={errors.name[0]} />
        </div>
        <div className={s.input}>
          <p>Телефон</p>
          <Input value={formData.phone} onChange={onChangePhone} name="phone" placeholder="Введите..." error={errors.phone[0]} />
        </div>
        <div className={s.input}>
          <p>Сообщение</p>
          <Input value={formData.message} onChange={onChangeMessage} name="description" placeholder="Введите..." />
        </div>
        <div className={s.input}>
          <p>Почта</p>
          <Input value={formData.email} onChange={onChangeEmail} name="email" placeholder="Введите..." error={errors.email[0]} />
        </div>
        <div className={s.btns}>
          <Button onClick={()=>changeCurrentPage('certificates')}>Назад</Button>
          <Button onClick={buyHandler}>Оплатить</Button>
        </div>
      </div>
    </div>
  );
}

export default Form;
