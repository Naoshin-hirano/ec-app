import React, { useCallback, useState } from 'react';
import {push} from 'connected-react-router';
import {makeStyles} from "@material-ui/styles";
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import logo from '../../assets/img/icons/logo.png'
import { useSelector, useDispatch } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';
import {HeaderMenu, ClosableDrawer} from './index.js';

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

    const [open, setOpen] = useState(false);
    //クリックした（keydown）のがtabやshiftなら開閉にならずfalseを返す
    const handleDrawerToggle = useCallback((event) => {
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return
        }
        setOpen(!open)
    }, [setOpen, open]);
    
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <ToolBar className={classes.ToolBar}>
                    <img src={logo} alt="ロゴ" width="128px"
                         onClick={() => dispatch(push("/"))}
                    />
                    {isSignedIn && (
                        <div className={classes.IconButton}>
                             <HeaderMenu handleDrawerToggle={handleDrawerToggle}/>
                        </div>
                    )}
                </ToolBar>
            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle} />
        </div>
    )
}

export default Header;