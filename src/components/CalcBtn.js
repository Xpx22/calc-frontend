import React from 'react';
import Button from "@mui/material/Button";
import "./CalcBtn.css";

export default function CalcBtn(props) {
  function clickHandler(){
    props.onClick(props.text);
  }

  return (
    <Button value={props.text} variant="contained" className="btn-style" onClick={clickHandler}>
        {props.text}
    </Button>
  )
}