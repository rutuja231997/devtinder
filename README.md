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
   5. pm2 list, pm2 flush <name>, pm2 stop <name>, pm2

9. Domain name mapping
   1. purchased domain name from go-daddy
   2. signup on cloudflare & add a new domain name
   3. change the nameservers on go-daddy & point it to cloudflare
   4. wait for the sometime till your cloudflare is updated

10. terms you should know
    1. what's domain registera? => purchase domain from go-daddy or some other platform?
    2. what's DNS?
    3. what's name servers?
    4. whole cloudflare manage dns records. what does mean it?

11. # sending emails via SES
    1. create a IAM user
    2. give access to AmazonSESFullAccess
    3. Amazon SES: create an Identity
    4. Verify your domain name
    5. Verify an email address
    6. Install AWS SDK -v3
    7. code example: https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
    8. setup SESClient
    9. access credentails should be created in IAM under SecurityCredentails Tab
    10. Add the credentails to the env file
    11. write code for SESClient
    12. write code for Sending email address
    13. Make the email dynamic by passing more params to the run function

12. # scheduling cron jobs in node.js
    1. installing node-cron
    2. learning about cron expression syntax - crontab.guru
    3. schedule a job
    4. date-fns
    5. find all the unique email Id who have got connection Request in previous day
    6. send email
    7. explore queue mechanism to send bulk emails
    8. Amazon SES Bulk Emails
    9. Make sendEmail function dynamic
    10. bee-queue & bull npm packages
