import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

function Rating(props) {

    const { rating } = props;

    return (
        <React.Fragment>
            {[...Array(rating)].map((e, i) => <StarIcon key={i} color="primary"/>)}
            {[...Array(5 - rating)].map((e, i) => <StarBorderIcon key={i} color="primary"/>)}
        </React.Fragment>
    )
}

export default Rating;
