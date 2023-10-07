/* eslint-disable */
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import SignIn from "layouts/authentication/sign-in";
import Account from "layouts/authentication/account";
import Transport from "layouts/authentication/transport";
import Cash from "layouts/authentication/cash";
import UpdateCustomer from "layouts/authentication/update-customer";
import CashForAll from "layouts/authentication/cashforall";
import UpdateTransport from "layouts/authentication/update-transport";

import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Tổng quát",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Thông tin",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Hóa đơn",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Chức năng",
    key: "create-transports",
    icon: <Icon fontSize="small">construction</Icon>,
    route: "/transports",
    component: <Transport />,
  },
  {
    type: "collapse",
    name: "Đăng xuất",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "",
    name: "Tạo tài khoản",
    key: "acount-management",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/acount-management",
    component: <Account />,
  },
  {
    type: "",
    name: "Nạp tiền",
    key: "cash",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/account-management/cash/:id",
    component: <Cash />,
  },
  {
    type: "",
    name: "Cập nhật thông tin",
    key: "cash",
    icon: "",
    route: "/account-management/updatecustomer/:id",
    component: <UpdateCustomer />,
  },
  {
    type: "",
    name: "Cập nhật thông tin xe",
    key: "updatetransport",
    icon: "",
    route: "/account-management/update-transport/:id",
    component: <UpdateTransport />,
  },
  {
    type: "",
    name: "Nạp tiền cho mọi người",
    key: "cash",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/account-management/cashforall",
    component: <CashForAll />,
  },
  {
    type: "",
    name: "Thêm phương tiện",
    key: "create-transports",
    icon: <Icon fontSize="small">directions_bike</Icon>,
    route: "/transports",
    component: <Transport />,
  },
];

export default routes;
