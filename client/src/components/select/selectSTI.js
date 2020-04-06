import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import { useSelector, useDispatch } from "react-redux";
import { setURL, setFileName, setSTI } from "../../actions";

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
    copyPixelCol: "Copy Pixels by Column",
    copyPixelRow: "Copy Pixels by Row",
    histDiffCol: "Histogram Difference by Column",
    histDiffRow: "Histogram Difference by Row",
    IBMdiffColRGB: "(R,G,B) IBM Difference by Column",
    IBMdiffRowRGB: "(R,G,B) IBM Difference by Row",
    IBMdiffColChr: "Chromaticity IBM Difference by Column",
    IBMdiffRowChr: "Chromaticity IBM Difference by Row",
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
