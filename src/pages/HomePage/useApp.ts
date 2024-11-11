import { useState } from "react";
import { ICertificate } from "../../../types/certificate";

const useApp = () => {

    const [selectedCertificate, setSelectedCertificate] = useState<ICertificate | null>(null);
    const [currentPage, setCurrentPage] = useState<'certificates' | 'form'>('certificates');
  
    const changeSelectedCertificate = (certificate: ICertificate) => {
      setSelectedCertificate(certificate);
    }

    const changeCurrentPage = (page: 'certificates' | 'form') => {
        setCurrentPage(page);
        window.location.hash = `${page}`;
    }

    return {
        selectedCertificate,
        changeSelectedCertificate,
        currentPage,
        changeCurrentPage
    }
}

export default useApp