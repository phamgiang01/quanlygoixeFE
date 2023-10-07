/* eslint-disable */
import { Link, useLocation } from "react-router-dom";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Cover() {
  const idCustomer = useLocation().pathname.split("/")[3];
  const [customer, setCostomer] = useState("");
  const [money, setMoney] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleCash = async () => {
    try {
      await axios.post("/api/bill", {
        customer: idCustomer,
        money,
        content,
      });
      await axios.patch(`/api/user/${idCustomer}`, {
        money: Number(customer.money) + Number(money),
      });
      navigate("/billing");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCurrentCustomer = async () => {
      const res = await axios.get(`/api/user/${idCustomer}`);
      setCostomer(res.data);
    };
    fetchCurrentCustomer();
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
              <MDInput
                type="text"
                label=""
                variant="standard"
                fullWidth
                value={customer.name}
                disabled
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nạp tiền"
                variant="standard"
                fullWidth
                value={money}
                onChange={(e) => setMoney(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nội dung"
                variant="standard"
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
