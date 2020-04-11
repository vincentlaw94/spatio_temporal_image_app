import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";

import { useDispatch, useSelector } from "react-redux";
import { setThreshold, toggleThreshold } from "../../actions";

const useStyles = makeStyles({
  root: {
    width: 250,
    margin: 8,
    fontSize: 12
  },
  input: {
    width: 42
  }
});

export default function InputSlider() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const threshold = useSelector(state => state.radio);
  const thresholdToggle = threshold.threshold;
  const [value, setValue] = React.useState(255);

  const [state, setState] = React.useState({
    checkedB: true
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
    dispatch(toggleThreshold());
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setThreshold(newValue));
  };

  const handleInputChange = event => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
    if (event.target.value < 0) {
      dispatch(setThreshold(0));
    } else if (event.target.value > 255) {
      dispatch(setThreshold(255));
    } else {
      dispatch(setThreshold(event.target.value));
    }
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 255) {
      setValue(255);
    }
  };

  return (
    <div className={classes.root}>
      Threshold Level
      <Checkbox
        checked={thresholdToggle}
        onChange={handleChange}
        name="checkedB"
        color="primary"
      />
      {thresholdToggle && (
        <Grid container spacing={1} alignItems="center">
          <Grid item xs>
            <div className={classes.level}>
              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                step={1}
                min={0}
                max={255}
              />
            </div>
          </Grid>
          <Grid item>
            <Input
              className={classes.input}
              value={value}
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 0,
                max: 255,
                type: "number",
                "aria-labelledby": "input-slider"
              }}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
