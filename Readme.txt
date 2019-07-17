Download or clone TrainingProject.

Training-API
  1. Open Training-API Project in visual studio 
  2. Open web.config file of training-API project and change the connection string of your sql server DB.
	      Change From --- > connectionString="server=.; database=TrainingDB; integrated security=true;
                To ---> connectionString= (to your sql server DB connection )
  3. Run the service, it open in browser with domain/ip with port no.
  4. Copy the URL. - http://localhost:55067

Training-Web
  5. Open Training-Web project in atom or visual studio code editor
  6. Open environment.ts file from  ---> Training-web/src/environments/
	7. Paste the API URL which copied before
        Change From ---> TRAINING_API_URL:'http://localhost:55067/',
                To  ----> TRAINING_API_URL: (to your api service url)
  8. Go to command prompt of training-web project and run npm install
  9.npm start
  10. Open in browser - http://localhost:4200
