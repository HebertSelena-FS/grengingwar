# Documentation: Home Page/client of Grenging War

## Design 

At the current time, I have no ideas for the visual design that will be used. Though I know that I need to get the following.

* background artwork
* button artwork
* npc artwork
* map artwork
* player artwork 
* item artwork
* inventory artwork


# Architecture

The development process for this page that at this time (dates below).   
* 3-19-24

The development and architecture for this page needs the following

* decided if the architecture and design will be pulled directly from the database or the API or possibly both.
* Establish the call to either the API or the Database to pull the user information. 
* add the functionality to gather resources and kill npcs
* add the functionality to gain the resources and drops from npcs into inventory
* dynamically call the information on the map. (currently API fills the data)



### API DATABASE or both
The debate in this is using the API to fill all the data for the game to work through the API. The conclusion and thought process behind this is that I can possibly save money in the server cost if everything is pulled from the API something that is designed to pull data more frequiently. How is this so? Well my thoughts are that I can save database hits by having the API keep up with all the current stuff and push data on a routine rate say every 3 hours to the database. That data would conclude of all the data being pushed at 1 time rather then 100's or 1000's of database hits in that duration. The database would be like the fail safe of data if something went wrong. In this design the API is handling all the data from npcs items players and so on. That is my current idea and plan. More research needs to be done on this 