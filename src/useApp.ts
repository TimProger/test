import { useEffect, useState } from "react";
import { ICertificate } from "../types/certificate";

interface IUseAppProps {
    certificateArray: ICertificate[]
}

const useApp = ({certificateArray}: IUseAppProps) => {

    const [selectedCertificate, setSelectedCertificate] = useState<ICertificate | null>(null);
    const [currentPage, setCurrentPage] = useState<'certificates' | 'form'>('certificates');

    useEffect(() => {
        if(!!certificateArray.length){
            setSelectedCertificate(certificateArray[0]);
        }
    }, [certificateArray])
  
    const changeSelectedCertificate = (certificate: ICertificate) => {
      setSelectedCertificate(certificate);
    }

    const changeCurrentPage = (page: 'certificates' | 'form') => {
        setCurrentPage(page);
    }

    return {
        selectedCertificate,
        changeSelectedCertificate,
        currentPage,
        changeCurrentPage
    }
}

export default useApp