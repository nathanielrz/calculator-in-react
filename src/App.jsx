import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  styled,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ThemeProvider,
  createTheme,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Divider,
  List,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import ClearIcon from "@mui/icons-material/Clear";

const Number = styled(Button)({
  borderRadius: "45px",
  fontFamily: "system-ui, sans-serif",
  padding: "25px",
  fontSize: "40px",
  height: "90px",
  width: "90px",
  border: "none",
  color: "#fff",
  backgroundColor: "#333",
  cursor: "pointer",
  fontWeight: "500",
  "&:hover": {
    backgroundColor: "#666",
  },
});

const NumberWide = styled(Number)({
  width: "calc(90px * 2)",
});

const Orange = styled(Number)({
  backgroundColor: "#ff9300",
  "&:hover": {
    backgroundColor: "#fcbc64",
  },
});

const Grey = styled(Number)({
  backgroundColor: "#aaa",
  color: "#000",
  "&:hover": {
    backgroundColor: "#eee",
  },
});

const dark = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [outputValue, setOutput] = useState("0");

  useEffect(() => {
    const output = document.getElementById("output");
    const length = output.innerHTML.length;
    if (length >= 21) {
      output.style.fontSize = "30px";
    } else if (length >= 18) {
      output.style.fontSize = "40px";
    } else if (length >= 15) {
      output.style.fontSize = "50px";
    } else if (length >= 12) {
      output.style.fontSize = "60px";
    } else if (length >= 9) {
      output.style.fontSize = "70px";
    } else if (length >= 6) {
      output.style.fontSize = "80px";
    } else {
      output.style.fontSize = "100px";
    }
  }, [outputValue]);

  const addInput = (value) => {
    setOutput((prevValue) => {
      const newValue = prevValue === "0" ? value : prevValue + value;
      return newValue.length <= 9 ? newValue : prevValue;
    });
    const clearBtn = document.getElementById("clearBtn");
    const clearText = document.getElementById("clearText");
    clearText.innerText = "C";
    clearBtn.addEventListener("click", function () {
      clearText.innerText = "AC";
    });
  };

  const addDecimal = () => {
    console.log(outputValue.slice(-1));
    if (outputValue === "0") {
      addInput("0.");
    } else if (outputValue.slice(-1) === "0") {
      addInput("0.");
    } else if (
      outputValue.slice(-1) === "+" ||
      outputValue.slice(-1) === "-" ||
      outputValue.slice(-1) === "*" ||
      outputValue.slice(-1) === "/"
    ) {
      addInput("0.");
    } else {
      addInput(".");
    }
  };

  const clear = () => {
    setOutput("0");
  };

  const calculate = () => {
    try {
      setOutput(Math.round(eval(outputValue) * 1e12) / 1e12.toString());
    } catch (error) {
      setOutput("Error");
    }
  };  

  const percent = () => {
    try {
      const result = (eval(outputValue) / 100).toString();
      setOutput(result);
    } catch (error) {
      setOutput("Error");
    }
  };

  const np = () => {
    if (outputValue.startsWith("-")) {
      setOutput(outputValue.slice(1));
    } else {
      setOutput(`-${outputValue}`);
    }
  };

  // https://mui.com/material-ui/react-drawer/
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            <ListItemText primary={"Close"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <a
          href="https://github.com/nate-games/calculator-in-react"
          target="_blank"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary={"GitHub"} />
            </ListItemButton>
          </ListItem>
        </a>
      </List>
    </Box>
  );

  return (
    <>
      {["left", "top", "down", "right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <ThemeProvider theme={dark}>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </ThemeProvider>
        </React.Fragment>
      ))}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#111" }}>
          <Toolbar>
            <IconButton
              onClick={toggleDrawer("left", true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Calculator in React
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div id="screen">
        <div className="computer">
          <p id="output">{outputValue}</p>
        </div>
        <Box
          id="buttons"
          sx={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(4, 90px)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grey onClick={clear} id="clearBtn" className="light-grey">
            <span id="clearText">AC</span>
          </Grey>
          <Grey onClick={np} className="light-grey">
            +/-
          </Grey>
          <Grey onClick={percent} className="light-grey">
            %
          </Grey>
          <Orange onClick={() => addInput("/")}>&divide;</Orange>
          <Number onClick={() => addInput("7")}>7</Number>
          <Number onClick={() => addInput("8")}>8</Number>
          <Number onClick={() => addInput("9")}>9</Number>
          <Orange onClick={() => addInput("*")}>&times;</Orange>
          <Number onClick={() => addInput("4")}>4</Number>
          <Number onClick={() => addInput("5")}>5</Number>
          <Number onClick={() => addInput("6")}>6</Number>
          <Orange onClick={() => addInput("-")}>-</Orange>
          <Number onClick={() => addInput("1")}>1</Number>
          <Number onClick={() => addInput("2")}>2</Number>
          <Number onClick={() => addInput("3")}>3</Number>
          <Orange onClick={() => addInput("+")}>+</Orange>
          <NumberWide onClick={() => addInput("0")}>0</NumberWide>
          <br />
          <Number onClick={() => addDecimal()}>.</Number>
          <Orange onClick={calculate}>=</Orange>
        </Box>
      </div>
    </>
  );
}

export default App;
