import React from "react";

interface UserInfoFormProps {
  userName: string;
  companyName: string;
  setUserName: (name: string) => void;
  setCompanyName: (company: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  userName,
  companyName,
  setUserName,
  setCompanyName,
  onSubmit,
  loading,
}) => {
  return (
    <>
      <div className="input-group">
        <div className="input-container">
          <label className="label">Seu Nome</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input"
            placeholder="Digite seu nome"
          />
        </div>
        <div className="input-container">
          <label className="label">Sua Empresa</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="input"
            placeholder="Digite o nome da sua empresa"
          />
        </div>
      </div>

      <button onClick={onSubmit} className="button" disabled={loading}>
        {loading ? "Analisando..." : "Analisar Página e Gerar E-mail"}
      </button>
    </>
  );
};

export default UserInfoForm;
