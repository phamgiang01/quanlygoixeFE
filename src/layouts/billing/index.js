/* eslint-disable */
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import { useState, useEffect } from "react";
import axios from "axios";

function Billing() {
  const [parameter, setParameter] = useState({});

  useEffect(() => {
    const fetchParameter = async () => {
      try {
        const res = await axios.get("/api/parameter");
        setParameter(res.data.revenue);
      } catch (error) {
        console.log(error);
      }
    };
    fetchParameter();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={4}>
              <MasterCard number={1111222233334444} holder="Quản lý gởi xe" expires="Vĩnh viễn" />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <DefaultInfoCard
                icon="account_balance"
                title="Tổng thu"
                description="Chưa bao gồm thuế"
                value={
                  "$ " + parameter.toLocaleString("it-IT", { style: "currency", currency: "VND" })
                }
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <DefaultInfoCard
                icon="paypal"
                title="Tổng chi"
                description="Chưa bao gồm thuế"
                value="$ 1.105.255.000 VND"
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={6}>
              <Invoices />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Billing;
