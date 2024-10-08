# [ChicKickzz](https://chickickzz10.netlify.app/)

## Overview

ChicKickzz is a full-stack e-commerce platform designed for sneaker enthusiasts, leveraging the MERN (MongoDB, Express.js, React.js, Node.js) stack. The platform provides a seamless and intuitive shopping experience, enabling users to browse, select, and purchase sneakers from a curated catalog. Key features include a responsive user interface, secure user authentication, dynamic product management, and an integrated admin panel for efficient order and inventory management. The project showcases expertise in full-stack development, RESTful API design, and state management in React.You can visit the site [here](https://chickickzz10.netlify.app/)

## Table of Contents

- [Tech](#tech)<br/>
- [Developing](#developing)<br/>


## Tech

This project utilizes the [MERN](https://www.mongodb.com/mern-stack) stack. For authentication, [JWT](https://jwt.io/) .

**Front-End**

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)


**Back-End**

- [Node.JS](https://nodejs.org/en/)
- [Express.JS](https://expressjs.com/)
- [Mongoose.JS](https://mongoosejs.com/)

**Database**

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

**Authentication**

- [JSON Web Tokens](https://jwt.io/)


## Developing

To run this application locally, you will need the following prerequisite programs:

- [Node.JS and NPM](https://nodejs.org/en/)
- [Create React App](https://github.com/facebook/create-react-app)
- [MongoDB](https://www.mongodb.com/)

**Back-End Setup**

First, install the necessary packages via:

```
npm i
```

Refer to the [`package.json`](https://github.com/Niraaj10/ChicKickzz/blob/main/server/package.json) in the [`/server`](https://github.com/Niraaj10/ChicKickzz/tree/main/server) directory for more information about what is being installed.

Then, setup the `.env` file in the root of the [`/server`](https://github.com/Niraaj10/ChicKickzz/tree/main/server) directory. (**Note**: this will be gitignored)

```bash
# for mongodb connection
MONGODB_URL=mongo_secret_here

# for authentication via signing tokens
ACCESS_TOKEN_SECRET=jwt_secret_here
REFRESH_TOKEN_SECRET=jwt_secret_here

# for cloudinary
CLOUD_NAME=cloudinay_name_here
```

Now you can spin up the backend. Default port is `5000`. This can be changed in [`backend.js`](https://github.com/Niraaj10/ChicKickzz/blob/main/server/backend.js).

```bash
# start server
node .

# explicit command
node backend.js
```

**Front-End Setup**

First, install the necessary packages via:

```
npm i
```

Refer to the [`package.json`](https://github.com/Niraaj10/ChicKickzz/blob/main/client/package.json) in the [`/client`](https://github.com/Niraaj10/ChicKickzz/tree/main/client) directory for more information about what is being installed.

Then, setup the `.env` file in the root of the [`/frontend`](https://github.com/Niraaj10/ChicKickzz/tree/main/client) directory. (**Note**: this will be gitignored)


Now you can spin up the frontend. Default port is `3000` for a [create-react-app](https://create-react-app.dev/docs/getting-started/) 

```bash
# start react app
npm start
```

