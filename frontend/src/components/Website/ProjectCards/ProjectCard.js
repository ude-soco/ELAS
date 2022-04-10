import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom'
import {CardActionArea, Collapse, Grid, IconButton, Tooltip} from "@material-ui/core";
import YouTubeIcon from '@material-ui/icons/YouTube';
import GitHubIcon from '@material-ui/icons/GitHub';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    transition: "all .35s linear",
    boxShadow: " 0px 8px 9px 0px rgba(0,0,0,0.4)",
    "&:hover": {
      boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.8)"
    }
  },
  media: {
    height: 430,
    paddingTop: '56.25%', // 16:9
  },
  textBox: {
    height: 135,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function ProjectCard(props) {
  const {name, image, shortName, description, teamMembers} = props;
  const styles = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);
  const [hover, setHover] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card raised={hover} onMouseEnter={()=>setHover(!hover)} onMouseLeave={()=>setHover(!hover)}>
      <Tooltip arrow placement="bottom" title={<Typography>View project</Typography>}>
        {/*<CardActionArea onClick={isLoggedIn ? () => history.push('/' + shortName) : () => history.push('/login')}>*/}
        <CardActionArea onClick={() => history.push('/' + shortName)}>
          <CardMedia
            className={styles.media}
            image={image}
            title={description}
          />
          {/*<CardContent>*/}
          {/*<Typography variant="body2" color="textSecondary" component="p">*/}
          {/*  {description.substring(0, 200)}*/}
          {/*  {description.replace(/\s+/g, '').length > 125 ? "..." : ""}*/}
          {/*</Typography>*/}
          {/*</CardContent>*/}
        </CardActionArea>
      </Tooltip>
      <CardActions disableSpacing>
        <Grid container alignItems="center">
          <Grid item xs style={{marginLeft: 8}}>
            <Typography variant="h6">
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip arrow placement="bottom" title={<Typography>{expanded ? "Hide details" : "Show details"}</Typography>}>
              <IconButton
                className={clsx(styles.expand, {
                  [styles.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                size="large">
                <ExpandMoreIcon/>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography gutterBottom><b>Description</b></Typography>
          <Typography gutterBottom style={{marginBottom: 16}}>{description}</Typography>
          <Typography gutterBottom><b>Group members</b></Typography>
          <Typography gutterBottom>{teamMembers}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
