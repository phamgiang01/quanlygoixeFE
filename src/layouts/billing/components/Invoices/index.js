// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";

function Invoices() {
  return (
    <Card>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Phiếu chi
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          Xem tất cả
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Invoice date="Tiền điện tháng 12" content="02/1/2023" price="$ 30,650,000 VNĐ" />
          <Invoice date="Tiền nước tháng 12" content="02/1/2023" price="$ 32,800,000 VNĐ" />
          <Invoice date="Tiền mạng tháng 1" content="02/1/2023" price="$ 10,00,000 VNĐ" />
          <Invoice date="Tiền trang trí Noel" content="24/12/2023" price="$ 7,00,000 VNĐ" />
          <Invoice date="Tiền điện tháng 11" content="02/12/2022" price="$ 32,000,000 VNĐ" />
          <Invoice date="Tiền nước tháng 11" content="01/12/2022" price="$ 25,000,000 VNĐ" />
          <Invoice date="Tiền mạng tháng 12" content="01/12/2022" price="$ 10,000,000 VNĐ" />
          <Invoice date="Trồng cây xanh" content="15/11/2022" price="$ 42,000,000 VNĐ" />
          <Invoice
            date="Nâng cấp khu vệ sinh"
            content="08/11/2022"
            price="$ 350,000,000 VNĐ"
            noGutter
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
