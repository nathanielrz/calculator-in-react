import React, { useState } from "react";
import "./App.css";
import { Box } from '@mui/material';

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
      <Box id="buttons" sx={{
        display: "grid",
        gap: "10px",
        gridTemplateColumns: "repeat(4, 85px)",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <button onClick={clear} className="light-grey">
          AC
        </button>
        <button onClick={clear} className="light-grey">
          AC
        </button>
        <button onClick={clear} className="light-grey">
          AC
        </button>
        <button onClick={() => appendToOutput("/")} className="orange">
          /
        </button>
        <button onClick={() => appendToOutput("7")}>7</button>
        <button onClick={() => appendToOutput("8")}>8</button>
        <button onClick={() => appendToOutput("9")}>9</button>
        <button onClick={() => appendToOutput("*")} className="orange">
          *
        </button>
        <button onClick={() => appendToOutput("4")}>4</button>
        <button onClick={() => appendToOutput("5")}>5</button>
        <button onClick={() => appendToOutput("6")}>6</button>
        <button onClick={() => appendToOutput("-")} className="orange">
          -
        </button>
        <button onClick={() => appendToOutput("1")}>1</button>
        <button onClick={() => appendToOutput("2")}>2</button>
        <button onClick={() => appendToOutput("3")}>3</button>
        <button onClick={() => appendToOutput("+")} className="orange">
          +
        </button>
        <button onClick={() => appendToOutput("0")} className="wide">
          0
        </button>
        <br />
        <button onClick={() => appendToOutput(".")}>.</button>
        <button onClick={calculateResult} className="orange">
          =
        </button>
      </Box>
    </div>
  );
}

export default App;
