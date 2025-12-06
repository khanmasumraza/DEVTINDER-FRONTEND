#DevTinder

Epi-15
-Create a Vite + React Application
-Remove unecessary code and create a Hello World
-Install tailwind
-Install daisy ui
-Add navbar component to app.jsx
-Create a navbar seprate Component file
-Install react router dom
-Create BrowserRouter >Routes >Route=/Body > RouteChildren
-Create an Outlet in your Body component
-Create a footer

Epi-16
-Create a login Page
-Install axios
-CORS -install cors in backend =>add middleware to with configuration:origin,credientials:true
-Whenever you making api call so pass axios=> {withCredientals:true}
-Install react-redux + @reduxjs/toolkit
=>configureStore => Provider => createSlice => add reducer to slice
-Add redux devtools in chrome
-Login and see if your data is coming properly in the store

- Navbar should update as soon as user logs in
  -Refactor our code to add constants file + create a components folder

Ep-17
-You should not be access other routes without login
-If token is not present ,redirect to login page
-Logout feature add
-Get the feed and add the feed in the store
-Build the user card on feed
-Edit profile feature
-Show Toast message on save of profile

Ep-18
-Create a page where see all connection

- Create a page See all my connection requests
  -Feature - Accept/Reject Connection Requests

Ep-19
-Send/ignore the user card from feed
-Signup new user
-e2e testing

# Deployemnt

-Frontend
-Backend

Deployemnt S3 Ep 1 & Ep 2
-Frontend -Backend notes are added in notebook

Adding a custom domain name Ep 3
-Purchasing domain name from godaddy 
-signup on cloudfare & add a new domain name
 -change the nameservers on godaddy and point it to cloudfare 
 -wait for sometime till your namservers are update ~ 15 minutes 
 -DNS record:A devtinder.in 43.204.96.49 
 -Enable SSL for website

Sending Emails via SES Ep4
Create a IAM user
Give Access to AmazonSESFullAccess
Amazon SES: Create an Identity
Verify your domain name
Verify an email address identity
Install AWS SDK v3
Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascripttv3/example_code/ses#code-examples
Setup SesClient
Access Credentials should be created in IAM under SecurityCredentials Tab
Add the credentials to the env file
Write code for SESClient
Write code for Sending email address
Make the email dynamic by passing more params to the run function

Episode 5
Env file create -Add secret crediantals
Install - require('dotenv').config() add in root of project -gitignore this file before pushing github

Episode 6
-Installing node-cron -Learning about cron expression syntax - crontab.guru
Schedule a job
date-fns -Find all the unique email id who have got connection request in previous day -Send Email -Explore queue mechanism to send bul emails -Amazon SES bulk emails -Make send email function dynamic
bee queue & bull npm packages

Episode 7
Signup up on Razorpay & complete kyc
Create an ui for premuim page
Create an api for create order in backend
added my key and secret in env file
Intialized Razorpay in utils
creating order on razorpay
create Schema and model
saved the order in payments collection
make the api dynamic
Setuo razorpay webhook in test mode

02:23:55