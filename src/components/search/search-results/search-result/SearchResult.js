import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea, CardActions } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PeopleIcon from '@material-ui/icons/People';
import './SearchResult.scss';
import { Link } from 'react-router-dom';

class SearchResult extends Component {
    render() {

        const { id, name, image, numberOfFollowers, popularity } = this.props.artist;
        const stars = Math.ceil(popularity/20) || 1;

        return (
            <Card className="card" elevation={3}>
                <CardActionArea>
                    <Link to={`/artist/${id}/albums`}  style={{ textDecoration: 'none', color: 'inherit' }}>
                        <CardMedia className="artist-picture" image={image ? image : 'assets/images/artist-default.png'} title={name}/>
                        <CardContent>
                            <Typography variant="h6" noWrap>{name}</Typography>
                            <Typography variant="body2" className="artist-followers"><PeopleIcon/>&nbsp;{numberOfFollowers.toLocaleString()} followers</Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
                <CardActions className="artist-stars">
                    {[...Array(stars)].map((e, i) => <StarIcon key={i} color="primary"/>)}
                    {[...Array(5 - stars)].map((e, i) => <StarBorderIcon key={i} color="primary"/>)}
                </CardActions>
            </Card>
        )

    }
}

export default SearchResult;
