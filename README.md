# Junction-2024-Aava-Challenge
MindLink Mobile app for Aava challenge at Junction 2024!

### Group members
Jesse Hantula, Joel Pietiläinen, Arthur Gerster, Yaqoub Baisili, Laura Kloiber

## how to run
1. Clone the repository
2. cd to the backend directory and install the requirements using `pip install -r requirements.txt` if needed, then run `python ./manage.py runserver 0.0.0.0:8080`
3. Find your ip by running `ifconfig` (search for IP under en0) and add `GRAPHQL_URI=http://{your-ip}:8080/graphql/` to a .env file in the frontend directory
4. cd to frontend and run `npm install`, then `npm start`
5. Scan the QR code in your terminal with the Expo Go app
