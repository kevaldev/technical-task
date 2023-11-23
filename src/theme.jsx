import { createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const PRIMARY_COLOR = "#9155fd";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px -1px 35px 0px rgba(143,148,148,0.1)",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: { root: { [`& .${outlinedInputClasses.notchedOutline}`]: { borderColor: "rgba(0, 0, 0, 0.15)" } } },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "10px 16px",
          height: "45px",
          ":hover": {
            backgroundColor: "rgb(0 0 0 / 10%) !important",
          },
          boxShadow: "0px 1px 0px 0px #0A0A381A",
          "&&.Mui-selected": {
            backgroundColor: PRIMARY_COLOR,
            color: "#fff",
            ":hover": {
              backgroundColor: PRIMARY_COLOR + "!important",
            },
          },
        },
      },
    },

    MuiSelect: {
      defaultProps: {
        MenuProps: {
          MenuListProps: {
            sx: {
              p: 0,
            },
          },
        },
      },

      styleOverrides: {
        icon: {
          width: "2em",
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    text: {
      primary: "#454F5B",
    },
  },
});
