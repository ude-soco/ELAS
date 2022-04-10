# StudyCompass

<p align="center">
<img height="250px" src="https://user-images.githubusercontent.com/42224338/127767915-46af828c-f15c-4367-a5bf-0620a8ad269c.png" alt="StudyCompass logo"> </br>
</p>

## Table of Contents

- [Project info](#project-info)
- [Project structure](#project-structure)
- [Demo](#demo)
- [Scraper](#scraper)
- [How to run](#how-to-run)
- [Technologies](#technologies)
- [Links](#links)
- [Group Members](#group-members)

## Project Info

StudyCompass gives you an overview of all available courses for a selectable study program and arbitrary semester.

### Main Idea

1. Select from a variety of study programs from the Faculty of Engineering
2. Having an interactive interface to select and compare courses
3. Decide which courses to choose based on ratings and time compatibility

## Project structure

#### Components

![image](https://user-images.githubusercontent.com/42224338/127767789-ae1bbb57-80af-481c-a3b1-0a3f3559b988.png)

## Demo

### Start Page

- Gives additional information about the project
- List of useful links

![StartPage](https://user-images.githubusercontent.com/42224338/127767803-84ea5a6d-3084-4b32-8992-e77a9992750b.png)

### Program Selector

- Select a study program from the list
- Select a semester
- After your selection you will be provided with an overview of the subject types and their amount

![ProgramSelector](https://user-images.githubusercontent.com/42224338/127767806-1586a52b-3c2c-4153-9a05-d5e553f4a8a7.png)

### Course Selector

- Select courses from the list
- Use the filter to narrow down the list of available courses (optional)
- Selected courses will be shown in a separate table and can be removed from the selection again
- An interactive bar chart shows you the amount of weekly hours of workload your selection has

![CourseSelector](https://user-images.githubusercontent.com/42224338/127767810-05df5ea5-5ee9-4cd4-9b9d-bf36eb3d127e.png)

### Compare Page

- This pages provides a Heat map to visualize overlaps between courses
- The course ratings will be shown in a table below
- Also in the table you can get redirected to the course's LSF page as well as a list of all offered times of the course
- You can remove unwanted courses from your selection
- After removing a course you can restore it again in the "Removed Subject" tab

![ComparePage](https://user-images.githubusercontent.com/42224338/127767814-c1e53fa0-2633-4fba-9f38-d99961ba3a48.png)
![ComparePageRestore](https://user-images.githubusercontent.com/42224338/127767816-15570bae-01ea-4035-8a12-36c8add8e252.png)

## Scraper

In collaboration with the LivewareProblem-Group, the [Scraper from the original StudyCompass-Project](https://github.com/FloRich/uni-due-course-catalog-scraper) got adapted to the needs of both our groups' new projects.

### How to run the Scraper

You can scrape new information from the LSF by opening `http://localhost:3000/scrape`, inserting the latest LSF link and clicking on the button "Start scraping".

## How to run

1. Download and install [NodeJS](https://nodejs.org/de/download/)
2. Rename `example.env` to `.env`
3. Run the project and install it locally using npm:

```
$ npm install
$ npm start
```

4. Open `http://localhost:3000` to view it in the browser.

## Technologies

Project created with:

- [NodeJS](https://nodejs.org/de/download/)
- [React](https://reactjs.org/docs/getting-started.html)
- [Material Design](https://material-ui.com/getting-started/installation/)
- [ApexCharts](https://apexcharts.com/docs/react-charts/)

## Links

- [Advertisment video](https://youtu.be/7DCxgKcqt2I)
- [Demo video](https://youtu.be/007pnTNcOKk)

## Group members

- [Sofie Kalthof](https://github.com/sofiekalthof)
- [Christoph Vorer](https://github.com/ChrizzieSFN)
- [Joshua Redmann](https://github.com/Jashnok)
