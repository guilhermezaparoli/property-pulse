import { ReactNode } from "react";
import "@/assets/styles/globals.css"


export const metadata = {
  title: 'PropertyPulse | Find The Perfect Rental ',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, find properties'
}
interface MainLayoutProps {
  children?: ReactNode
}

const MainLayout = ({children}: MainLayoutProps) => {
  return (
    <html lang="pt-br">
      <body>
       {children}
      </body>
    </html>
  );
};

export default MainLayout;
