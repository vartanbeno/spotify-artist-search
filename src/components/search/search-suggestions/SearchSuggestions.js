import React from 'react';
import { Avatar, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './SearchSuggestions.scss';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';

const style = theme => createStyles({
    list: {
        backgroundColor: theme.palette.background.paper
    },
    listItem: {
        '&:hover': {
            backgroundColor: theme.palette.background.listItem
        }
    }
});

const SearchSuggestions = props => {
    const { searchSuggestions } = props;
    return (
        <List className={"suggestion-list " + props.classes.list}>
            {searchSuggestions.map(artist =>
                <Link key={artist.id} to={`/artist/${artist.id}/albums`} className="artist-link">
                    <ListItem button className={"artist-item " + props.classes.listItem}>
                        <Avatar className="artist-image"
                                src={artist.image ? artist.image : "/assets/images/artist-default.png"}/>
                        <ListItemText primary={<Typography noWrap>{artist.name}</Typography>}/>
                    </ListItem>
                </Link>
            )}
        </List>
    );
};

export default withStyles(style)(SearchSuggestions);
