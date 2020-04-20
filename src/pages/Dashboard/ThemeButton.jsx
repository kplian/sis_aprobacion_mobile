import React from 'react';
import {ThemeContext} from './main-context';
import IconButton from '@material-ui/core/IconButton';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';

class ThemeButton extends React.Component {
  render() {
    let props = this.props;
    return (
        <IconButton color="inherit" {...props}>
            <FormatColorFillIcon />
        </IconButton>
    );
  }
}
ThemeButton.contextType = ThemeContext;

export default ThemeButton;