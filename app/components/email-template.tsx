import * as React from "react";

interface EmailTemplateProps {
  code: number; // Recibe el código como prop
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  code,
}) => (
  <div>
    <h1>Your Code Is {code}</h1>
  </div>
);
