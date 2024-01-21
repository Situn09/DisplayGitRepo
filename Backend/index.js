const { Octokit } = require("@octokit/rest");
const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

const constants = {
  hostname: "api.github.com",
  user_agent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36",
  error_message: "Oops! Something went wrong!",
};

const generateOptions = (_path) => {
  return (options = {
    hostname: constants.hostname,
    path: _path,
    headers: {
      "User-Agent": constants.user_agent,
    },
    OAUth: process.env.GIT_AUTH_TOKEN,
  });
};

const setHeaders = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};
app.use(setHeaders);

app.get("/:user/:perpage/:page", (req, res) => {
  const user = req.params.user;
  const page = req.params.page;
  const perpage = req.params.perpage;
  const options = generateOptions(
    `/users/${user}/repos?per_page=${perpage}&page=${page}`
  );
  https.get(options, (r) => {
    console.log(r);
    r.pipe(res);
  });
});
app.listen(port, () => {
  console.log("port is ready to listen");
});
