# notes-app
Winter of code project done by Soutrik Das 
This is a simple app with the following features 
- Authentication : Use google login provider to handle login with google account
- Adding Notes : For each note a json/document ( as firebase calls it)  with certain properties ( createdAt , name , uid and other stuff ) is added to a collection named “notes” , using the  `get` method 
- Editing : Copy data from existing note, allow user to change and when done, use the `set` function to update the data in firestore
- View : Query notes that are made by the current logged in user and then use a function to add html using `appendChild` depending on the number of notes
