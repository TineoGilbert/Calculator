import React, { useState } from 'react'
import {styled, Container, Grid, Button} from '@mui/material'
import Paper from '@mui/material/Paper'
import { GridOperationButton } from './components/GridOperationButtons'
import { GridDigitalButton } from './components/GridButtons'


const OutputContainer = styled("div")(({theme}) => ({
  width: "100%",
  textAlign:"right",
  height:"2em",
  padding: theme.spacing(2),
  fontSize: "3em",
  overflow: "hidden"
 
}))

const CalculatorBase = styled(Paper)(({theme}) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 15
}))

const App = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [operation, setOperation] = useState("");
  const [preValue, setPreValue] = useState("");
  const [overWrite, setOverWrite] = useState(true);

  const clear = () =>{
    setPreValue("");
    setOperation("");
    setCurrentValue("0");
    setOverWrite(true);
  };

  const del = () =>{
    setCurrentValue("0");
    setOverWrite(true);
  };

  const percent = () =>{
    const current = parseFloat(currentValue);
    setCurrentValue((current / 100).toString());
  };

  const calculate = () =>{
    if(!preValue || !operation) return currentValue;

    const curr = parseFloat(currentValue);
    const prev = parseFloat(preValue);

    let result;

    switch (operation) {
      case "/":
        result = prev / curr;
        break;
      case "+":
        result = prev + curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "-":
        result = prev - curr;
        break;
      default:
        break;
    }
    return result;
  };

  const equals = () =>{
    const val = calculate();
    setCurrentValue(`${val}`);
    setPreValue("");
    setOperation("");
    setOverWrite(true);
  };



  const selectOperation = (operation:string) =>{
    if(preValue){
      const val = calculate();
      setCurrentValue(`${val}`);
      setPreValue(`${val}`);
    } else{
      setPreValue(currentValue);

    }


    setOperation(operation);
    setOverWrite(true);
  };


  const setDigit = (digit:string) =>{
    if(currentValue[0] === "0" && digit === "0") return;

    if(currentValue.includes(".") && digit == ".") return;

    if(overWrite && digit !== "."){
      setCurrentValue(digit);
    }else{
      setCurrentValue(`${currentValue} ${digit}`);
    }

    setOverWrite(false);
  };
  return (
      <Container maxWidth="sm">
        <CalculatorBase elevation={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <OutputContainer>
               {currentValue}
              </OutputContainer>
            </Grid>
            <Grid item container columnSpacing={1}>
            <GridOperationButton operation={"AC"} selectOperation={clear} selectedOperation={operation}/>
            <GridOperationButton operation={"C"} selectOperation={del} selectedOperation={operation}/>
            <GridOperationButton operation={"%"} selectOperation={percent} selectedOperation={operation}/>
            <GridOperationButton operation={"+"} selectOperation={selectOperation} selectedOperation={operation}/>
           


          </Grid>

          <Grid item container columnSpacing={1}>
            <GridDigitalButton digit={"9"} enterDigit={setDigit}/>
            <GridDigitalButton digit={"8"} enterDigit={setDigit}/>
            <GridDigitalButton digit={"7"} enterDigit={setDigit}/>
            <GridOperationButton operation={"*"} selectOperation={selectOperation} selectedOperation={operation}/>
          </Grid>

          <Grid item container columnSpacing={1}>
            <GridDigitalButton digit={"6"} enterDigit={setDigit}/>
            <GridDigitalButton digit={"5"} enterDigit={setDigit}/>
            <GridDigitalButton digit={"4"} enterDigit={setDigit}/>
            <GridOperationButton operation={"-"} selectOperation={selectOperation} selectedOperation={operation}/>
          </Grid>

          <Grid item container columnSpacing={1}>
            <GridDigitalButton digit={"3"} enterDigit={setDigit}/>
            <GridDigitalButton digit={"2"} enterDigit={setDigit}/>
            <GridDigitalButton digit={"1"} enterDigit={setDigit}/>
            <GridOperationButton operation={"+"} selectOperation={selectOperation} selectedOperation={operation}/>
          </Grid>

          <Grid item container columnSpacing={1}>
            <GridDigitalButton digit={"0"} enterDigit={setDigit} xs={6}/>
            <GridDigitalButton digit={"."} enterDigit={setDigit}/>
           
            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={equals}>
                =
              </Button>
            </Grid>
          </Grid>


          </Grid>

          
        </CalculatorBase>
      </Container>
    
  )
}

export default App