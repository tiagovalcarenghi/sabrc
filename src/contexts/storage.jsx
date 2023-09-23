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

export const createPessoaFisica = [];

//-------------------------------------------------

export const createPessoaJuridica = [];


export const createRepresentantesLegaisBase = [];


//-------------------------------------------------

export const createContasContabeis = [
  {
    id: 1,
    cdContaContabil: 1,
    desContaContabil: 'Creditos a Realizar',
    cdTipoConta: 1,
    descTipoConta: 'Patrimonial',
    saldo: 1000.99,
    cdTipoSaldo: 1,
    descTipoSaldo: 'Crédito',
    isFixed: true
  },
  {
    id: 2,
    cdContaContabil: 2,
    desContaContabil: 'Comissão',
    cdTipoConta: 1,
    descTipoConta: 'Patrimonial',
    saldo: 5000.35,
    cdTipoSaldo: 2,
    descTipoSaldo: 'Débito',
    isFixed: true
  },
  {
    id: 3,
    cdContaContabil: 3,
    desContaContabil: 'Receita Operacional',
    cdTipoConta: 2,
    descTipoConta: 'Resultado',
    saldo: 0.00,
    cdTipoSaldo: 3,
    descTipoSaldo: 'Zero',
    isFixed: true
  },
  {
    id: 4,
    cdContaContabil: 4,
    desContaContabil: 'Cliente',
    cdTipoConta: 1,
    descTipoConta: 'Patrimonial',
    saldo: 0,
    cdTipoSaldo: 3,
    descTipoSaldo: 'Zero',
    isFixed: true
  },
  {
    id: 5,
    cdContaContabil: 5,
    desContaContabil: 'Banco',
    cdTipoConta: 0,
    descTipoConta: 'SISTEMA',
    saldo: 0,
    cdTipoSaldo: 3,
    descTipoSaldo: 'Zero',
    isFixed: true
  },
  {
    id: 6,
    cdContaContabil: 6,
    desContaContabil: 'ARE',
    cdTipoConta: 0,
    descTipoConta: 'SISTEMA',
    saldo: 0,
    cdTipoSaldo: 3,
    descTipoSaldo: 'Zero',
    isFixed: true
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
    descCentrodeCusto: 'Intermediação',
    isFixed: true
  },
  {
    id: 2,
    cdCentrodeCusto: 2,
    descCentrodeCusto: 'Locação',
    isFixed: true
  },
  {
    id: 3,
    cdCentrodeCusto: 3,
    descCentrodeCusto: 'Ordem de Serviço',
    isFixed: true
  }
]


//-------------------------------------------------

export const createEnderecos = []


//-------------------------------------------------

export const createContasComplementares = []


export const createNomes = []



//-------------------------------------------------


export const createLancamentosContabeisAll = []

export const createLancamentosContabeisBase = []

export const createLancamentosContabeisOperacao = []

export const createLancamentoContasResultado = []

export const createLancamentoContasPatrimoniais = []


//-------------------------------------------------

export const createContratosdeCompraeVendaBase = []

export const createCompradorProcuradorBase = []
export const createCompradorProcuradorOperacao = []

export const createVendedorProcuradorBase = []
export const createVendedorProcuradorOperacao = []

export const createHonorariosCorretorParceiroBase = []
export const createHonorariosCorretorParceiroOperacao = []


//-------------------------------------------------

export const createLancamentosBancoBase = []

export const createLancamentosBancoOperacao = []


//-------------------------------------------------

export const createOrdemdeServico = []

export const createContratanteBase = []

//-------------------------------------------------

export const createContratosLocacaoBase = []

export const createLocadorProcuradorBase = []
export const createLocadorProcuradorOperacao = []

export const createLocatarioProcuradorBase = []
export const createLocatarioProcuradorOperacao = []

export const createTaxaIntermediacaoCorretoresBase = []
export const createTaxaIntermediacaoCorretoresOperacao = []


//-------------------------------------------------