import createStyles from '@material-ui/core/styles/createStyles';
import { Component } from 'react';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActions } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PeopleIcon from '@material-ui/icons/People';

const style = theme => createStyles({
    card: {
        width: '250px',
    },
    media: {
        height: '0',
        paddingTop: '100%'
    },
    rating: {
        display: 'flex'
    }
});

class SearchResult extends Component {
    render() {
        const { name, image, numberOfFollowers, popularity } = this.props.artist;
        const stars = Math.ceil(popularity/20) || 1;
        return (
            <Card className={this.props.classes.card} elevation={3}>
                <CardMedia className={this.props.classes.media} image={image ? image : 'assets/images/artist-default.png'} title={name}/>
                <CardContent>
                    <Typography variant="h6" noWrap>{name}</Typography>
                    <Typography variant="body2" style={{ display: 'flex', alignItems: 'center' }}><PeopleIcon/>&nbsp;Followers: {numberOfFollowers.toLocaleString()}</Typography>
                </CardContent>
                <CardActions style={{ padding: 16 }}>
                    {[...Array(stars)].map((e, i) => <StarIcon key={i} color="primary" style={{ margin: 0 }}/>)}
                    {[...Array(5 - stars)].map((e, i) => <StarBorderIcon key={i} color="primary" style={{ margin: 0 }}/>)}
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(style)(SearchResult);
