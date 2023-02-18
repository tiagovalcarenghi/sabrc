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
    nameUser: "master",
    email: "master@sab.com.br",
    tipoUser: "MASTER",
    password: "master",
  },
  {
    id: 3,
    nameUser: "standard",
    email: "standard@sab.com.br",
    tipoUser: "STANDARD",
    password: "standard",
  },
];

//---------------------------------------------

export const createPessoaFisica = [
  {
    id: 1,
    cdPessoaFisica: 1,
    nomeCompleto: "Tiago Amaral Valcarenghi",
    cdEstadoCivil: 1,
    profissao: "Desenvolvedor",
    nacionalidade: "Brasileiro",
    ci: "2100511134",
    cnh: "321654621",
    docExtra: "",
    cpf: "01698308027",
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
  {
    id: 2,
    cdPessoaFisica: 2,
    nomeCompleto: "Elvis Sandro Valcarenghi",
    cdEstadoCivil: 2,
    profissao: "Gerente",
    nacionalidade: "Brasileiro",
    ci: "",
    cnh: "21312421421",
    docExtra: "teste 2131231321",
    cpf: "12345678985",
    telefone: "51-985855692",
    telefoneAdicional: "51-34412056",
    email: "esv@teste.com.br",
    enderecoCompleto: "Travessa Planalto, 56 Ap 520 Bloco 05 Parque da Matriz - Cachoeirinha-RS ",
    logradouro: "Travessa Planalto",
    cep: "949385669",
    bairro: "Parque da Matriz",
    numero: "56",
    complemento: "Ap 520 Bloco 05",
    localidade: "Cachoeirinha",
    uf: "RS",
  },
  {
    id: 3,
    cdPessoaFisica: 3,
    nomeCompleto: "John Connor",
    cdEstadoCivil: 4,
    profissao: "Advogado",
    nacionalidade: "Americano",
    ci: "",
    cnh: "",
    docExtra: "ID: 456878563654",
    cpf: "",
    telefone: "84-8885985265",
    telefoneAdicional: "",
    email: "johnconnor@teste.com.br",
    enderecoCompleto: "Rua Dona Cecília, 805 Vila City - Cachoeirinha-RS",
    logradouro: "Rua Dona Cecília",
    cep: "94935130",
    bairro: "Vila City",
    numero: "805",
    complemento: "",
    localidade: "Cachoeirinha",
    uf: "RS",
  },
];

//-------------------------------------------------

export const createPessoaJuridica = [
  {
    id: 1,
    cdPessoaJuridica: 1,
    nomeEmpresarial: "SAB",
    emailContato: "sab@sab.com.br",
    cnpj: "66546400016546546",
    cep: "9493699",
    logradouro: "Rua 1",
    bairro: "Vila Teste",
    numero: "456",
    complemento: "",
    uf: "SC",
    localidade: "Florianópolis",
    representantesLegais: [
      {
        id: 1,
        cdPessoaFisica: 2,
        nomeRepresentante: "Elvis Sandro Valcarenghi",
      },
      {
        id: 2,
        cdPessoaFisica: 3,
        nomeRepresentante: "John Connor"
      },
    ],
  },
  {
    id: 2,
    cdPessoaJuridica: 2,
    nomeEmpresarial: "Lojas Quero-Quero",
    emailContato: "lojasqueroquero@lqq.com.br",
    cnpj: "122132132124216",
    cep: "120023554",
    logradouro: "Rua 2",
    bairro: "Vila Teste 2",
    numero: "1025",
    complemento: "",
    uf: "PR",
    localidade: "Toledo",
    representantesLegais: [
      {
        id: 1,
        cdPessoaFisica: 1,
        nomeRepresentante: "Tiago Amaral Valcarenghi",
      },
    ],
  },
];

//-------------------------------------------------

// export const pessoaJuridicaOptions = [
//   { value: 1, label: "Santander" },
//   { value: 2, label: "Banco do Brasil" },
//   { value: 3, label: "Intermediarie Negocios Imobiliários" },
// ];

// export const enderecoOptions = [
//   { value: 1, label: "Rua Dona Cecília, 603" },
//   { value: 2, label: "Rua João da Silva, 1030 Ap 403 Bloco 02" },
//   { value: 3, label: "Avenida General Flores da Cunha, 1236" },
//   { value: 4, label: "Rua Amapá, 180 Casa 2" },
// ];

// export const contasOptions = [
//   { value: 1, label: "Conta 01" },
//   { value: 2, label: "Conta 02" },
//   { value: 3, label: "Conta 03" },
// ];

// export const contasCompCadastradasOptions = [
//   { value: 1, label: "Rua Ubijarara Cardoso, 158" },
//   { value: 2, label: "Bradesco" },
//   { value: 3, label: "Jack Black" },
// ];

// export const centroDeCustoOptions = [
//   { value: 1, label: "Intermediação" },
//   { value: 2, label: "Locação" },
//   { value: 3, label: "Prestação de Serviços" },
// ];

// export const baseContasComplementaresOptions = [
//   {
//     value: 1,
//     label: "Rua Amapá, 180 Casa 2",
//     cdCadatro: 12,
//     cdTipoContaComp: 3,
//   },
//   {
//     value: 2,
//     label: "Tiago Amaral Valcarenghi",
//     cdCadatro: 1,
//     cdTipoContaComp: 1,
//   },
//   { value: 3, label: "Santander", cdCadatro: 8, cdTipoContaComp: 2 },
// ];

// export const baseTipoContaComplementar = [
//   { value: 1, label: "Pessoa Física" },
//   { value: 2, label: "Pessoa Jurídica" },
//   { value: 3, label: "Endereço" },
// ];
