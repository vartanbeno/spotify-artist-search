import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea, CardActions } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import './SearchResult.scss';
import { Link } from 'react-router-dom';
import Rating from './rating/Rating';

class SearchResult extends Component {
    render() {

        const { id, name, image, followers, rating } = this.props.artist;

        return (
            <Card className="card" elevation={3}>
                <Link to={`/artist/${id}/albums`}  style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardActionArea>
                        <CardMedia className="artist-picture" image={image} title={name}/>
                            <CardContent>
                                <Typography variant="h6" noWrap>{name}</Typography>
                                <Typography variant="body2" className="artist-followers"><PeopleIcon/>&nbsp;{followers.toLocaleString()} followers</Typography>
                            </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions className="artist-stars">
                    <Rating rating={rating}/>
                </CardActions>
            </Card>
        )

    }
}

export default SearchResult;
