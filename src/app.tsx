import { createTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Content from './components/content';

const theme = createTheme({
    palette: {
        primary: {
            main: '#163268',
        },
    },
});

const useStyles = makeStyles(() => ({
    root: {
        background: `linear-gradient(0deg, ${theme.palette.primary.main} 30%, white 30%)`,
    },
}));

const App = () => {
    const classes = useStyles();

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <Content />
                </div>
            </ThemeProvider>
        </Router>
    );
};

export default App;
