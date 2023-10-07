/* eslint-disable */
// @mui material components
import Card from "@mui/material/Card";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import { useEffect, useState } from "react";

function BillingInformation() {
  const [bill, setBill] = useState([]);
  useEffect(() => {
    const getInfoBill = async () => {
      try {
        const res = await axios.get("/api/bill");
        setBill(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoBill();
  }, []);
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Hóa đơn khách hàng
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {bill.map((e, index) => (
            <Bill
              key={index}
              name={e.customer.name}
              username={e.customer.username}
              pay={e.money.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
              content={e.content}
              time={e.createdAt}
              id={e._id}
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
