/* eslint-disable */

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Cover() {
  const [users, setUsers] = useState([]);
  const [own, setOwn] = useState("");
  const [money, setMoney] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setOwn(event.target.value);
  };
  const handleCash = async () => {
    try {
      await axios.post("/api/bill", {
        customer: own._id,
        money,
        content,
      });
      await axios.patch(`/api/user/${own._id}`, {
        money: Number(own.money) + Number(money),
      });
      navigate("/billing");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchInfoCustomer = async () => {
      try {
        const res = await axios.get("/api/user");
        const arrayUser = res.data.filter((i) => i.role !== "admin");
        setUsers(arrayUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfoCustomer();
  }, []);
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Nạp tiền
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Họ tên</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={own}
                  onChange={handleChange}
                  label="Họ tên"
                >
                  {users.map((e) => (
                    <MenuItem value={e} key={e._id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nạp tiền"
                variant="standard"
                fullWidth
                value={money}
                onChange={(e) => {
                  setMoney(e.target.value);
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nội dung"
                variant="standard"
                fullWidth
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </MDBox>
            <MDButton variant="gradient" fullWidth color="info" onClick={handleCash}>
              Xác nhận
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
