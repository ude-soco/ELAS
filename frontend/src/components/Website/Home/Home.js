import React, {useState} from 'react';
import ProjectCards from "../ProjectCards/ProjectCards";
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
        id="outlined-basic"
        label="Search for projects"
        value={projectSearch}
        onChange={handleProjectSearch}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
      />
      <Divider className={classes.gridHeader}/>
      <Grid container spacing={3} className={classes.gridHeader}>
        {projectDetails.map((details, index) => {
          let nameToSearch = details.name.toLowerCase();
          const found = nameToSearch.includes(projectSearch);
          if (found) {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProjectCards
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
