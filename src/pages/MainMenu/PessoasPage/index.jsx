import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import PessoaFisicaHome from "./PessoaFisicaHome";
import AppMenu from "../../AppNavBar/AppMenu";
import PessoaJuridicaHome from "./PessoaJuridicaHome";
import { useLocation } from "react-router-dom";
import { verificaDisableDelete, verificaDisableEdit } from "../../../components/commons/Disables";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PessoasPage = () => {
  const [value, setValue] = useState(0);
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableEdit, setDisableEdit] = useState(true);

  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    if (!location.state || !location) {
      setValue(0);
      return;
    }
    setValue(location.state.value);
  }, [location.state]);

  useEffect(() => {
    setDisableDelete(verificaDisableDelete());
    setDisableEdit(verificaDisableEdit());
  }, []);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppMenu>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Pessoa Física" {...a11yProps(0)} />
            <Tab label="Pessoa Jurídica" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PessoaFisicaHome disableDelete={disableDelete} disableEdit={disableEdit} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PessoaJuridicaHome disableDelete={disableDelete} disableEdit={disableEdit} />
        </TabPanel>
      </Box>
    </AppMenu>
  );
};
export default PessoasPage;
