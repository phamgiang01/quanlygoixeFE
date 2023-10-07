import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import routes from "routes";

function Breadcrumbs({ title, light }) {
  const name = routes.find((e) => e.key === title);
  return (
    <MDBox mr={{ xs: 0, xl: 8 }}>
      <MDTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {name.name}
      </MDTypography>
    </MDBox>
  );
}

Breadcrumbs.defaultProps = {
  light: false,
};

Breadcrumbs.propTypes = {
  title: PropTypes.string.isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
