/* eslint-disable */
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import axios from "axios";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

export default function data() {
  const navigate = useNavigate();
  const [arrayTransport, setArrayTransport] = useState([]);
  const handleUpdateTransport = (id) => {
    navigate(`/account-management/update-transport/${id}`);
  };
  const handleDeleteTransport = async (id) => {
    try {
      await axios.delete(`/api/transport/${id}`);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchInfoTransport = async () => {
      try {
        const res = await axios.get("/api/transport");
        const transports = res.data;
        const rows = transports?.map((e, index) => ({
          stt: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {index + 1}
            </MDTypography>
          ),
          code: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {e.trans_license}
            </MDTypography>
          ),
          type: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {e.trans_type}
            </MDTypography>
          ),
          name: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {e.trans_name}
            </MDTypography>
          ),
          own: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {e.own.name}
            </MDTypography>
          ),

          action: (
            <div style={{ display: "flex", cursor: "pointer" }}>
              <MDBox ml={1} onClick={() => handleDeleteTransport(e._id)}>
                <MDBadge badgeContent="Xóa" color="error" variant="gradient" size="lg" />
              </MDBox>
              <MDBox ml={1} onClick={() => handleUpdateTransport(e._id)}>
                <MDBadge badgeContent="Cập nhật" color="info" variant="gradient" size="lg" />
              </MDBox>
            </div>
          ),
        }));
        setArrayTransport(rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfoTransport();
  }, []);
  return {
    columns: [
      { Header: "Só thứ tự", accessor: "stt" },
      { Header: "Biển xe", accessor: "code" },
      { Header: "Loại xe", accessor: "type" },
      { Header: "Tên xe", accessor: "name" },
      { Header: "Chủ xe", accessor: "own" },
      { Header: "Hành động", accessor: "action" },
    ],

    rows: arrayTransport,
  };
}
