import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import { useSelector, useDispatch } from "react-redux";
import { setURL, setFileName , setSTI} from "../../actions";

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
  }

  const transition = ["Copying Pixels", "Histogram Differences"];
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
          {transition.map(sti => {
            return <MenuItem value={sti}>{sti}</MenuItem>;
          })}
        </Select>
        <FormHelperText>Select STI</FormHelperText>
      </FormControl>
    </div>
  );
}

export default SelectSTI;
