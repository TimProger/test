import React from 'react';
import './styles.module.scss';
import { ICertificate } from '../../../types/certificate';
import Input from '../../components/Input/Input';
import useForm from './useForm';

interface IFormProps {
}

const Form: React.FC<IFormProps> = ({}) => {

  const {
    formData,
    onChangeName,
    errors,
    onChangeDescription,
    onChangeEmail,
    onChangePhone,
  } = useForm()

  return (
    <div className="Form">
      <Input value={formData.name} onChange={onChangeName} key="name" placeholder="Введите..." error={!!errors.name.length} />
      <Input value={formData.description} onChange={onChangeDescription} key="description" placeholder="Введите..." />
      <Input value={formData.email} onChange={onChangeEmail} key="email" placeholder="Введите..." error={!!errors.email.length} />
      <Input value={formData.phone} onChange={onChangePhone} key="phone" placeholder="Введите..." error={!!errors.phone.length} />
    </div>
  );
}

export default Form;
