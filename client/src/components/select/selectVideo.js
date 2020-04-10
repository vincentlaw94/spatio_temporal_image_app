import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import { useSelector, useDispatch } from "react-redux";
import { setURL, setFileName } from "../../actions";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function SelectVideo() {
  const v = useSelector(state => state.videoList);
  const dispatch = useDispatch();
  const videoList = v.videoList;

  const handleChange = event => {
    let URL = "/get_video/" + event.target.value;
    dispatch(setURL(URL));
    dispatch(setFileName(event.target.value));
  };

  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          displayEmpty
          onChange={handleChange}
          className={classes.selectEmpty}
          value={v.fileName}
        >
          <MenuItem value="" disabled>
            Select Video
          </MenuItem>
          {videoList.map(fileName => {
            return <MenuItem value={fileName}>{fileName}</MenuItem>;
          })}
        </Select>
        <FormHelperText>Select Video</FormHelperText>
      </FormControl>
    </div>
  );
}

export default SelectVideo;
