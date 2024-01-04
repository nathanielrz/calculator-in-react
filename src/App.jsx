import React, { useState } from "react";
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
  const [outputValue, setOutputValue] = useState("0");

  const appendToOutput = (value) => {
    setOutputValue((prevValue) => {
      return prevValue === "0" ? value : prevValue + value;
    });
  };

  const clear = () => {
    setOutputValue("0");
  };

  const calculateResult = () => {
    try {
      setOutputValue(eval(outputValue).toString());
    } catch (error) {
      setOutputValue("Error");
    }
  };

  return (
    <div id="screen">
      <p id="output">{outputValue}</p>
      <Box
        id="buttons"
        sx={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "repeat(4, 85px)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grey onClick={clear} className="light-grey">
          AC
        </Grey>
        <Grey onClick={clear} className="light-grey">
          AC
        </Grey>
        <Grey onClick={clear} className="light-grey">
          AC
        </Grey>
        <Orange onClick={() => appendToOutput("/")}>
          /
        </Orange>
        <Number onClick={() => appendToOutput("7")}>7</Number>
        <Number onClick={() => appendToOutput("8")}>8</Number>
        <Number onClick={() => appendToOutput("9")}>9</Number>
        <Orange onClick={() => appendToOutput("*")}>*</Orange>
        <Number onClick={() => appendToOutput("4")}>4</Number>
        <Number onClick={() => appendToOutput("5")}>5</Number>
        <Number onClick={() => appendToOutput("6")}>6</Number>
        <Orange onClick={() => appendToOutput("-")}>-</Orange>
        <Number onClick={() => appendToOutput("1")}>1</Number>
        <Number onClick={() => appendToOutput("2")}>2</Number>
        <Number onClick={() => appendToOutput("3")}>3</Number>
        <Orange onClick={() => appendToOutput("+")}>+</Orange>
        <NumberWide onClick={() => appendToOutput("0")}>0</NumberWide>
        <br />
        <Number onClick={() => appendToOutput(".")}>.</Number>
        <Orange onClick={calculateResult}>=</Orange>
      </Box>
    </div>
  );
}

export default App;
