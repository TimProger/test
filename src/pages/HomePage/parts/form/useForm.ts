import { useState } from "react"
import { ICertificate } from "../../../../../types/certificate";

const validEmailRegex = RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

interface IUseFormProps {
    selectedCertificate: ICertificate | null;
}

const useForm = ({
    selectedCertificate,
}: IUseFormProps) => {

    const [formData, setFormData] = useState<{
        name: string;
        phone: string;
        message: string;
        email: string;
    }>({
        name: '',
        phone: '+7 (___) ___-__-__',
        message: '',
        email: ''
    })

    const [errors, setErrors] = useState<{
        name: [boolean, string];
        phone: [boolean, string];
        email: [boolean, string];
    }>({
        name: [false, 'Введите имя'],
        phone: [false, 'Введите телефон'],
        email: [false, 'Введите почту']
    })

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        errors.name = [false, '']
        if(e.target.value.length < 3) {
            errors.name = [true, 'Имя должно быть заполнено']
        }
        setFormData({...formData, name: e.target.value})
        setErrors(JSON.parse(JSON.stringify(errors)))
    }

    const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, message: e.target.value})
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        errors.email = [false, '']
        if(!validEmailRegex.test(e.target.value)) {
            errors.email = [true, 'Вы ввели некорректную почту']
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
        
        errors.phone = [false, '']
        if(formattedValue[formattedValue.length-1] === '_'){
            errors.phone = [false, 'Введите корректный номер телефона']
            setErrors(JSON.parse(JSON.stringify(errors)))
        }
    
        requestAnimationFrame(() => {
          input.setSelectionRange(newCursorPosition, newCursorPosition);
        });
      };

    const buyHandler = () => {
        if(selectedCertificate){
            let isError = false
            for (const key of Object.keys(errors)) {
                // @ts-ignore
                if (errors[key][1]) {
                    // @ts-ignore
                    errors[key][0] = true
                    isError = true
                    continue;
                }
            }
            setErrors(JSON.parse(JSON.stringify(errors)))
            if(isError){
                return
            }
            fetch('https://sycret.ru/service/api/api', {method: 'POST', body: JSON.stringify({
                APIKey: '011ba11bdcad4fa396660c2ec447ef14',
                MethodName: 'OSSale',
                Id: selectedCertificate.ID,
                TableName: selectedCertificate.TABLENAME,
                PrimaryKey: selectedCertificate.PRIMARYKEY,
                Price: selectedCertificate.PRICE,
                Summa: selectedCertificate.SUMMA,
                ClientName: formData.name,
                Phone: formData.phone.replace(/\D/g, ""),
                Email: formData.email,
                PaymentTypeId: 2,
                UseDelivery: 0,
                isGift: 0,
                MsgText: formData.message
              })}).then(res => res.json()).then(data => console.log(data));
        }
    }
    
    return {
        formData,
        errors,
        onChangeName,
        onChangeMessage,
        onChangeEmail,
        onChangePhone,
        buyHandler,
    }
}

export default useForm