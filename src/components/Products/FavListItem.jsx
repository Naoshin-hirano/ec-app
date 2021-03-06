import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {makeStyles} from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {useSelector} from "react-redux";
import {getUserId} from "../../reducks/users/selectors";
import {db} from "../../firebase/index"
import {push} from "connected-react-router"
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    list: {
        height: 128
    },
    image: {
        objectFit: 'cover',
        margin: 16,
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
}))

const FavListItem = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const uid = getUserId(selector);

    const image = props.product.images[0].path;
    const name = props.product.name;
    const price = Number(props.product.price).toLocaleString();
    const size = props.product.size;

    const removeProductFromCart = (id) => {
        return db.collection('users').doc(uid)
                 .collection('favorite').doc(id)
                 .delete()
    }

    return (
        <>
           <ListItem className={classes.list}>
               <ListItemAvatar onClick={() => dispatch(push('/product/' + props.product.productId))}>
                  <img className={classes.image} src={image} alt=""/>
               </ListItemAvatar>
               <div onClick={() => dispatch(push('/product/' + props.product.productId))} className={classes.text}>
                   <ListItemText
                   primary={name}
                   secondary={"サイズ" + size}
                   />
                   <ListItemText
                   primary={"¥" + price}
                   />
               </div>
               <IconButton onClick={() => removeProductFromCart(props.product.favoriteId)}>
                   <DeleteIcon/>
               </IconButton>
           </ListItem>
           <Divider />
        </>
    )
}

export default FavListItem;