# Blog-Front

This website is a single page application built with React.js and TypeScript. It is my second version of the Odin Project blog project. The first was fully functional, but I wanted to update the code with new things that I have learned since originally building it. I also used this as an opportunity to further my practice with Bootstrap. The back end repo can be found [here](https://github.com/JonathanDPotter/blog-api-2), and the repo for this application can be found [here](https://github.com/JonathanDPotter/blog-front-2).

## Technologies used

---

This app uses React Router for page routing, Redux for state management, Axios for api calls, react-markdown to display markdown, and Bootstrap for styling. The back-end is built with Express.js and manages a MongoDB noSQL database to make a full-stack MERN application.

## Functionality

---

When a user opens the home page they can view all published blog posts. The newest posts are at the top, and the user can scroll down to see older posts. If the user clicks on the title of a post, the post will open in full on a seperate page. If the user is logged in and is the author of the post, the user will be able to edit or delete the post. The user can see all posts by a particular author by clicking on the author's name. A user can also make a new post and if they set it as published, it will show up on the home page.

---
## A note on testing

I would have tested more components and pages, but react-markdown interfered with the function of jest in ways that I couldn't fix. I certainly would have liked to have included more tests for my app.

![image](https://user-images.githubusercontent.com/30156468/212110328-e3049fba-7d14-44b1-b8dd-84ec62cbab2b.png)
