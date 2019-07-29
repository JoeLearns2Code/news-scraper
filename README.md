# news-scraper

News-Scraper pulls articles from the website Quillete and allows the user to then click on the link to article to read more.  The user should be able to add a note about the article by clicking the "add note" button under each article.  

## Getting Started

news-scraper is deployed via Heroku.  A direct link for the Heroku can be found here: https://jl2cnews-scraper.herokuapp.com/

Files and other information can be found on GitHub here: https://github.com/JoeLearns2Code/news-scraper

If you wish to deploy locally, please see the Prerequisites and Installing sections below.  Otherwise, you can access the program from the Heroku link.


### Prerequisites

The data can be pulled directly from GitHub via GitBash on PC or via Terminal on Mac.  If you are new to this process, please follow the directions below:

When you have accessed the repository page on GitHub, you may simply download a Zip file and extract it to a directory of your choosing.  Alternatively, you may download the data directly to your device via GitBash if you have an SSH key.  More on adding an SSH key can be found here: https://help.github.com/en/enterprise/2.15/user/articles/adding-a-new-ssh-key-to-your-github-account

To download via GitBash, once you have a working SSH key with GitHub, create a folder you wish to download data into.  Next, click on the green 'Download or Clone' button on the GitHub respoitory page.  Make sure you have SSH key selected(and not HTTPS), and click on the clipboard icon.  This copies the address to your clipboard.

Next, navigate to the folder you wish to download the data into via GitBash or Terminal, and then simply type "git clone" followed by the link you copied onto your clipboard(paste via ctrl/cmd+v).  Press the enter key, and GitBash will pull the entire repository into your folder.

Additionally, you will need to have Node.js installed.  This can be done here: https://nodejs.org/en/


### Installing

Once you have the repository cloned, you will need to install a number of npm packages before you can begin using the program locally.  

Begin with adding a folder for node_modules by typing the following in the command line: npm init -y

Next you will need to install each package used for Friend Finder.  This can be done by typing each of the following into the command line:

* npm install
* npm install express
* npm install express-handlebars
* npm install mongoose
* npm install cheerio
* npm install morgan


It is also highly reccomended to have nodemon installed.  This is a global package which can be installed as follows:

* npm install -g nodemon

You will then need to build the spawtted_db database found on schema.sql.  This can be accomplished either through the MySQL Workbench or in the command console by typing: mysql -u root -p, and then entering your password when prompted.

In order to ensure the database will be connected correctly, you will need check the parameters in the connection.js file.  Make sure the port and password match with your localhost settings on MySQL Workbench.

Navigate to the folder location where the server.js found in the console.  Type "nodemon server.js" in the command line.  You should receive a message that it is now listening on port 3000.  If you wish to change this port, you will need to adjust this in the server.js file.

In your browser, navigate to localhost:3000(or whichever port you chose).  You should now see the main page for sPAWtted.


## Testing

HTML files can be validated here: https://validator.w3.org/#validate_by_input

The API & routing aspects of this program can be tested through use of the command console(GitBash/Terminal, etc.).  Simply add console.log under any section you wish to examine the results from in the console.



## Deployment

Navigate to https://github.com/ to clone.  Carefully follow the installation instructions above to deploy locally.


## Built With

Visual Studio Code: https://code.visualstudio.com/  
Node.js: https://nodejs.org/en/  
MongoDB: https://www.mongodb.com/
Handlebars: https://handlebarsjs.com/  
Heroku: https://dashboard.heroku.com 


## Contributing

Feel free to fork the repository for your own study.  


## Versioning

Use github for version control (https://github.com/your/project/tags).


## In development

The 'Add Note' feature is not yet fully implemented.  When working correctly, it should bring up a modal window that allows the user to add comments.  The ability to save, edit and delete these notes would also be added.  Additional CSS styling is needed.

## Authors

* **Joe Hutchinson**

## License

This project is not licensed.

## Acknowledgments

* Joe Rehfuss
* Trae Shanks
* Lan Truong
* Abdul Aziz

Thank you to my instructor & TA's.