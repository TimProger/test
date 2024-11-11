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
        phone: '+7',
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

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        let phoneVal = e.target.value.replace(/\D/g, ""),
          formattedPhone = `+7 `;

        errors.phone = ''

        if (phoneVal.length > 1) {
          formattedPhone += '' + phoneVal.substring(1, 4);
        }
    
        if (phoneVal.length >= 5) {
          formattedPhone += ' ' + phoneVal.substring(4, 7);
        }
    
        if (phoneVal.length >= 8) {
          formattedPhone += ' ' + phoneVal.substring(7, 9);
        }
    
        if (phoneVal.length >= 10) {
          formattedPhone += ' ' + phoneVal.substring(9, 11);
        }
        if(formattedPhone === formData.phone) return
        setFormData({...formData, phone: formattedPhone})
        if(formattedPhone.length < 16) {
            errors.phone = 'Вы ввели некорректный телефон'
        }
        setErrors(JSON.parse(JSON.stringify(errors)))
    }
    
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