import React, { Component } from 'react';
import './Album.scss';
import { Button, CardActions, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

class Album extends Component {
    render() {

        const { name, artists, numberOfTracks, releaseDate, image, url } = this.props.album;

        return (
            <Card className="card" elevation={3}>
                <CardMedia className="album-picture" image={image ? image : 'assets/images/artist-default.png'} title={name}/>
                <CardContent>
                    <Typography variant="h6" noWrap>{name}</Typography>
                    <Typography variant="body2" className="album-info"><AudiotrackIcon/>&nbsp;{numberOfTracks.toLocaleString()} tracks</Typography>
                    <Typography variant="body2" className="album-info"><CalendarTodayIcon/>&nbsp;{releaseDate}</Typography>
                </CardContent>
                <CardActions className="album-preview">
                    <Button size="small" color="primary" href={url} target="_blank">
                        Preview on Spotify
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default Album;
