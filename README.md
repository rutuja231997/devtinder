devTinder is mern stack application

# deployment on aws

1. signup on aws account
2. launch instance
3. chmod 400 <secret>.pem
4. connect to server via command as ssh -i "dev-Tinder-secret.pem" ubuntu@ec2-13-60-14-122.eu-north-1.compute.amazonaws.com
5. install node.js exactly matched project version
6. git clone the projects r
   epo as frontend and backend on server via github https clone.

7. Frontend:
   1. npm install -> dependencies install
   2. npm run build
   3. sudo apt update
   4. sudo apt install nginx
   5. sudo systemctl start nginx
   6. sudo systemctl enable nginx
   7. copy code from dist(build files) to /var/www/html/
   8. sudo scp -r dist/astrik(\*) /var/www/html/
   9. enable port:80 of your instance

8. Backend:
   1. allowed ec2 instance public IP on mongodb server
   2. npm install pm2 -g
   3. pm2 start npm --name "devTinder-backend" -- start
   4. pm2 logs
   5. pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
