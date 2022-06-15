import React, { useState } from 'react'
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

import "./Calculator.css";
import CalcBtn from './CalcBtn';
import { clearContent, calculateResult, addToResult } from '../helpers/CalcLogic';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Calculator() {
  const CALC_BUTTONS = [
    { text: "save", onClick: saveToFile },
    { text: "read", onClick: readFromFile },
    { text: "clear", onClick: clearContent },
    { text: "/", onClick: addToResult },
    { text: "7", onClick: addToResult },
    { text: "8", onClick: addToResult },
    { text: "9", onClick: addToResult },
    { text: "*", onClick: addToResult },
    { text: "4", onClick: addToResult },
    { text: "5", onClick: addToResult },
    { text: "6", onClick: addToResult },
    { text: "+", onClick: addToResult },
    { text: "1", onClick: addToResult },
    { text: "2", onClick: addToResult },
    { text: "3", onClick: addToResult },
    { text: "-", onClick: addToResult },
    { text: "0", onClick: addToResult },
    { text: ".", onClick: addToResult },
    { text: "=", onClick: calculateResult }
  ];
  const BACKEND_URL = "http://localhost:3001";

  const [isSnackBarOpen, setSnackbarToggle] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  let id = "";

  async function saveToFile(){
    const result = document.getElementById("calc-result");
    const output = result.innerText;
    const localID = localStorage.getItem("id");
    try{
      const data = {
        data: output
      };
      if(!id && localID){ id = localID; }
      const config = {
        headers:{
          id: id
        }
      };
      const response = await axios.post(BACKEND_URL + "/v1/persist", data, config);
      if(!id){
        id = response.data.id;
        localStorage.setItem("id", response.data.id);
      }
      setIsSuccess(true);
      setAlertMessage(response.data.message);
      openSnackbar();
    }catch(e){
      setIsSuccess(false);
      setAlertMessage(e.response.data.error);
      openSnackbar();
      result.innerText = "0";
    }
  }

  async function readFromFile(){
    const result = document.getElementById("calc-result");
    try{
      if(!id){
        const localID = localStorage.getItem("id");
        if(localID){
          id = localID;
        }
      }
      const config = {
        headers:{
          id: id
        }
      };
      const response = await axios.get(BACKEND_URL + "/v1/read", config);
      result.innerText = response.data.data;
      setIsSuccess(true);
      setAlertMessage(response.data.message);
      openSnackbar();
    }catch(e){
      setIsSuccess(false);
      setAlertMessage(e.response.data.error);
      openSnackbar();
      result.innerText = "0";
    }
  }

  function openSnackbar(){
    setSnackbarToggle(true);
  }
  function closeSnackbar(){
    setSnackbarToggle(false);
  }

  return (
    <div>
        <div id='calc-result'>0</div>
        <div className='calc-layout'>
          {CALC_BUTTONS.map((btn)=>{
            return <CalcBtn key={btn.text} text={btn.text} onClick={btn.onClick}/>
          })}
        </div>
        <Snackbar 
          open={isSnackBarOpen} 
          autoHideDuration={2500}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert severity={isSuccess ? 'success' : 'error'} onClose={closeSnackbar}>{alertMessage}</Alert>  
        </Snackbar>
    </div>
  );
}
