import { createContext, ReactNode, useContext, useState } from 'react';
import { ICertificate } from '../../types/certificate';

interface ContextType {
  selectedCertificate: ICertificate | null;
  changeSelectedCertificate: (certificate: ICertificate) => void;
  currentPage: 'certificates' | 'form';
  changeCurrentPage: (page: 'certificates' | 'form') => void;
}

const CertificateContext = createContext<ContextType | undefined>(undefined);

interface CertificateProviderProps {
  children: ReactNode;
}

export const CertificateProvider: React.FC<CertificateProviderProps> = ({ children }) => {
  const [selectedCertificate, setSelectedCertificate] = useState<ICertificate | null>(null);
  const [currentPage, setCurrentPage] = useState<'certificates' | 'form'>('certificates');

  const changeSelectedCertificate = (certificate: ICertificate) => {
    setSelectedCertificate(certificate);
  };

  const changeCurrentPage = (page: 'certificates' | 'form') => {
    setCurrentPage(page);
    window.location.hash = `${page}`;
  }

  return (
    <CertificateContext.Provider
      value={{
        selectedCertificate,
        currentPage,
        changeCurrentPage,
        changeSelectedCertificate,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificateContext must be used within a CertificateProvider');
  }
  return context;
};