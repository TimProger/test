import React from 'react';
import s from './styles.module.scss'
import classNames from "classnames";

export interface IButtonProps {
  children: React.ReactNode | string;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  type?: 'btn';
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

const Button: React.FC<IButtonProps> = ({
                                          children,
                                          className,
                                          onClick,
                                          type = 'btn',
                                          disabled,
                                        }) => {
  const cn = classNames(
    s.btn,
    className)
  switch (type){
    case 'btn':
      return (
        <button
          disabled={disabled}
          onClick={(e) => {
            if(!disabled && onClick){
              onClick(e)
            }
          }}
          className={cn}
        >
          {children}
        </button>
      )
  }
};

export default Button;