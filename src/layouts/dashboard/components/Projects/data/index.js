/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Name = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Tên dự án", accessor: "name", width: "45%", align: "left" },
      { Header: "Thành viên", accessor: "members", width: "10%", align: "left" },
      { Header: "Ngân sách", accessor: "budget", align: "center" },
      { Header: "Tiến độ", accessor: "completion", align: "center" },
    ],

    rows: [
      {
        name: <Name image={logoXD} name="Mở rộng bãi đỗ xe" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Nguyễn Yến"],
              [team2, "Quốc Đạt"],
              [team3, "Đức Long"],
              [team4, "Cảnh Dinh"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={60} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        name: <Name image={logoAtlassian} name="Tiếp cận nhiều người dung - Quảng cáo" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team2, "Quốc Đạt"],
              [team4, "Cảnh Dinh"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $3,000
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={10} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        name: <Name image={logoSlack} name="Nâng cao trải nghiệm người dùng" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Nguyễn Yến"],
              [team3, "Đức Long"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Chưa thống kê
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        name: <Name image={logoSpotify} name="Tích hợp hệ thống IOT" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team3, "Đức Long"],
              [team4, "Cảnh Dinh"],
              [team1, "Nguyễn Yến"],
              [team2, "Quốc Đạt"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $20,500
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
    ],
  };
}
