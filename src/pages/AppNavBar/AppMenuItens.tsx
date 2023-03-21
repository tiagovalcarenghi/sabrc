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
            link: `/cadastro/contascontabeis/contascomplementares`,
            Icon: CreateNewFolderIcon,
          },
          {
            name: "Centro de Custo",
            sx: { pl: 6 },
            link: `/cadastro/contascontabeis/centrodecusto`,
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
            link: `/cadastro/minutaspadrao/compraevenda`,
            Icon: CreateNewFolderIcon,
          },
          {
            name: "Minuta Padrão Contrato de Locação",
            sx: { pl: 6 },
            link: `/cadastro/minutaspadrao/locacao`,
            Icon: CreateNewFolderIcon,
          },
          {
            name: "Minuta de Contrato de  Prestação de Serviços",
            sx: { pl: 6 },
            link: `/cadastro/minutaspadrao/os`,
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
        link: `/operacoes/contratocompraevenda`,
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
        link: `/operacoes/ordemdeservico`,
      },
      {
        name: "Lançamento Contábil",
        sx: { pl: 4 },
        Icon: SummarizeIcon,
        link: `/operacoes/lancamentocontabil`,
      },
      {
        name: "Lançamento Bancos",
        sx: { pl: 4 },
        Icon: SummarizeIcon,
        link: `/operacoes/lancamentobancos`,
      },
      {
        name: "ARE",
        sx: { pl: 4 },
        Icon: SummarizeIcon,
        link: `/operacoes/are`,
      },
    ],
  },
  {
    name: "Relatórios",
    Icon: InsightsIcon,
    items: [
      {
        name: "Relatórios Contábeis",
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
