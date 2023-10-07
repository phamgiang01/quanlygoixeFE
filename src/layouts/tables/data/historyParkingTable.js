/* eslint-disable */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

export default function data() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const Author = ({ image, name, username }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{username}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const handleCash = (id) => {
    navigate(`/account-management/cash/${id}`);
  };
  const handleUpdateCustomer = (id) => {
    navigate(`/account-management/updatecustomer/${id}`);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`/api/user/${id}`);
      navigate("/tables");
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchInfoCustomer = async () => {
      try {
        const res = await axios.get("api/statistical");
        const arrayHistoryParking = res.data;
        console.log(arrayHistoryParking);

        const rows = arrayHistoryParking.map((e, index) => ({
          transName: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {e.transport.trans_name}
            </MDTypography>
          ),
          transLicense: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {e.transport.trans_license}
            </MDTypography>
          ),
          own: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {e.transport.own.name}
            </MDTypography>
          ),
          timeCome: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {e.timeCome}
            </MDTypography>
          ),
          timeOut: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {e.timeOut}
            </MDTypography>
          ),
          qr: (
            <QRCode
              size={80}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={e.transport.qr}
              viewBox={`0 0 256 256`}
            />
          ),
          status: (
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={e.isOut != 1 ? "Chưa lấy xe" : "Đã lấy xe"}
                color={e.isOut != 1 ? "error" : "success"}
                variant="gradient"
                size="sm"
              />
            </MDBox>
          ),
        }));
        setRows(rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfoCustomer();
  }, []);

  return {
    columns: [
      { Header: "Loại xe", accessor: "transName" },
      { Header: "Biển xe", accessor: "transLicense" },
      { Header: "Chủ sở hữu", accessor: "own" },
      { Header: "Thời gian gởi", accessor: "timeCome" },
      { Header: "Thời gian lấy", accessor: "timeOut" },
      { Header: "Trạng thái", accessor: "status" },
      { Header: "Mã Qr", accessor: "qr" },
    ],
    rows: rows,
  };
}
