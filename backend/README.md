# DevTinder API's

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/connections
- GET /user/requests
- GET /users/feed - gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected

# Razorpay Payment Gateway Integration

- sign up on razorpay & complete kyc
- created a UI for premium page
- creating an API for create order in backend
- added my key and secret in .env file
- Intitialized razorpay in utils
- creating order and model
- create schema ad model
- saved the order in payments collection
- make the API dynamic
