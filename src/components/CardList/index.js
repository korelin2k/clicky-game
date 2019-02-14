import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Banner from "../Banner";
import MediaCard from '../Card';
import gotChars from "../../char.json";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        maxWidth: 1000,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function TitlebarGridList(props) {
    const { classes } = props;
    const [currentScore, setCurrentScore] = useState(-1);
    const [currentChoice, setCurrentChoice] = useState("");
    const [highScore, setHighScore] = useState(0);
    const [selections, setSelections] = useState([]);

    useEffect(() => {
        if (currentChoice !== -1) {
            console.log(`Current Score: ${currentScore}`);
            if (selections.includes(currentChoice)) {
                if (currentScore > highScore) {
                    setHighScore(currentScore);
                    console.log(`Winner! With: ${currentScore} and ${selections}`);
                    setCurrentScore(0);
                    setSelections([]);
                } else {
                    console.log(`Loser! With: ${currentScore} and ${selections}`);
                    setCurrentScore(0);
                    setSelections([]);
                }
            } else {
                setSelections([
                    ...selections, currentChoice
                ]);
                setCurrentScore(currentScore => currentScore + 1);
            }

            setCurrentChoice(-1);
        }
    }, [currentChoice]);

    return (
        <div className={classes.root}>
            <Banner currentScore={currentScore} highScore={highScore}/>
            {/* <div>
            Current Score: {currentScore}
            High Score: {highScore}
            </div> */}
            <GridList cellHeight={250} cols={4} className={classes.gridList}>
                {shuffle(gotChars).map(tile => (
                    <GridListTile key={tile._id}>
                        <MediaCard name={tile.name} image={tile.image} id={tile._id} onClick={() => setCurrentChoice(tile._id)} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);