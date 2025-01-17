# managing apis using routers
# authRouter
- POST/signup
- POST/login
- POST/logout
# profileRouter
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/edit/password (forget password api)
# Connection Request Router(intraction and connection between two users)
- POST /request/send/:status/:touserID (connection request for both intrested and ignored)
- POST /request/review/:status/:requestID(connection request for both accepting and ignoring others )
# userrouter
- GET /user/connections  //small bug present
- GET /user/requests 
- GET /user/feed
