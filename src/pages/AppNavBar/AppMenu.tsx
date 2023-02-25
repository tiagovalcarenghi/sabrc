import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppMenuItem from "./AppMenuItem";
import { appMenuItems } from "./AppMenuItens";
import { AuthContext } from "../../contexts/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ptBR } from "@mui/material/locale";
import { useNavigate } from "react-router-dom";
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { Tooltip } from "@mui/material";

const drawerWidth = 380;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#FF9800",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#F9B046",
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DrawerLeft = styled("div")(({ theme }) => ({
  display: "flex",
  marginRight: "auto",
}));

const AppMenu = (props: any) => {
  const theme = createTheme(
    {
      palette: {
        primary: {
          main: "rgb(255, 152, 0)",
        },
      },
    },
    ptBR
  );

  const [disableEdit, setDisableEdit] = useState(true);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user_storage") || '{}');

    if (usuario)
      if (usuario.tipoUser === "ADMIN")
        disables(1)


  }, []);

  const disables = (data: any) => {
    setDisableEdit(false);
  };


  const [open, setOpen] = React.useState(true);
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const navigateToComponent = (address: any) => {
    switch (address) {
      case 'perfil': navigate("/editar/perfil");
        break;
      case 'usuarios': navigate("/cadastro/usuarios");
        break;

    }
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            SAB - Sistema Administrativo Bomlar
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <DrawerLeft>

            <Tooltip title="Logout" >
              <IconButton color="error" onClick={logout}>
                <ExitToAppRoundedIcon></ExitToAppRoundedIcon>
              </IconButton>
            </Tooltip>


            <Tooltip title="Perfil" >
              <IconButton
                color="info"
                onClick={() => {
                  navigateToComponent('perfil');
                }}
              >
                <AccountCircleIcon></AccountCircleIcon>
              </IconButton>
            </Tooltip>

            <Tooltip title="Usuários" >
              <IconButton
                disabled={disableEdit}
                color="warning"
                onClick={() => {
                  navigateToComponent('usuarios');
                }}
              >
                <PeopleAltRoundedIcon></PeopleAltRoundedIcon>
              </IconButton>
            </Tooltip>

          </DrawerLeft>

        </DrawerHeader>

        <Divider />

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {appMenuItems.map((item, index) => (
            <AppMenuItem {...item} key={index} />
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </Main>
    </Box>
  );
};

export default AppMenu;
