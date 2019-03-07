import React, { Component } from 'react';
import './Album.scss';
import { CardActionArea, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Link } from 'react-router-dom';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';

const style = theme => createStyles({
    root: {
        borderTop: '1px solid ' + theme.palette.text.hint
    }
});

class Album extends Component {

    render() {

        const { name, artists, numberOfTracks, releaseDate, image, url } = this.props.album;

        return (
            <Card className="album-card" elevation={3}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                    <CardMedia className="album-picture" image={image} title={name}/>
                    <CardContent className="album-title-and-info" style={{ flex: 1, paddingBottom: 12 }}>
                        <div>
                            <Typography variant="h6" noWrap>{name}</Typography>
                            <div className="album-artists">
                                {artists.map(artist =>
                                    <Typography key={artist.id} variant="body2" color="primary" noWrap>
                                        <Link to={`/artist/${artist.id}/albums`} id={artist.id}>{artist.name}</Link>
                                    </Typography>
                                )}
                            </div>
                        </div>
                        <div>
                            <Typography variant="body2" className="album-info"><AudiotrackIcon/>&nbsp;{numberOfTracks.toLocaleString()} tracks</Typography>
                            <Typography variant="body2" className="album-info"><CalendarTodayIcon/>&nbsp;{releaseDate}</Typography>
                        </div>
                    </CardContent>
                </div>
                <CardActionArea className={this.props.classes.root} href={url} target="_blank" style={{ textAlign: 'center', padding: 8 }}>
                        <Typography color="primary" variant="body2" style={{ textTransform: 'uppercase' }}>Preview on Spotify</Typography>
                </CardActionArea>
            </Card>
        )
    }
}

export default withStyles(style)(Album);
