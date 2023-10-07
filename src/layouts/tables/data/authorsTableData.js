/* eslint-disable */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        const res = await axios.get("api/user");
        const arrayUser = res.data.filter((i) => i.role !== "admin");
        const rows = arrayUser.map((e) => ({
          name: <Author image={e.avartar} name={e.name} username={e.username} />,
          address: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {e.address}
            </MDTypography>
          ),
          money: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {e.money.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
            </MDTypography>
          ),
          phone: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {e.phone}
            </MDTypography>
          ),
          status: (
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={e.isBlock === 1 ? "block" : "active"}
                color={e.isBlock === 1 ? "dark" : "success"}
                variant="gradient"
                size="sm"
              />
            </MDBox>
          ),
          action: (
            <div style={{ display: "flex", cursor: "pointer" }}>
              <MDBox ml={1} onClick={() => handleDeleteCustomer(e._id)}>
                <MDBadge badgeContent="Xóa" color="error" variant="gradient" size="lg" />
              </MDBox>
              <MDBox ml={1} onClick={() => handleUpdateCustomer(e._id)}>
                <MDBadge badgeContent="Cập nhật" color="info" variant="gradient" size="lg" />
              </MDBox>
              <MDBox ml={1} onClick={() => handleCash(e._id)}>
                <MDBadge badgeContent="Nạp tiền" color="success" variant="gradient" size="lg" />
              </MDBox>
            </div>
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
      { Header: "Tên khách hàng", accessor: "name", align: "left" },
      { Header: "Địa chỉ", accessor: "address", align: "left" },
      { Header: "Số dư", accessor: "money", align: "center" },
      { Header: "Số điện thoại", accessor: "phone", align: "center" },
      { Header: "Trạng thái", accessor: "status", align: "center" },
      { Header: "Hành động", accessor: "action", align: "center" },
    ],
    rows: rows,
  };
}

const Modal = (text) => {
  return <div>{text}</div>;
};
