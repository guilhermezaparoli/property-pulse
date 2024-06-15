import Navbar from '../components/Navbar';
import { ReactNode } from 'react';
import '@/assets/styles/globals.css';
import Footer from '../components/Footer';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'PropertyPulse | Find The Perfect Rental ',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, find properties',
};
interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <AuthProvider>
      <html lang="pt-br">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
