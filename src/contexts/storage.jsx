export const createUsers = [
  {
    id: 1,
    nameUser: "admin",
    email: "admin@sab.com.br",
    tipoUser: "ADMIN",
    password: "admin",
  },
  {
    id: 2,
    nameUser: "user",
    email: "user@sab.com.br",
    tipoUser: "USER",
    password: "user",
  },
];

//---------------------------------------------

export const createContratoCeV = [
  {
    id: 1,
    numeroContrato: "1285",
    cdEndereco: "Rua Dona Cecília, 603",
  },
  {
    id: 2,
    numeroContrato: "2236",
    cdEndereco: "Rua Antônio Bastos, 603 Casa 3",
  },
  {
    id: 3,
    numeroContrato: "5585",
    cdEndereco: "Rua Panamericana 758, Ap 236 Bloco C",
  },
];

//-------------------------------------------------

export const createPessoaFisica = [
  {
    id: 1,
    cdPessoaFisica: 1,
    nomeCompleto: "Tiago Amaral Valcarenghi",
    cdEstadoCivil: 1,
    profissao: "Desenvolvedor",
    nacionalidade: "Brasileiro",
    ci: "",
    cnh: "321654621",
    docExtra: "",
    cpf: "1698308027",
    telefone: "51-984736159",
    telefoneAdicional: "",
    email: "tiago@teste.com.br",
    enderecoCompleto: "Rua Dona Cecília, 603 Vila City - Cachoeirinha-RS",
    logradouro: "Rua Dona Cecília",
    cep: "94935130",
    bairro: "Vila City",
    numero: "603",
    complemento: "",
    localidade: "Cachoeirinha",
    uf: "RS",
  },
];

export const pessoaJuridicaOptions = [
  { value: 1, label: "Santander" },
  { value: 2, label: "Banco do Brasil" },
  { value: 3, label: "Intermediarie Negocios Imobiliários" },
];

export const enderecoOptions = [
  { value: 1, label: "Rua Dona Cecília, 603" },
  { value: 2, label: "Rua João da Silva, 1030 Ap 403 Bloco 02" },
  { value: 3, label: "Avenida General Flores da Cunha, 1236" },
  { value: 4, label: "Rua Amapá, 180 Casa 2" },
];

export const contasOptions = [
  { value: 1, label: "Conta 01" },
  { value: 2, label: "Conta 02" },
  { value: 3, label: "Conta 03" },
];

export const contasCompCadastradasOptions = [
  { value: 1, label: "Rua Ubijarara Cardoso, 158" },
  { value: 2, label: "Bradesco" },
  { value: 3, label: "Jack Black" },
];

export const centroDeCustoOptions = [
  { value: 1, label: "Intermediação" },
  { value: 2, label: "Locação" },
  { value: 3, label: "Prestação de Serviços" },
];

////==========================================/////
export const baseContasComplementaresOptions = [
  {
    value: 1,
    label: "Rua Amapá, 180 Casa 2",
    cdCadatro: 12,
    cdTipoContaComp: 3,
  },
  {
    value: 2,
    label: "Tiago Amaral Valcarenghi",
    cdCadatro: 1,
    cdTipoContaComp: 1,
  },
  { value: 3, label: "Santander", cdCadatro: 8, cdTipoContaComp: 2 },
];

export const baseTipoContaComplementar = [
  { value: 1, label: "Pessoa Física" },
  { value: 2, label: "Pessoa Jurídica" },
  { value: 3, label: "Endereço" },
];
////==========================================/////
