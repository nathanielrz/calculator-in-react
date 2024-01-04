import React, { useState, useEffect } from "react";
import { Button, Box, styled } from "@mui/material";

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
    backgroundColor: "#333",
  },
});

const NumberWide = styled(Number)({
  width: "calc(90px * 2)",
});

const Orange = styled(Number)({
  backgroundColor: "#ff9300",
  "&:hover": {
    backgroundColor: "#ff9300",
  },
});

const Grey = styled(Number)({
  backgroundColor: "#aaa",
  color: "#000",
  "&:hover": {
    backgroundColor: "#aaa",
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
    if (value === ".") {
      setOutput("0.")
    }
    const clearBtn = document.getElementById("clearBtn");
    const clearText = document.getElementById("clearText");
    clearText.innerText = "C";
    clearBtn.addEventListener("click", function () {
      clearText.innerText = "AC";
    });
  };

  const clear = () => {
    setOutput("0");
  };

  const calculate = () => {
    try {
      setOutput(eval(outputValue).toString());
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
      setOutput(`-${outputValue}`)
    }
  };  

  return (
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
        <Number onClick={() => addInput(".")}>.</Number>
        <Orange onClick={calculate}>=</Orange>
      </Box>
    </div>
  );
}

export default App;