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
    enderecoCompleto: "Rua 1, 456 Vila Teste - Florianopolis-SC"
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
    enderecoCompleto: "Rua 2, 1025 Vila Teste 2 - Toledo-PR"
  },
];


export const createRepresentantesLegaisBase = [
  {
    id: 1,
    cdPessoaJuridica: 1,
    cdPessoaFisica: 2,
    nomeRepresentante: "Elvis Sandro Valcarenghi",
  },
  {
    id: 2,
    cdPessoaJuridica: 1,
    cdPessoaFisica: 3,
    nomeRepresentante: "John Connor",
  },
  {
    id: 3,
    cdPessoaJuridica: 2,
    cdPessoaFisica: 1,
    nomeRepresentante: "Tiago Amaral Valcarenghi",
  },
];

export const createRepresentantesLegaisOptions = [
  {
    id: 1,
    cdPessoaFisica: 1,
    nomeRepresentante: "Tiago Amaral Valcarenghi",
  },
  {
    id: 2,
    cdPessoaFisica: 2,
    nomeRepresentante: "Elvis Sandro Valcarenghi",
  },
  {
    id: 3,
    cdPessoaFisica: 3,
    nomeRepresentante: "John Connor"
  },
]


//-------------------------------------------------

export const createContasContabeis = [
  {
    id: 1,
    cdContaContabil: 1,
    desContaContabil: 'Conta Patrimonial 1',
    cdTipoConta: 1,
    descTipoConta: 'Patrimonial',
    saldo: 7500.36,
    cdTipoSaldo: 1,
    descTipoSaldo: 'Crédito'
  },
  {
    id: 2,
    cdContaContabil: 2,
    desContaContabil: 'Conta Resultado 1',
    cdTipoConta: 2,
    descTipoConta: 'Resultado',
    saldo: 0,
    cdTipoSaldo: 3,
    descTipoSaldo: 'Zero'
  },
  {
    id: 3,
    cdContaContabil: 3,
    desContaContabil: 'Conta Resultado 2',
    cdTipoConta: 2,
    descTipoConta: 'Resultado',
    saldo: 890.10,
    cdTipoSaldo: 2,
    descTipoSaldo: 'Débito'
  },
]



//-------------------------------------------------

export const createMinutasPadraoCeV = null;


//-------------------------------------------------

export const createMinutasPadraoLocacao = null;

//-------------------------------------------------

export const createMinutasPadraoOrdemServico = null;


//-------------------------------------------------

export const createCentrodeCusto = [
  {
    id: 1,
    cdCentrodeCusto: 1,
    descCentrodeCusto: 'Intermediação'
  },
  {
    id: 2,
    cdCentrodeCusto: 2,
    descCentrodeCusto: 'Locação'
  },
  {
    id: 3,
    cdCentrodeCusto: 3,
    descCentrodeCusto: 'Prestação'
  }
]
