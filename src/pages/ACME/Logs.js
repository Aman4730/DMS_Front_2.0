import React, { useContext, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import LogTable from "../../components/Logs/LogTable";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
} from "../../components/Component";

const WS1 = () => {
  const { addfolderlogs, getloggs } = useContext(UserContext);
  const { setAuthToken } = useContext(AuthContext);

  // --------------------------------------logs
  const [logsDataList, setLogsDataList] = useState([]);
  const [currentMonthLog, setCurrentMonthLog] = useState([]);
  const [folderList, setFolderList] = useState([{ name: "test", class: "56" }]);
  const [formDataLogs, setFormDataLogs] = useState({
    selectedCategory: "",
    selectedFromDate: null,
    selectedToDate: null,
  });
  const handleChangelogs = (event, value, fieldName) => {
    setFormDataLogs((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const resetForm = () => {
    setFormDataLogs({
      selectedCategory: "",
      selectedFromDate: null,
      selectedToDate: null,
    });
  };
  const starDate = formDataLogs?.selectedFromDate?.$d?.toLocaleDateString().split('/').reverse().join('-');
  const endDate = formDataLogs?.selectedToDate?.$d?.toLocaleDateString().split('/').reverse().join('-');

  // ------------------------------------------------postApis Start
  const onFormSubmit = async () => {
    let data = {
      category: formDataLogs?.selectedCategory?.value,
      start_date: starDate,
      end_date: endDate,
    };
    addfolderlogs(
      data,
      (apiRes) => {
        resetForm();
        setLogsDataList(apiRes?.data?.obj);
        handleClose();
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  const getCurrentMonthLog = async () => {
    getloggs(
      {},

      (apiRes) => {
        setCurrentMonthLog(apiRes.data.data);
      },
      (apiErr) => {}
    );
  };
  useEffect(() => {
    getCurrentMonthLog();
  }, []);
  const tableData = logsDataList.length > 0 ? logsDataList : currentMonthLog;
  // ------------------------------------------------postApis End
  const tableHeader = [
    {
      id: "Date/Time",
      numeric: false,
      disablePadding: true,
      label: "Date/Time",
    },
    {
      id: "User Id",
      numeric: false,
      disablePadding: true,
      label: "User Id",
    },
    {
      id: "Category",
      numeric: false,
      disablePadding: true,
      label: "Category",
    },
    {
      id: "Description",
      numeric: false,
      disablePadding: true,
      label: "Description",
    },
    {
      id: "System Details",
      numeric: false,
      disablePadding: true,
      label: "System Details",
    },
  ];

  return (
    <>
      <Head title="Logs - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <Typography
                  style={{
                    fontSize: "24.5px",
                    fontWeight: "bold",
                  }}
                >
                  Logs
                </Typography>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          <LogTable
            handleChangelogs={handleChangelogs}
            handlefilter={onFormSubmit}
            formDataLogs={formDataLogs}
            rows={folderList}
            headCells={tableHeader}
            allfolderlist={tableData}
            selectLogs={(e, v) => setSelectLog(v)}
          />
        </Stack>
      </Content>
    </>
  );
};
export default WS1;
