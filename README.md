# Junction-2024-Aava-Challenge
Mobile app for Aava challenge at Junction 2024!

## how to run
1. Clone the repository
2. cd to backend and install the requirements using `pip install -r requirements.txt` if needed then run `python ./manage.py runserver 0.0.0.0:8080`
3. Find your ip by running `ifconfig` and add GRAPHQL_URI=http://<your-ip>:8080/graphql/ to .env file in frontend
4. cd to frontend and run `npm install`
5. cd to frontend and run `npm start`