import { useState } from "react"

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const useForm = () => {

    const [formData, setFormData] = useState<{
        name: string;
        phone: string;
        description: string;
        email: string;
    }>({
        name: '',
        phone: '+7 (___) ___-__-__',
        description: '',
        email: ''
    })

    const [errors, setErrors] = useState<{
        name: string;
        phone: string;
        email: string;
    }>({
        name: '',
        phone: '',
        email: ''
    })

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        errors.name = ''
        if(e.target.value.length < 3) {
            errors.name = 'Имя должно быть заполнено'
        }
        setFormData({...formData, name: e.target.value})
        setErrors(JSON.parse(JSON.stringify(errors)))
    }

    const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, description: e.target.value})
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        errors.email = ''
        if(!validEmailRegex.test(e.target.value)) {
            errors.email = 'Вы ввели некорректную почту'
        }
        setErrors(JSON.parse(JSON.stringify(errors)))
        setFormData({...formData, email: e.target.value})
    }

    // Вынес форматирование телефона для лучшей читаемости
    const formatPhoneNumber = (value: string) => {
        const digits = value.replace(/\D/g, "");
        let formatted = "+7 (",
            fullStr = '___) ___-__-__'
    
        if (digits.length > 1) formatted += digits.slice(1, 4);
        if (digits.length >= 5) formatted += `) ${digits.slice(4, 7)}`;
        if (digits.length >= 8) formatted += `-${digits.slice(7, 9)}`;
        if (digits.length >= 10) formatted += `-${digits.slice(9, 11)}`;
        formatted = `${formatted}${fullStr.slice(formatted.length-4, fullStr.length)}`

        return formatted;
      };
    
      const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target,
              start = input.selectionStart;
    
        const rawValue = input.value;
        const formattedValue = formatPhoneNumber(rawValue);
    
        // Сделано при помощи ChatGPT для решения проблемы с курсором, который возвращался в конец текста после ввода одного символа
        let digitCountBeforeCursor = (rawValue.slice(0, start || 0).match(/\d/g) || []).length;
        const newCursorPosition = formattedValue.split('').reduce((pos, char) => {
          if (digitCountBeforeCursor > 0) {
            if (/\d/.test(char)) {
              digitCountBeforeCursor--;
            }
            pos++;
          }
          return pos;
        }, 0);
    
        setFormData({...formData, phone: formattedValue})
    
        requestAnimationFrame(() => {
          input.setSelectionRange(newCursorPosition, newCursorPosition);
        });
      };
    
    return {
        formData,
        errors,
        onChangeName,
        onChangeDescription,
        onChangeEmail,
        onChangePhone
    }
}

export default useForm