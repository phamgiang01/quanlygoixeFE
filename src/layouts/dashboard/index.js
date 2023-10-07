/* eslint-disable */
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Projects from "layouts/dashboard/components/Projects";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [parameter, setParameter] = useState({});

  useEffect(() => {
    const fetchParameter = async () => {
      try {
        const res = await axios.get("/api/parameter");
        console.log(res)
        setParameter(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchParameter();
  }, []);



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Số xe trong bãi"
                count={parameter?.transport + "/" + "1000"}
                percentage={{
                  color: "error",
                  amount: "-5%",
                  label: "hôm qua",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Lượt truy cập"
                count={parameter?.accessTimes}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "hôm qua",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Doanh thu"
                count={(parameter?.revenue / 23000).toFixed(2) + " USD"}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "hôm qua",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Số tài khoản"
                count={parameter?.account}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Vừa cập nhật",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Lượt truy cập App"
                  description=""
                  date="Cập nhật theo tuần"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Doanh thu (USD)"
                  description=""
                  date="Cập nhật theo tháng"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Số xe trong bãi"
                  description=""
                  date="Cập nhật tuần"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
