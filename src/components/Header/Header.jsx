import React from 'react';
import {push} from 'connected-react-router';
import {makeStyles} from "@material-ui/styles";
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import logo from '../../assets/img/icons/logo.png'
import { useSelector, useDispatch } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';
import {HeaderMenu} from './index.js';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444"
    },
    ToolBar: {
        margin: '0 auto',
        maxWidth: 1024,
        width: '100%'
    },
    IconButton: {
        margin:'0 0 0 auto'
    }
});

const Header = () => {
    const classes = useStyles();
    const selector = useSelector((state) => state)
    const isSignedIn = getIsSignedIn(selector)
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <ToolBar className={classes.ToolBar}>
                    <img src={logo} alt="ロゴ" width="128px"
                         onClick={() => dispatch(push("/"))}
                    />
                    {isSignedIn && (
                        <div className={classes.IconButton}>
                             <HeaderMenu/>
                        </div>
                    )}
                </ToolBar>
            </AppBar>
        </div>
    )
}

export default Header;