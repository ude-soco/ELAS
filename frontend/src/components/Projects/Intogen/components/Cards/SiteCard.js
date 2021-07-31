import React from "react";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CardLayout } from "./SiteCardStyled";

export class SiteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }
  
  handleExpandClick = () => {
    this.setState({ expand: !this.state.expand });
  };

  render() {
    return (
      <CardLayout>
        <CardContent>
          <Typography style={{ color: "#FF6600" }} variant="h5" component="h2">
            {this.props.cardtitle}
          </Typography>

          <Typography color="textSecondary" gutterBottom>
            {this.props.cardundertitle}
            <Typography color="textSecondary" gutterBottom>
              {this.props.cardundertitle2}
            </Typography>
          </Typography>

          <Typography variant="body2" component="p">
            {this.props.carddescription}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton onClick={this.handleExpandClick}>
            <ExpandMoreIcon/>
          </IconButton>
        </CardActions>
        
        <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography color="textSecondary" paragraph>{this.props.cardexpandedtitle}</Typography>
            <Typography variant="body2" component="p" paragraph>{this.props.cardexpandedtext}</Typography>
          </CardContent>
        </Collapse>
      </CardLayout>
    );
  }
}
