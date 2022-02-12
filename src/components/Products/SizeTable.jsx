import React from 'react';
import {useSelector} from 'react-redux';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {makeStyles} from "@material-ui/styles";
import {getFavoriteSize} from '../../reducks/users/selectors';


const useStyles = makeStyles({
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
})

const SizeTable = (props) => {
    const classes = useStyles()
    const selector = useSelector((state) => state);

    //productIdをurlから取得
    const productId = props.id;

    //お気に入りproductsの配列
    let favoriteProducts = getFavoriteSize(selector);

    //削除したいお気に入りID
    const favId = (size) => {
        const index = favoriteProducts.findIndex(item => item.productId === productId && item.size === size)
        return favoriteProducts[index].favoriteId;
    }
    
    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableBody>
                    {props.sizes.length > 0 && (
                        props.sizes.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{item.size}</TableCell>
                                <TableCell>残り{item.quantity}点</TableCell>
                                <TableCell className={classes.iconCell}>
                                    {item.quantity > 0 ? (
                                        <IconButton onClick={() => props.addProduct(item.size)} className={classes.iconCell}>
                                            <ShoppingCartIcon />
                                        </IconButton>
                                    ) : (
                                        <div>売切</div>
                                    )}
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                        {item.fav ? (
                                            <IconButton onClick={() => props.deleteFavorite(index, favId(item.size))} className={classes.iconCell}>
                                              <FavoriteIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton onClick={() => props.addFavorite(item.size, index)} className={classes.iconCell}>
                                              <FavoriteBorderIcon />
                                            </IconButton>
                                        )
                                       }
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SizeTable;