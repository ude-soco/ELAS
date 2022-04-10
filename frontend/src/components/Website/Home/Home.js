import React, {useState} from 'react';
import ProjectCard from "../ProjectCards/ProjectCard";
import {Divider, Grid, InputAdornment, TextField} from "@material-ui/core";
import {projectDetails} from "../../../assets/data/data";
import SearchIcon from "@material-ui/icons/Search";


export default function Home(props) {
  const [projectSearch, setProjectSearch] = useState("");
  const {classes} = props;

  const handleProjectSearch = (event) => {
    setProjectSearch(event.target.value);
  }

  return (
    <>
      <TextField
        className={classes.container}
        id="outlined-basic"
        placeholder="Search for projects"
        value={projectSearch}
        onChange={handleProjectSearch}
        variant="outlined"
        style={{backgroundColor: "#fff"}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{color: "#909090"}}/>
            </InputAdornment>
          ),
        }}
      />
      <Divider className={classes.containerHeader}/>
      <Grid container justify="center" className={classes.containerHeader}>
        {projectDetails.map((details, index) => {
          let nameToSearch = details.name.toLowerCase();
          const found = nameToSearch.includes(projectSearch);
          if (found) {
            return (
              <Grid item xs={12} style={{maxWidth: "450px", margin: 8}} key={index}>
                <ProjectCard
                  name={details.name}
                  image={details.image}
                  description={details.description}
                  shortName={details.shortName}
                  teamMembers={details.teamMembers}
                  github1={details.github1}
                  github2={details.github2}
                  youtube={details.youtube}
                  deploy={details.deploy}
                />
              </Grid>
            )
          } else return "";
        })}
      </Grid>
    </>

  );
}
