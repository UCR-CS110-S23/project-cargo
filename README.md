[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/w5ovOekq)
# Cargo

## Getting started

### Running admin panel
Inside front-end root dir, run
```sh
npm run build
```
move the built files to back-end public/ folder.
```sh
npm start
```

### Running instance on server
```sh
npm install
npm install pm2 -g
pm2 start bin/www --name cargo-admin -f
```
To restart the instance
```sh
pm2 delete cargo-admin
pm2 start bin/www --name cargo-admin -f
```

### Admin panel API/back-end port: 3000
### Database info
- MongoDB
- Host: 173.254.240.202
- Port: 27017
- Username: cargo
- Password: 
- Database name: cargo

## Live Demo
### Please don't abuse it.
* User pages: http://173.254.240.202:3001/
* Admin Panel: http://173.254.240.202:3000/


## Back-end API
/user
```
GET /user/get-user-list
POST /user/add-user
DEL /user/delete-user
POST /user/update-user
```
/car
```
GET /car/get-car-list
POST /car/add-car
DEL /car/delete-car
POST /car/update-car
```
/order
```
GET /order/get-order-list
POST /order/add-order
DEL delete-order
POST update-order
```
/comment
```
GET /comment/get-comment-list
POST /comment/add-comment
DEL /comment/delete-comment
POST /comment/update-comment
```
Example:
POST to http://xxx:3000/user/add-user with
```
{
    "username": "jack111",
    "realName": "Jack Daniels",
    "email": "jack@gmail.com",
    "password": "123456",
    "joinDate": "2023-05-28"
}
```
## Database schema
Car
```
uid : String //user ID
make : String //Toyota
model : String //Corolla
year: String, //2023
engineType: String // Gas / Electric /Hybrid
doorType: String // door2 / door4
seats: String // seat2/ seat4/ seat5
pricePerDay: Number // 20
location: String //zipCode, 91777
features:String //Automatic Transmission , Backup Camera
booked:Number //0 1
```
Comment
```
uid : String
cid : String // car ID
comment : String // actual comment
rating: Number // numerical values of 1-5 as rating
```
Order
```
uid : String
cid : String
orderDate: String // 05/20/2023
orderLength : Number // number of days for the order, numerical value
totalPrice: Number
active : Number // is the order active, 0=not active, 1=active
```
User
```
username : String // the username that users use to login
realName: String // AKA display name
password: String
email : String
joinDate: String // 05/20/2023
```
## Front-End
Inside the project-cargo-frontend folder run
```sh
npm i
``` 
then
```sh
npm start
```
to see a working version of the website on your localhost.
The directories are formatted as followed: 
* ../src/API/: contains file consisting of all API used to communicate with the backend 
* ../src/global/: contains the navbar that is used throughout the whole website
* ../src/Home/: contains the website's various pages
* ../src/App.js: contains all of the necessary routing for the website.
## Division of Labor
* Home - Aarav Patel
* Login - Jenhua Chang 
* List of cars - Austin Haugland
* User profile viewing/editing - Jenhua Chang
* User post new car - Austin Haugland
* Car detail (with submitting and viewing comments and booking)
 Booking submits the starting date, and the length of days - Aarav Patel
* Admin panel(user/order/car/comment)  - Carl Che
* Database - Carl Che

## Partial Presentation Video
Admin Panel & Database (Carl Che, aka ThePureCC)
https://v.sinogamer.com/CS110FinalProjectCarlChe.mp4
