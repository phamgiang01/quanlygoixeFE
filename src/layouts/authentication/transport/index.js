/* eslint-disable */
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Cover() {
  const [users, setUsers] = useState([]);
  const [transType, setTransType] = useState("");
  const [transName, setTransName] = useState("");
  const [transLicense, setTransLicense] = useState("");
  const [own, setOwn] = useState("");

  const navigate = useNavigate();

  const createTransport = async () => {
    try {
      const form = {
        trans_type: transType,
        trans_name: transName,
        trans_license: transLicense,
        qr: "secretkey-" + transLicense,
        own,
      };
      await axios.post("/api/transport", form);
      navigate("/tables");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchInfoCustomer = async () => {
      try {
        const res = await axios.get("api/user");
        const arrayUser = res.data.filter((i) => i.role !== "admin");
        setUsers(arrayUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfoCustomer();
  }, []);

  const handleChange = (event) => {
    setOwn(event.target.value);
  };
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Loại xe"
                variant="standard"
                fullWidth
                value={transType}
                onChange={(e) => setTransType(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Tên xe"
                variant="standard"
                fullWidth
                value={transName}
                onChange={(e) => setTransName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Biển số"
                variant="standard"
                fullWidth
                value={transLicense}
                onChange={(e) => setTransLicense(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Chủ sở hữu</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={own}
                  onChange={handleChange}
                  label="Chủ sở hữu"
                >
                  {users.map((e) => (
                    <MenuItem value={e._id} key={e._id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={createTransport}>
                Thêm phương tiện
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
