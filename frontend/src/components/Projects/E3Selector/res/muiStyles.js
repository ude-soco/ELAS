import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";

const c_primary = "#F2994A";
const c_secondary = "#0057a7";
const c_success = "#27a360";
const c_lecEx = "#90EE90";
const c_lecture = "#B0E0E6";
const c_seminar = "#FFDAB9";
const c_block = "#FA8072";
const c_elearn = "#D8BFD8";

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: c_primary,
      contrastText: '#ffffff',
    },
    secondary: {
      main: c_secondary,
    },
    background: {
      paper: '#FAFAFA',
      default: '#FAFAFA',
    },
    text: {
      primary: '#333333',
      secondary: 'rgba(0,0,0,0.6)',
    },
    success: {
      main: c_success,
    },
    info: {
      main: c_secondary,
    },
    warning: {
      main: c_primary,
      contrastText: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1500,
      xl: 1920,
    },
  },
});

export const muiStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "240px",
    color: theme.palette.text.secondary,
  },
  preselect: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "200px"
  },
  preSelectInput: {
    width: 350,
    [`${theme.breakpoints.down("xs")}`]: {
      width: 250
    }
  },
  prePaper: {
    padding: "40px",
    borderRadius: "24px",
    position: "relative"
  },
  searchButton: {
    transform: "translateY(-50%)",
    padding: "12px 16px"
  },
  moreFiltersButton: {
    textDecoration: "underline",
    cursor: "pointer",
    position: "absolute",
    right: 0,
    bottom: -40
  },
  initialFilters: {
      marginTop: "24px",
  },
  initialFiltersHidden: {
      height: "0",
      width: "0",
      overflow: "hidden",
  },
  h1: {
    fontSize: "3rem",
    marginBottom: 0
  },
  reset: {
      textDecoration: "underline",
      cursor: "pointer",
      float: "right",
      marginTop: -36,
      marginRight: 18
  },
  fab: {
      float: "right",
      marginTop: -8,
      backgroundColor: c_primary,
      [`${theme.breakpoints.down("sm")}`]: {
        marginTop: -24
      }
  },
  copyButton: {
      padding: "8px 16px",
      verticalAlign: "top",
      fontSize: "1.3em",
      float: "right",
      marginTop: 8
  },
  copiedButton: {
      padding: "8px 16px",
      verticalAlign: "top",
      fontSize: "1.3em",
      float: "right",
      marginTop: 8,
      backgroundColor: c_success
  },
  true: {
      width: '30px',
      height: '30px',
      margin: '1px',
      'background-color': c_primary
  },
  slot: {
      width: 30,
      height: 30,
      margin: 1,
      backgroundColor: "#E0E0E0"
  },
  overlap: {
      width: 30,
      height: 30,
      margin: 1,
      backgroundColor: c_block
  },
  booked: {
      width: 30,
      height: 30,
      margin: 1,
      backgroundColor: "#C4C4C4"
  },
  selected: {
      maxWidth: '50%',
      maxHeight: '30%'
  },
  paperSelected: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "240px",
    color: theme.palette.text.secondary
  },
  table: {
      maxWidth: '95%',
      maxHeight: '1200'
  },
  row: {
      '& > *': {
        borderBottom: 'unset',
      }},
  paperA : {

      margin: `${theme.spacing(1)}px auto`,
      textAlign: 'center',
      height: 270,
      width: 500,
      },
  textcell:{
      whiteSpace: 'nowarp',
      overflow: 'hidden'
  },
  sorter: {
      color: c_secondary,
      textDecoration: "underline",
      cursor: "pointer"
  },
  emphasis: {
      fontWeight: 500,
      fontSize: 16,
      letterSpacing: "1.25px",
      color: "#000000"
  },
  lecExBorder: {
      borderLeft: "60px solid " + c_lecEx
  },
  lectureBorder: {
      borderLeft: "60px solid " + c_lecture
  },
  seminarBorder: {
      borderLeft: "60px solid " + c_seminar
  },
  blockBorder: {
      borderLeft: "60px solid " + c_block
  },
  elearnBorder: {
      borderLeft: "60px solid " + c_elearn
  },
  lecEx: {
      backgroundColor: c_lecEx
  },
  lecture: {
      backgroundColor: c_lecture
  },
  seminar: {
      backgroundColor: c_seminar
  },
  block: {
      backgroundColor: c_block
  },
  elearn: {
      backgroundColor: c_elearn
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 215,
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
  mobileHidden: {
    [`${theme.breakpoints.down("sm")}`]: {
        display: "none",
        color: "red"
    }
  },
  mobileFirst: {
    [`${theme.breakpoints.down("sm")}`]: {
      order: -1
    }
},
  mobileWide: {
    [`${theme.breakpoints.down("sm")}`]: {
      width: "100%"
    }
},
mdSelectedHidden: {
  [`${theme.breakpoints.down("md")}`]: {
    display: "none"
  }
}
}));
