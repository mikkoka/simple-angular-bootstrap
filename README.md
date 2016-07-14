# simple angular bootstrap [![Build Status](https://travis-ci.org/TeemuKoivisto/simple-angular-bootstrap.svg?branch=master)](https://travis-ci.org/TeemuKoivisto/simple-angular-bootstrap) [![Coverage Status](https://coveralls.io/repos/github/TeemuKoivisto/simple-angular-bootstrap/badge.svg?branch=master)](https://coveralls.io/github/TeemuKoivisto/simple-angular-bootstrap?branch=master)
Simple Angular 1.5 bootstrap with Gulp and Bootstrap.

# General
This app is ultra small scaffold that I myself use as a base when starting out angular projects. It consists of basic gulp scripts for minifying the code and generic libraries that are useful for getting things done quick and easy.

# How to install
1. Install Node.js and nvm if you don't have them by now. Newest versions suit very well. 4.-something if you want the production-stable version.
2. Clone this repository and go to the root and enter ```npm i```.
3. After downloading dependencies install gulp and bower globally ```nvm i -g gulp bower```.
4. It's recommended to use Livereload plugin, [here's one for Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei).
5. This app uses dotenv for storing environment variables, rename the ```.dev-env``` file in the root of this folder to ```.env``` and anytime you want to use Travis or Heroku remember to add your variables to their config. Or for your own server create your own production ```.env```.
6. Now you're all set, enter ```gulp nodemon``` to run the development server.
7. Go to localhost:3333 and hit the Livereload button in the upper corner of your browser. Now anytime you make changes to the code Livereload automatically refreshes the page (so you don't have to spam F5).

# How to make changes
Here's some things that you need to know. The files inside ```src```-folder are moved to dist and all static assests are stored inside ```public```-folder. When you install frontend dependencies with bower remember to add the link or script tags to the ```index.html```. Sometimes the files ```gulp build-bower``` adds from the ```bower_components``` to the ```dist``` are undesired type e.g. ```less```-files. Then you have to override their default bower-settings and write as I've done to ```bower.json``` what library you ovverride and what files you rather want from its folder to be moved into ```dist```.

# App's structure summed up:

The source files are written into ```src```-folder. From that folder your gulp scripts move the files and process them into ```dist```-folder. Your ```index.html``` then gathers those files from that folder with link and script tags and vóila you got your Single-Page-Application. Frontend dependencies are installed with Bower using ```bower i <library> --save``` and if you need backend dependencies depending do you need them in production or not install them ```npm i <library> --save``` if you need them in production e.g. express or ```npm i <library> --save-dev``` if not e.g. gulp.

Create controllers to handle the stuff between view(html) and logic(services/factories). Do all your logic in services/factories e.g. calling the API or holding app-wide information. I myself prefer services over factories but in short: you can have only one service, you can create multiple instances from one factory. Add routes and new Angular libraries to ```app.routes.js```. 

Here's a list of important commands to remember:
1. ```npm i <library> --save``` or ```npm i <library> --save-dev``` or ```npm i -g <library> --save```
2. ```bower i <library> --save``
3. ```gulp nodemon```
4. ```npm run lint``` or ```npm run lint:fix```
5. ```npm test```

# Detailed version

## public  
Static files such as images and etc. The best practise of course is to use dedicated file-hosting server but that would be a bit over-kill in this case.

## gulp  
Where the gulp scripts are stored. The gulpfile.js at the root of this project automatically requires every file from this folder so that you don't have to (copied from yeoman's gulp-angular-bootstrap). There are as of writing this readme 3 files for keeping the app's development process manageable, The **build-app.js** file for gathering js and css source files and combining them into minified ones. Also in the end of tasks are pipings for livereload which leads us to **nodemon.js** file. This file is responsible for restarting the server after each build-script run and also refreshing the page at localhost:3333. Makes the development process so much more pleasant without having to hit F5 button constantly. **watch.js** file has currently only one script that's only purpose is to watch the source files inside ./public/app -folder and each time change is made run build scripts, notify livereload and after build script is ran nodemon script takes care of restarting the server to update all the changes. NOTE: I have some experience with hot reloading but too often I have to refresh the page as fallback when the changes don't actually update :/.

## test
Unit test files made with Mocha and Chai. I'm not a huge fan of testing but I admit they are keypart of any working application. Rendering virtual DOM often proves to be quite difficult in practise (manuals always promise something else) but with Angular I suppose the use of Angular-based injectables instead of 'real' globals such as $window or $document makes stubbing of them reasonable. Extra libraries I use but haven't included yet are Sinon and Super-test.

## e2e
End to end test files aka. Behavior-tests. While unit tests test invidual files or functions theses tests test the app's functioning in practise which means they start the app and render it into browser screen and click buttons and fill input fields and see if things go to shit or not. Haven't yet made any :DDD. Will update this soon. TODO

## individual files
There is a lot of odd stuff in any project which programmer might not never understand what they are for. With any Node.js project there is certain amount of files you'll get used to quickly and know what they do like ```package.json```. Some just stay in your near consciousness and you only become aware of them when things stop working. So remeding that issue in advance here's every file from the root of this folder with a small description what they are for:

### package.json
The one file to rule them all. This is the pom.xml of any Node.js project. Or Gemfile. Or.. well you get the idea. It has all the basic information how your app works and which libraries it uses. Also a vital thing it handles are the scripts run by ```npm```-command at the root of this folder. That often includes the famous ```npm start``` which often is the main script for starting a Node.js application (in our case we use Gulp for starting the development version of our app with ```gulp nodemon```, ```npm start``` is only used in production where gulp isn't needed.) And ```npm test``` is de-facto command for running tests. But often you want to create your own custom scripts with npm so you include those scripts in the ```package.json``` and they are runnable with e.g. ```npm run build``` -command. We have here various custom scripts that for example run the style check with Eslint ```npm run lint``` or run tests without creating coverage report with Instanbul ```npm run test:noc```. You could if you wanted run your gulp script from npm but that kinda beats the purpose of having a separate task-runner library.

Also important part to know is the difference of ```"dependencies"``` and ```"devDependencies"```. Simply put dependencies are the libraries your app *must* have in order to run it. DevDependencies are those libraries that are only needed when you're developing it thus when you have environment variable NODE_ENV=production set ```npm install``` automatically downloads only ```"dependencies"```.

### index.js
The "main" of this app. Creates an instance of server with ```const app = express();```, sets public folder to be statically hosted, sets every get-request to be handled with the same response: send the ```index.html```-file. Then it starts up the server to the assigned port and prints an informative message to the console. And that's basically it. Without going to deep into this topic this file is the minimal setup for running any Node.js server without an API. It can be found in any Node.js server project and has various other names such as ```app.js```or ```server.js```. Perhaps ```app.js```could be more appropiate since this file only spins up a single server. Often the server cluster is started with ```index.js``` file but meh. If you´ve read this far you can refactor it to to app.js if you feel seriously committed into learning Node.js :D.

### gulpfile.js
I already mentioned this but as a good transition from ```index.js``` this is basically the same but for Gulp. Which I mean by is that instead of server this requires all the gulp-scripts that every command is stored into its memory from ```gulp nodemon``` to ```gulp build-app```. Particularly bad practise is to have all your gulp scripts inside this file since it makes managing of them quite hard after you've gathered up a few.

### bower.json
The ```package.json``` for Bower which I think of like a frontend version of npm. But Bower does only mostly dependency management. Now I do know that some people think having two package management libraries is stupid and redundant but I have to disagree in this particular case. The reason is the absence of any module bundler such as Browserify or Webpack. Because those things make requiring of files easy and there is no hassle with having your server libraries such as express and your frontend libraries like angular mixed inside the same folder. But because using module bundler with Angular 1 has so much overhead to the whole development process I've decided against using it. Which makes Bower much smarter solution when you have to insert those ```<script>``` tags to your ```index.html```. Also even bigger reason is that you don't have to host the whole node_modules folder statically if you don't use CDN-versions of your libraries. Just trust me on this one, you rather do it this way. On other hand with React at least you don't really need Bower. Dunno about Angular 2.0 but I think that applies to it aswell.

### .bowerrc
Since by default dependencies marked by ```bower.json``` or ```package.json``` for that case are installed into the same folder as the package-file ```.bowerrc``` defines a custom path for those libraries to be installed at. In our case we want them inside public folder since we want to have those libraries available for our app to use.

### .eslintrc
The configuration file for Eslint which is a JavaScript style checker library. Here are the common rules I use for stylings such as double-quotes (") and 2 space indentation. The reason for double-quotes over single-quotes (') is that if I ever need to write english inside a string say: "Here's a message!" I'd have to escape the '-character if I were using single quotes. Now imagine a very long string with lots of escaping, yeah that is a nightmare if it happens to happen. And as a solution you might switch to double quotes if you otherwise use single quotes but then you have a problem with style check and everything so I'd rather use double quotes all the time than wait for those rare but very tiresome exception to happen. Also airbnb/base is the style quide from the Airbnb company. Supposedly it's pretty good.

### .gitignore
This is a rather generic file found in almost every git repository. It just tells git what folders and files are to be excluded from committing to the repo. In Node.js projects .gitignore is particularly important since we do not want to ever commit node_modules to git. Because that's why they have their own repositories so you can install them with ```npm installl``` when you download the project folder.

### .nvmrc
This is a rather unsignificant file that only tells Travis and Heroku which Node.js version this project uses without having to write it down in .yml files. The real reason why it's needed is because .. uh I don't remember.

### .travis.yml
Travis configuration file. Just tells Travis how to build this project and what scripts to run. Only thing worth nothing here is the sending of coverage report to Coveralls with ```- cat ./coverage/lcov.info | coveralls```. It's regular bash because Travis containers are Linux-distros so you could write your own bash scripts to do stuff when you build your projects.

# App structure
This app is made with Angular so I thought I'd describe some very basic information how they work.

## app.min.js
Is the minified version of the whole app. Located at the root so that the HTML-paths stay correct. And this file consists of these:

## app.routes.js
The "main" of this Angular project. Here I name my app and set it to a variable so that connecting components to it is bit quicker (no need for ```angular.module("MyApp")``` in every file). Also I name the Angular dependencies I use in this case it's only ```"ui.router"```. Well the aforementioned part could be also in a separate file but I think having a separate file for a one-liner is a bit silly. So the real purpose of this file (and why it's named) is that it holds all the routes of this app. Ui-router makes handling of nested controllers much easier than the regular ng-route so it's the preferable version of the two. Nothing really interesting about this, you'll learn the tricks of it if you really start to dig into Angular.

## components
This is the folder for those parts of your Angular app that it needs to work. I use this component structure rather than type-based structure where all controllers are inside controllers folder etc. Reason beings is that when app grows large it becomes hard to see what parts are connected and what components are related to what. This is just better for scaling up, trust me. And every component can be a page or a directive or multiple directives that are connected or whatever. You decide how'll make your app.

## stylesheets
I used to put my stylesheets inside components folder with html-files that they were styling on. That proved to be too tedious in this case so type-based structure works much better IMO with stylesheets. Now I can see all the styles from one go without to go through all the css-files in search of that one style that I could maybe use. And no CSS-processor like Stylus or SASS here because I haven't done much styling so I never really needed any of those fancy things that they give.

## controllers
Angular is based on MV** architechture that if you don't know what it is you should look up from wikipedia. But it 
