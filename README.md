# Q5 - Insurance Premium Calulation

### Developed as a micro-service architecture. Premium calulations are handled in premium-servies and Payment processing are handled in payment-services both can communicate each other when required. Added CORS support to allow only request from registered origins.

## Prerequisites
1. NodeJS ~v12.9.0
2. MongoDB v4.4.2

## Installation

1. Download or clone the source code from git repo https://github.com/kgtechcrew/Q5.git
2. Create a database 'insurance' and create collections 'premiums' & 'payments'
3. Run command 'npm install' to install all dependencies in package.json under each **-services/
4. Do the necessary configurations inside the file 'config.json' like port, dbConfig, loggerConfig etc
5. Run 'npm test' to test the payment-services
6. Run 'npm start' to start server under each **-services/
7. Access http://localhost:8001
