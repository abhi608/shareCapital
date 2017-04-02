Team name: marknovchain

Team Members:

Nikhil Vanjani, Abhishek Verma, Kshitij Jaggi, Tarun Yadav, Anmol Porwal, Shikhar Mahajan

Instructions:

1. Clone the repo.
2. Install packages: `npm install`
3. Edit the database configuration: `config/database.js`
4. Create the database schema: `node scripts/create_database.js`
5. Launch: `node server.js`
6. Visit in your browser at: `http://localhost:8084`

Idea: 

The Future of Health

Introduction:

As a significant number of hospitals around the world are transitioning to digital records, some fundamental problems like data access, data privacy and data integrity needs to be taken care of. While there are standard solutions for data privacy and integrity, they come with compromise on accessibililty. Blockchains provide an ideal solution for this through decentralised databases where anyone can access data from anywhere, provided he has access rights to it. This is also essential for medical record keeping and does away with the hassle of carrying medical records everywhere. 

Due to encrytion, blockchains also pave the way for 3rd parties to access the data without revealing the identity of people and it can be a great help for medical research. 

We have tried to implement both of these features in our web-app. Our application is based on MultiChain platform which provides the faciltiy for uploading data records as well as asset transactions.

Technologies used:

Backend -  Node.js
Frontend - ejs, bootstrap 
Database - MultiChain, MySQL

Functionalities implemeted : 

1. Signup, Login
2. View Records, Create new Records
3. Create Streams
4. Initialize Trade, Accept Trade
5. Wallet balance, Wallet Transactions

Description:

Medical record keeping would just involve keeping the data in a database, but when it comes to blockchains, some other factors come in play. Miners. They are the people who actually perform proof of work in order to add a block to the chain and they work only for monetary gains. So this would require the people to pay a fee to get their data uploaded. And then there are organisations and research groups would be willing to pay to get access to data. If we can balance both the fees charged by miners and paid by organisations in a way that effective monetary flows involve majority of payments by organisations than the common people, then it would be economical. We haven't tackled the issue of this balance yet because it depends on supply-demand which comes into picture once people start using it. But we have built means for both kind of transactions.

Each user has a wallet and they can add money to it. As of now, the money is issued by a server which would translate to 3rd parties performing currency exchange in realistic scenario. MultiChain provides with manual control over attributes like transaction fee charged by miners, which is set by default to zero as of now.

For trade between records and money, we use MultiChain's Atomic Exchange Transactions which ensure simultaneous exchange of records for money. This proceeds as follows - Suppose an organisation X wants to access a person Y's data. Then, X initializes a partial transaction in which he locks P amount of cryptocurrency. Because it is locked, this transaction output will be protected against spending unless explicitly spent or unlocked. Now we will use it to start the exchange transaction asking for Q (minimum) amount of cryptocurrencies along with the data appended as metadata in exchange. This will output a large hexadecimal blob of text that contains the raw transaction data representing the offer of exchange. This blob needs to be communicated to Y securely. This can be done through an email. Alternatively, we have used MultiChain's Streams for the same. X creates a new stream to which anyone can subscribe and read the data. An outsider can add new records to the stream only if X provides him the permission. In our case, X provides that permission to only Y. 

Now, the actual requirement is that only Y should be able to read it and hence a secure communication. We propose to perform application-level sandboxing to meet the requirements. Now when Y gets a request from X, if he wants to accept the trade, he similarly creates a locked transaction with the requested data. This generates a json file whose contents are used to append to the partial transaction. This outputs an even longer hexadecimal blob of text which is used to complete the transaction by sending it to miners for confirmation. 

There is a third type of transactions which are generic and can be done between any 2 users which involve sending some money to a user or asking some user for money.   





