import { ReactNode } from "react";

interface layoutProps {
  children?: ReactNode
}

const layout = ({children}: layoutProps) => {
  return (
    <html lang="pt-br">
      <body>
       {children}
      </body>
    </html>
  );
};

export default layout;
