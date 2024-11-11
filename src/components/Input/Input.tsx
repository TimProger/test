import React from 'react';
import s from './styles.module.scss'
import classNames from "classnames";

export interface IInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  className?: string;
  type?: 'text' | 'textarea' | 'number' | 'password';
  error?: boolean;
  placeholder: string;
  name: string;
  maxLength?: number;
}

const Input: React.FC<IInputProps> = ({
                                          value,
                                          onChange,
                                          className,
                                          type = 'text',
                                          error,
                                          placeholder,
                                          name,
                                          onClick,
                                          maxLength
                                        }) => {

  const cn = classNames(
    s.input,
    className,
    {[s.input_error]: error})

  switch (type){
    case 'text':
      return (
        <div className={cn}>
          <input
            className={s.input_input}
            name={name}
            type={'text'}
            value={value}
            onClick={onClick}
            onChange={(e) => onChange(e)}
            maxLength={maxLength}
            placeholder={placeholder}
          />
        </div>
      )
    default:
        return (
            <div></div>
        )
  }
};

export default Input;