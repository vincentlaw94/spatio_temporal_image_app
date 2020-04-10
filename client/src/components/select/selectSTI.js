import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import { useDispatch } from "react-redux";
import { setSTI } from "../../actions";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function SelectSTI() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = event => {
    let typeSTI = event.target.value;
    dispatch(setSTI(typeSTI));
  };

  const transition = {
    copyPixel: "Copy Pixels",

    histDiff: "Histogram Difference",

    IBMdiff: "IBM Difference"
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          displayEmpty
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="" disabled>
            Select STI
          </MenuItem>
          {Object.entries(transition).map(([key, val]) => {
            return <MenuItem value={key}>{val}</MenuItem>;
          })}
        </Select>
        <FormHelperText>Select STI</FormHelperText>
      </FormControl>
    </div>
  );
}

export default SelectSTI;
