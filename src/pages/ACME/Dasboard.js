import React, { useContext, useEffect, useState } from "react";
import Head from "../../layout/head/Head";
import { Grid, Stack } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import CustomCards from "../../components/dashboardPages/CustomCards";
import DataGridCard from "../../components/dashboardPages/DataGridCard";
import ProgressBarchat from "../../components/dashboardPages/ProgressBarchat";
import Piedoughnutchart from "../../components/dashboardPages/Piedoughnutchart";

const Dashboard = () => {
  // Destructure useContext variables
  const {
    getquotadetails,
    getCountworkspace,
    getcountextension,
    getlatestfolderfiles,
  } = useContext(UserContext);
  const [counts, setCounts] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [userquota, setUserquota] = useState([]);
  const [extension, setExtension] = useState({});
  const [quotadetail, setQuotadetail] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    getworkspace();
    getExtension();
    getFolderFile();
    getQuotadetails();
    return () => {
      abortController.abort();
    };
  }, []);
  //Card Data
  const getworkspace = () => {
    getCountworkspace(
      {},
      (apiRes) => {
        setCounts(apiRes.data);
      },
      (apiErr) => {}
    );
  };
  //dashboard table
  const getFolderFile = () => {
    getlatestfolderfiles(
      {},
      (apiRes) => {
        const { latestFiles, latestFolders } = apiRes.data;
        const combinedData = [...(latestFiles || []), ...(latestFolders || [])];
        setTableData(combinedData);
       
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  //storage Quota
  const getQuotadetails = () => {
    getquotadetails(
      {},
      (apiRes) => {
        setUserquota(apiRes.data.user_list);
        setQuotadetail(apiRes.data.workspaces);
      },
      (apiErr) => {}
    );
  };
  //Total Extension Data
  const getExtension = () => {
    getcountextension(
      {},
      (apiRes) => {
        setExtension(apiRes.data);
      },
      (apiErr) => {}
    );
  };
  return (
    <React.Fragment>
      <Head title="Dashboard - Regular" />
      <Stack style={{ marginTop: "77px" }}>
        <CustomCards counts={counts} />
        <ProgressBarchat quotadetail={quotadetail} userquota={userquota} />
        <Grid container pr={2}>
          <Grid item xs={8} md={4}>
            <Piedoughnutchart extension={extension} />
          </Grid>
          <Grid item xs={12} md={8}>
            <DataGridCard tableData={tableData} />
          </Grid>
        </Grid>
      </Stack>
    </React.Fragment>
  );
};

export default Dashboard;
