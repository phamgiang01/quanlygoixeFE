/* eslint-disable */

import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
function Cover() {
  const navigate = useNavigate();
  const idCustomer = useLocation().pathname.split("/")[3];

  const [avartar, setAvartar] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const updateAccount = async () => {
    try {
      const res = await axios.patch(`/api/user/${idCustomer}`, {
        avartar,
        name,
        username,
        address,
        phone,
        password,
      });
      navigate("/tables");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCurrentCustomer = async () => {
      const res = await axios.get(`/api/user/${idCustomer}`);
      const updateCustomer = res.data;
      setAvartar(updateCustomer.avartar);
      setName(updateCustomer.name);
      setUsername(updateCustomer.username);
      setAddress(updateCustomer.address);
      setPhone(updateCustomer.phone);
      setPassword(updateCustomer.password);
    };
    fetchCurrentCustomer();
  }, []);

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Avartar"
                variant="standard"
                fullWidth
                value={avartar}
                onChange={(e) => setAvartar(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Họ tên"
                variant="standard"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Tên đăng nhập"
                variant="standard"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Địa chỉ"
                variant="standard"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Số điện thoại"
                variant="standard"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Mật khẩu"
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={updateAccount}>
                Cập nhật tài khoản
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
