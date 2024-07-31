import Navbar from '../components/Navbar';
import { ReactNode } from 'react';
import Footer from '../components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';
import 'photoswipe/dist/photoswipe.css'
import { GlobalProvider } from '@/context/GlobalContext';
export const metadata = {
  title: 'PropertyPulse | Encontre o aluguel perfeito ',
  description: 'Encontre o imóvel dos seus sonhos para alugar',
  keywords: 'alugar, encontrar aluguéis, encontrar imóveis, encontrar casas',
};
interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
      <GlobalProvider>
    <AuthProvider>

      <html lang="pt-br">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer/>
        </body>
      </html>
    </AuthProvider>
      </GlobalProvider>
  );
};

export default MainLayout;
