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
  "&.toggled": {
    backgroundColor: "#fff",
    color: "#ff9300",
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
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("0");

  useEffect(() => {
    const result = document.getElementById("result");
    const length = result.innerHTML.length;
    if (length >= 21) {
      result.style.fontSize = "30px";
    } else if (length >= 18) {
      result.style.fontSize = "40px";
    } else if (length >= 15) {
      result.style.fontSize = "50px";
    } else if (length >= 12) {
      result.style.fontSize = "60px";
    } else if (length >= 9) {
      result.style.fontSize = "70px";
    } else if (length >= 6) {
      result.style.fontSize = "80px";
    } else {
      result.style.fontSize = "100px";
    }
  }, [result]);

  const addDecimal = () => {
    console.log(input.slice(-1));
    if (input === "0") {
      addInput("0.");
    } else if (input.slice(-1) === "0") {
      addInput("0.");
    } else if (
      input.slice(-1) === "+" ||
      input.slice(-1) === "-" ||
      input.slice(-1) === "*" ||
      input.slice(-1) === "/"
    ) {
      addInput("0.");
    } else {
      addInput(".");
    }
  };

  const tap = () => {
    var audio = new Audio("./tap.wav");
    audio.play();
  };

  const clear = () => {
    const divide = document.getElementById("divide");
    const times = document.getElementById("times");
    const subtract = document.getElementById("subtract");
    const plus = document.getElementById("plus");
    divide.classList.remove("toggled");
    times.classList.remove("toggled");
    subtract.classList.remove("toggled");
    plus.classList.remove("toggled");
    setInput("0");
    setResult("0");
  };

  const calculate = () => {
    try {
      const answer = Math.round(eval(input) * 1e12) / (1e12).toString();
      setInput(answer);
      setResult(answer);
      const divide = document.getElementById("divide");
      const times = document.getElementById("times");
      const subtract = document.getElementById("subtract");
      const plus = document.getElementById("plus");
      divide.classList.remove("toggled");
      times.classList.remove("toggled");
      subtract.classList.remove("toggled");
      plus.classList.remove("toggled");
    } catch (error) {
      setInput("Error");
      setResult("Error");
    }
  };

  const addInput = (value) => {
    const divide = document.getElementById("divide");
    const times = document.getElementById("times");
    const subtract = document.getElementById("subtract");
    const plus = document.getElementById("plus");
    if (value === "/") {
      setInput(`${input}${value}`);
      setResult(input.split("*")[0]);
      divide.classList.add("toggled");
    } else if (value === "*") {
      setInput(`${input}${value}`);
      setResult(input.split("*")[0]);
      times.classList.add("toggled");
    } else if (value === "-") {
      setInput(`${input}${value}`);
      setResult(input.split("*")[0]);
      subtract.classList.add("toggled");
    } else if (value === "+") {
      setInput(`${input}${value}`);
      setResult(input.split("*")[0]);
      plus.classList.add("toggled");
    } else if (
      input.includes("/") ||
      input.includes("*") ||
      input.includes("-") ||
      input.includes("+")
    ) {
      setInput(`${input}${value}`);
      setResult(`${value}`);
    } else {
      if (input.startsWith(0)) {
        setInput(`${value}`);
        setResult(`${value}`);
        const clearBtn = document.getElementById("clearBtn");
        const clearText = document.getElementById("clearText");
        clearText.innerText = "C";
        clearBtn.addEventListener("click", function () {
          clearText.innerText = "AC";
        });
      } else if (document.getElementById("input").innerHTML.length < 9) {
        setInput(`${input}${value}`);
        setResult(`${input}${value}`);
      } else {
        console.log("Max input!");
      }
    }
  };

  const percent = () => {
    try {
      const result = (eval(input) / 100).toString();
      setInput(result);
      setResult(result);
    } catch (error) {
      setInput("Error");
      setResult("Error");
    }
  };

  const np = () => {
    if (input.startsWith("-")) {
      setInput(input.slice(1));
      setResult(input.slice(1));
    } else {
      setInput(`-${input}`);
      setResult(`-${input}`);
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
          <p id="input" style={{ display: "none" }}>
            {input}
          </p>
          <p id="result">{result}</p>
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
          <Grey
            onClick={() => {
              clear();
              tap();
            }}
            id="clearBtn"
            className="light-grey"
          >
            <span id="clearText">AC</span>
          </Grey>
          <Grey
            onClick={() => {
              np();
              tap();
            }}
            className="light-grey"
          >
            +/-
          </Grey>
          <Grey
            onClick={() => {
              percent();
              tap();
            }}
            className="light-grey"
          >
            %
          </Grey>
          <Orange
            onClick={() => {
              addInput("/");
              tap();
            }}
            id="divide"
          >
            &divide;
          </Orange>
          <Number
            onClick={() => {
              addInput("7");
              tap();
            }}
          >
            7
          </Number>
          <Number
            onClick={() => {
              addInput("8");
              tap();
            }}
          >
            8
          </Number>
          <Number
            onClick={() => {
              addInput("9");
              tap();
            }}
          >
            9
          </Number>
          <Orange
            onClick={() => {
              addInput("*");
              tap();
            }}
            id="times"
          >
            &times;
          </Orange>
          <Number
            onClick={() => {
              addInput("4");
              tap();
            }}
          >
            4
          </Number>
          <Number
            onClick={() => {
              addInput("5");
              tap();
            }}
          >
            5
          </Number>
          <Number
            onClick={() => {
              addInput("6");
              tap();
            }}
          >
            6
          </Number>
          <Orange
            onClick={() => {
              addInput("-");
              tap();
            }}
            id="subtract"
          >
            -
          </Orange>
          <Number
            onClick={() => {
              addInput("1");
              tap();
            }}
          >
            1
          </Number>
          <Number
            onClick={() => {
              addInput("2");
              tap();
            }}
          >
            2
          </Number>
          <Number
            onClick={() => {
              addInput("3");
              tap();
            }}
          >
            3
          </Number>
          <Orange
            onClick={() => {
              addInput("+");
              tap();
            }}
            id="plus"
          >
            +
          </Orange>
          <NumberWide
            onClick={() => {
              addInput("0");
              tap();
            }}
          >
            0
          </NumberWide>
          <br />
          <Number
            onClick={() => {
              addDecimal();
              tap();
            }}
          >
            .
          </Number>
          <Orange
            onClick={() => {
              calculate();
              tap();
            }}
          >
            =
          </Orange>
        </Box>
      </div>
    </>
  );
}

export default App;
