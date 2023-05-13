# flightTicket

//Unable to found free Flight API, Every Flight API was paid version.
//So, make mock API and do my best
### To run this backend server use Postman or thunder Client


### To run backend set mongo atlas url in .env file 
### first install the all dependencies by write in terminal: npm install (hit Enter)
## then after intall all module in terminal type: npm run server (hit Enter)

# then do sign-up, login or logout

### Sign-up -> http://localhost:4300/signup
### login -> http://localhost:4300/login
### after login token store in cookie so it will handle by server
### log-Out -> http://localhost:4300/logout

## Get Source/Destination
#### for get the name/details of source and destination - http://localhost:4300/places

## Get Price
#### for get price - http://localhost:4300/price?source=Illinois&destination=Pennsylvania
#### Pass source and destination in query [get source and destination data from mock API data]

### Booking flight and passenger details are protected route so, log-in first then it will work

## for flight booking
#### for book flight - http://localhost:4300/book-flight
#### Put in req.body - source, destination, date, flight:[indigo,airAsia,vistara](choose any one), fare: from above api

## Get All Booking
#### See All Booking - http://localhost:4300/booking-details

### Now you may log-Out by hit on log-Out route otherwise it will automaticall log-Out with in 24-hours