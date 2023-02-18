////PESSOA FÍSICA CONSTANTS:

export const initialValuesPF = {
  id: '',
  nomeCompleto: '',
  cdEstadoCivil: '',
  profissao: '',
  nacionalidade: '',
  ci: '',
  cnh: '',
  docExtra: '',
  cpf: '',
  telefone: '',
  telefoneAdicional: '',
  email: '',
  enderecoCompleto: '',
  logradouro: '',
  cep: '',
  bairro: '',
  numero: '',
  complemento: '',
  localidade: '',
  uf: '',
}


export const estadoCivilOptions = [
  { value: 1, label: "Solteiro(a)" },
  { value: 2, label: "Casado(a)" },
  { value: 3, label: "Divorciado(a)" },
  { value: 4, label: "Viúvo(a)" },
  { value: 5, label: "Separado(a)" },
];


////PESSOA JURÍDICA CONSTANTS:

export const initialValuesPJ = {
  cdPessoaJuridica: '',
  nomeEmpresarial: '',
  emailContato: '',
  cnpj: '',
  cep: '',
  logradouro: '',
  bairro: '',
  numero: '',
  complemento: '',
  uf: '',
  localidade: '',
  representantesLegais: [''],
  cnpjFiltro: '',
}
