Koa Startup Kit
=======================

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [License](#license)

Features
--------

- **Local Authentication** using Email and Password
- Koa2 + Node8 + async/await
- Database migrations & seeds
- MassiveJS data mapper
- Schema validation with Joi
- Hadlebars templates/layouts/partials/helpers
- Flash notifications
- MVC Project Structure
- Sass stylesheets (auto-compiled with HMR using FuseBox)
- Bootstrap 3 ([Paper Kit 2](https://www.creative-tim.com/product/paper-kit-2) from CreativeTim)
- Contact Form (Sendgrid)
- **Account Management**
 - Profile Details
 - Change Password
 - Forgot Password
 - Reset Password
 - Delete Account
- CSRF protection

Prerequisites
-------------

- [Redis](https://redis.io/)
- [Postgres](https://www.postgresql.org/)
- [Node.js 8.0+](http://nodejs.org)
- Command Line Tools
 - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:** [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) (or **OS X 10.9+**: `xcode-select --install`)
 - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp;**Ubuntu** / <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_Linux_Mint.png" height="17">&nbsp;**Linux Mint:** `sudo apt-get install build-essential`

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/sabarasaba/koa-startup-kit/.git myproject

# Change directory
cd myproject

# Install NPM dependencies
yarn

# Make a local copy of .env.example and fill in your app settings db connection
cp .env.example .env

# Run redis
redis-server

# Then simply start your app
yarn dev
```

For production simply run

```bash
yarn start
```

NOTE: Bare in mind that production mode will enforce https.


License
-------

The MIT License (MIT)

Copyright (c) 2014-2016 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
