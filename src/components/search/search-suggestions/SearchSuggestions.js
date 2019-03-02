import React from 'react';
import { Avatar, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './SearchSuggestions.scss';

const SearchSuggestions = props => {
    const { searchSuggestions } = props;
    return (
        <List className="suggestion-list">
            {searchSuggestions.map(artist =>
                <Link key={artist.id} to={`/artist/${artist.id}/albums`} className="artist-link">
                    <ListItem button className="artist-item">
                        <Avatar className="artist-image"
                                src={artist.image ? artist.image : "/assets/images/artist-default.png"}/>
                        <ListItemText color="primary" primary={<Typography noWrap>{artist.name}</Typography>}/>
                    </ListItem>
                </Link>
            )}
        </List>
    );
};

export default SearchSuggestions;
