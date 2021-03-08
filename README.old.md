# notes-app
Winter of code project done by Soutrik Das 
This is a simple app with the following features 
- Authentication : Use google login provider to handle login with google account
- Adding Notes : For each note a json/document ( as firebase calls it)  with certain properties ( createdAt , name , uid and other stuff ) is added to a collection named “notes” , using the  `get` method 
- Editing : Copy data from existing note, allow user to change and when done, use the `set` function to update the data in firestore
- View : Query notes that are made by the current logged in user and then use a function to add html using `appendChild` depending on the number of notes

# Dev Diary 

## 2021-02-16 : Authentication and routing with links done 

For auth I just used google's pop up sign in provider , so no css to write , just needed to configure the buttons with the correct function. However I have not yet figured out how to send the user data ( login credentials ) from one html page to another. On asking Aryan Sir, I found out that it is allowed to use frameworks. 

## 2021-02-16 : Auth carries over to other pages !

Previously when I built the mock app it was of one page only, but it seems the auth state is carried over to other html pages as well ( atleast within the live server ). Now I need to make the notes app backend and frontend, the main bulk of the work! 