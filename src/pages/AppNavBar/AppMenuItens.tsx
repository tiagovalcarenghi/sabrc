import IconBarChart from "@material-ui/icons/BarChart";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import BadgeIcon from "@mui/icons-material/Badge";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SummarizeIcon from "@mui/icons-material/Summarize";
import InsightsIcon from "@mui/icons-material/Insights";

export const appMenuItems = [
  {
    name: "Cadastro",
    Icon: AppRegistrationIcon,
    items: [
      {
        name: "Pessoas",
        sx: { pl: 4 },
        Icon: BadgeIcon,
        link: `/cadastro/pessoas`,
      },    
      {
        name: "Contas Contábeis",
        sx: { pl: 4 },
        Icon: BadgeIcon,
        items: [
          {
            name: "Contas",
            sx: { pl: 6 },
            link: `/cadastro/contascontabeis/contas`,
            Icon: CreateNewFolderIcon,
          },
          {
            name: "Contas Complementar",
            sx: { pl: 6 },
            link: `/cadastro/contas-contabeis/contascomplement`,
            Icon: CreateNewFolderIcon,
          },
          {
            name: "Centro de Custo",
            sx: { pl: 6 },
            link: `/cadastro/contas-contabeis/cdc`,
            Icon: CreateNewFolderIcon,
          },
        ],
      },
      {
        name: "Minutas Padrão",
        sx: { pl: 4 },
        Icon: BadgeIcon,
        items: [
          {
            name: "Minuta Padrão Compra e Venda",
            sx: { pl: 6 },
            link: `/cadastro/minutas-padrao/minutapadraocv`,
            Icon: CreateNewFolderIcon,
          },
          {
            name: "Minuta Padrão Contrato de Locação",
            sx: { pl: 6 },
            link: `/cadastro/minutas-padrao/minutapadraolocacao`,
            Icon: CreateNewFolderIcon,
          },
          {
            name: "Minuta de Contrato de  Prestação de Serviços",
            sx: { pl: 6 },
            link: `/cadastro/minutas-padrao/minutacontratoprestserv`,
            Icon: CreateNewFolderIcon,
          },
        ],
      },
      {
        name: "Endereços",
        sx: { pl: 4 },
        Icon: BadgeIcon,
        link: `/cadastro/enderecos`,
      },
    ],
  },
  {
    name: "Operações",
    Icon: InsertDriveFileIcon,
    items: [
      {
        name: "Contrato de Compra e Venda",
        sx: { pl: 4 },
        Icon: SummarizeIcon,
        link: `/operacoes/contratocv`,
      },
      {
        name: "Contrato de Locação",
        sx: { pl: 4 },
        Icon: SummarizeIcon,
        link: `/operacoes/contrato-locacao`,
      },
      {
        name: "Ordem de Serviço",
        sx: { pl: 4 },
        Icon: SummarizeIcon,
        link: `/operacoes/ordem-de-servico`,
      },
      {
        name: "Lançamento Contábil",
        sx: { pl: 4 },
        Icon: SummarizeIcon,
        link: `/operacoes/lancamento-contabil`,
      },
      {
        name: "Lançamento Bancos",
        sx: { pl: 4 },
        Icon: SummarizeIcon,
        link: `operacoes/lancamento-bancos`,
      },
      {
        name: "ARE",
        sx: { pl: 4 },
        Icon: SummarizeIcon,
        items: [
          {
            name: "Gerar",
            sx: { pl: 6 },
            link: `/operacoes/are`,
            Icon: CreateNewFolderIcon,
          },
        ],
      },
    ],
  },
  {
    name: "Relatórios",
    Icon: InsightsIcon,
    items: [
      {
        name: "Pesquisa Por Campo",
        sx: { pl: 4 },
        Icon: IconBarChart,
        link: `/relatorios/pesquisa-por-campo`,
      },
      {
        name: "Lançamento",
        sx: { pl: 4 },
        Icon: IconBarChart,
        link: `/relatorios/lancamento`,
      },
      {
        name: "Livro Razão",
        sx: { pl: 4 },
        Icon: IconBarChart,
        link: `/relatorios/livro-razao`,
      },
      {
        name: "DRE",
        sx: { pl: 4 },
        Icon: IconBarChart,
        link: `/relatorios/dre`,
      },
      {
        name: "Balancete",
        sx: { pl: 4 },
        Icon: IconBarChart,
        link: `/relatorios/balancete`,
      },
    ],
  },
];
