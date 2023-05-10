////PESSOA FÍSICA CONSTANTS:

export const initialValuesPF = {
  id: '',
  nomeCompleto: '',
  cdEstadoCivil: '',
  profissao: '',
  nacionalidade: '',
  rg: '',
  cnh: '',
  cpf: '',
  telefone: '',
  telefoneAdicional: '',
  email: '',
  isAgenteDeNegocio: '',
  cdEndereco: '',
  enderecoCompleto: '',

}


export const estadoCivilOptions = [
  { value: 1, label: "Solteiro(a)" },
  { value: 2, label: "Casado(a)" },
  { value: 3, label: "Divorciado(a)" },
  { value: 4, label: "Viúvo(a)" },
  { value: 5, label: "Separado(a)" },
  { value: 6, label: "Unido Estavelmente" },
  { value: 7, label: "Separado Judicialmente" },
];


////PESSOA JURÍDICA CONSTANTS:

export const initialValuesPJ = {
  id: '',
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


export const initialValuesRL = {
  id: '',
  cdPessoaJuridica: '',
  cdPessoaFisica: '',
  nomeRepresentante: '',
}
