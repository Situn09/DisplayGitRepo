# Project: GitHub Repository Search for specific user
## Description
Welcome to the GitHub Repository Search project! This project allows users to search for public GitHub repositories of a specific user. Whether you're looking for a particular user's repositories or searching for repositories with a specific name within that user's account, this tool has got you covered.

## Features
### 1.User Repository Search:
- Enter the GitHub username of the user whose repositories you want to explore.
- Get a list of all public repositories belonging to the specified user.
### 2.Repository Name Search within User's Repositories:
- Enter the name of the GitHub repository you are interested in, within the specified user's account.
- Receive a list of repositories matching the provided name within the user's repositories.
### 3.Detailed Information:
- View detailed information for each repository, including the repository name, description, programming language.

# Getting Started
To use this project, follow these steps to set-up only backend because i already host forntend, to access the frontend go to this link 
https://situn09.github.io/DisplayGitRepo/ but you can't use beacause you need to set up backend to add functionality to this website so follow below step to set-up backend

### 1.Clone the Repository:
 - Clone this repository to your local machine using the following command:
##### bash
     git clone https://github.com/Situn09/DisplayGitRepo.git
### 2.Navigate to the Project Directory:
- Change into the project directory:
##### bash
         cd Backend
### 3.Install Dependencies:
- Make sure to install any required dependencies. You can do this using the following command:
##### Copy code
         npm install
### 4.Run the Application:
- Start the application with the following command:
##### sql
         npm start
### 5.Port ready to Listen
- you can see "port is ready to listen" in your terminal
- now you can access backend in this url http://localhost:3000
### 5.Access the Application:
- Open your web browser and navigate to https://situn09.github.io/DisplayGitRepo/ to access the GitHub Repository Search tool.
## Usage
### 1.User Repository Search:
- Enter the GitHub username in the designated input field.
- Click the "Search" button.
- View the list of public repositories associated with the specified user.
### 2.Repository Name Search within User's Repositories:
- After performing a user repository search, enter the GitHub repository name in the designated input field.
- Click the "Search" button.
- See the list of repositories matching the provided name within the specified user's repositories.
### 3.Navigate to diff page
- in bottom of this website you can jump into different page
- you can back and forth from any specific page using older and newer button
### 4.Set load repository per page
- you can set how many repository can load in single page , by default it load only 10 repository per page
## Technologies Used
### Frontend:
- HTML
- CSS
- JavaScript
### Backend:
- Node.js
- Express.js
### GitHub API:
- Utilizes the GitHub API for retrieving repository information.

## Acknowledgments
- Special thanks to the GitHub API for providing the necessary tools to make this project possible.

Feel free to contribute to the project by submitting issues or pull requests. Happy coding!
