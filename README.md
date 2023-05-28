# Cargo

## Getting started

### Running admin panel
Inside front-end root dir, run
```sh
npm run build
```
move the built files to back-end public/ folder.
```sh
npm run install
```

### Running instance on server
```sh
npm run install
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
POST to http://xxx:3000/add-user with
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
