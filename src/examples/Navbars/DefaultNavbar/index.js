/* eslint-disable */
import { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function DefaultNavbar({ transparent, light, action }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <Container>
      <MDBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={3}
        mx={3}
        width="calc(100% - 48px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
      >
        <MDBox
          borderRadius="lg"
          shadow={transparent ? "none" : "md"}
          color={light ? "white" : "dark"}
          width="calc(50% - 34px)"
          sx={({
            palette: { transparent: transparentColor, white, background },
            functions: { rgba },
          }) => ({
            backgroundColor: transparent
              ? transparentColor.main
              : rgba(darkMode ? background.sidenav : white.main, 0.8),
            backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
          })}
        >
          <MDBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
            <DefaultNavbarLink
              icon="donut_large"
              name="Tổng quát"
              route="/dashboard"
              light={light}
            />
            <DefaultNavbarLink
              icon="person"
              name="Thêm tài khoản"
              route="/acount-management"
              light={light}
            />
            <DefaultNavbarLink
              icon="directions_bike"
              name="Thêm phương tiện"
              route="/transports"
              light={light}
            />
            <DefaultNavbarLink
              icon="attach_money"
              name="Nạp tiền"
              route="/account-management/cashforall"
              light={light}
            />
          </MDBox>
          <MDBox
            display={{ xs: "inline-block", lg: "none" }}
            lineHeight={0}
            py={1.5}
            pl={1.5}
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={openMobileNavbar}
          >
            <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
          </MDBox>
        </MDBox>
      </MDBox>

      {mobileView && <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
