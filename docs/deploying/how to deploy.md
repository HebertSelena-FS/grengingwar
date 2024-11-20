# How to Deploy

## Table of Contents
* [General Info](#general-information)
* [Server Setup](#server-setup)
* [Maintaining](#maintence)
* [Notes](#notes)



## General Information

Git repository: https://github.com/ePortfolios/wdv349-HebertSelena-FS

Virtual server: 
company: ishosting.com

OS: Ubuntu 22 x64

OS engine: nginx

acess: 

ishosting.com
* username: *********** 
* password: ***********

current pannel being used: ISPMANAGER

pannel access:
* username: ***********
* password: ***********


## Server Setup

* to start off you will need to install a few packages the commands are listed below to install them on to the server
  * ``` apt install git ```
  * ``` apt install node ```
  * ``` apt install npm ```
  * ``` npm install -g pm2 ```

* once you log into the pannel you will need to go to the shell and do a ssh connection to the repository. here is a useful youtube video that shows how to do it.
  * [ssh video](https://youtu.be/X40b9x9BFGo?si=gDmEvmlAD7QIp0U0)

* once you have that you will need to go into the proper directory of the file system with the shell/client to clone the project into the server.
    * commands are as listed 
      * ``` cd /var/www/www-root/data/www/grengingwar.com/<repo-name>```
      * ``` git clone <repo url> ```

* after you have cloned the repo you will then need to set up the domain configuration to read the right location.
    * you will need to go into the sites tab and create new and fill out the information. 
      * domain name
      * aliases aka www.{domainname}.com
      * the SSL certificate
      * make sure the IP address is the default

* after you have done that you will want to go into the file manager it will put you by default in 
```/var/www/www-root/data/ ```
you will need to click the first slash of it to get to the config and traverse to ``` /ect/nginx/nginx.config ``` below is the code you will replace the entire file with.
  * [nginx.conf](./nginx.conf)
  * copy the entire file and paste it into the nginx configuration file replacing everything in the file. hit save and close at the bottom

* the next step is the configuration for the website conf file that is located at 
  * ``` /ect/nginx/vhost/www-root/{domainname.com}.conf ```
  * you will be doing the same thing with the file below copy the full file and paste it into the domain conf file completely replacing all code for no errors.
  * [domain.conf](./domain.conf)

* Next we are going to be building the client so that the server can display your client.
  * go to directory in your shell by ``` cd /var/www/www-root/data/www/grengingwar.com/{repo-name}/Client ```
  * you would then add a file for your .env file and add it (I am not providing that information for this)
  * next you will ``` npm run build ``` wait for that to finish.
  * that should have your full client deployed 

* next we are going to work on getting the server and API running so the full site is deployed and working!
  * from the current directory run ``` cd ../server ``` 
  * you would then add a file for your .env file and add it (I am not providing that information for this)
  * then you will run ``` npm install ``` if you are in the server directory to install dependencies wait for it to finish before moving on.
  * you will do the same again just going into the API directory ``` cd ../API```
  * you would then add a file for your .env file and add it (I am not providing that information for this)
  * run the command ``` npm install ``` in this location in the API directory. Do not move onto the next step till that is done.
  * you will need put in the following command for pm2 to run your server and restart it any time it goes down.
    * ``` pm2 start /var/www/www-root/data/www/grengingwar.com/{repo-name}/server/inex.js ```
    * we will run that again just directing it to the API now 
    * ``` pm2 start /var/www/www-root/data/www/grengingwar.com/{repo-name}/API/server.js ```
    * next we are going to run a command to save these processes 
    * ``` pm2 save ```
    * what that will do is automatically restart your node projects/server/API automatically if your server goes down or is restarted.

## Maintenance

here will be a list of locations you might have to go into the server time to time so that you can reduce the amount of data being used on the server. You dont want to bog down the server with old log files. 

* file manager in the pannel 
* look for any files that generate with a ``` name"(1)".log ``` if there is more then 3 logs you can delete them if you have had no reason to go through the logs recently.
* locations are as labled 
  * ``` /var/www/httpd-logs/ ``` 
  * ``` /var/log/nginx/ ``` this location is most likely where you will have excessive log files you need to clear out the access and error logs are in this location. 

## Notes

* I am putting ************ where I am not putting the personal information I am not willing to share
* I could likely be missing some steps. Though, I am confident that is the full process with log maintence.
* I have no idea how to set up for data base as I have not gone through the process currently so I can not give the instructions.