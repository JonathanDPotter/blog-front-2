import React from "react";

const About = () => {
  return (
    <div>
      <div className="container">
        <h2>About</h2>
        <p>
          This website is a single page application built with React.js and
          TypeScript. It is my second version of the Odin Project blog project. The first was fully functional, but I wanted to update the code with new things that I have learned since originally building it.
        </p>
        <hr />
        <h3>Technologies used</h3>
        <p>
          This app uses React Router for page routing, Redux for state management,
          Axios for api calls, and Bootstrap for styling. The back-end is built with Express.js and manages a MongoDB noSQL database to make a full-stack MERN application.
        </p>
        <hr />
        <h3>Functionality</h3>
        <p>When a user opens the home page they can view all published blog posts. The newest posts are at the top, and the user can scroll down to see older posts. If the user clicks on the title of a post, the post will open in full on a seperate page. If the user is logged in and is the author of the post, the user will be able to edit or delete the post. The user can see all posts by a particular author by clicking on the author's name. A user can also make a new post and it they set it as published, it will show up on the home page.</p>
      </div>
    </div>
  );
};

export default About;
