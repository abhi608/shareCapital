Team name: marknovchain

Team Members:

Nikhil Vanjani, Abhishek Verma, Kshitij Jaggi, Tarun Yadav, Anmol Porwal, Shikhar Mahajan

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


Instructions for Running the website:

Requirements: 1. You need to have a linux OS with blockchain installed on it. You can install it easily from here: http://www.multichain.com
2. Install nodejs too.
3. Install mysql on your system.
Now, you have all the necessary things that you need to start your nodejs server
To run the server, do the following:
	1. Clone the repo.
	2. Install packages: `npm install`
	3. Edit the database configuration: `config/database.js`
	4. Create the database schema: `node scripts/create_database.js`
	5. Launch: `node server.js`
	6. Visit in your browser at: `http://localhost:8084`
Note: Currently, multichain doesn't offer any APIs other than bash APIs. So, currently, this website won't run on Windows PC. So, we can make it available to the general public like it is done in the case of Tor browser. However, once there are APIs available(in the long run), we can launch it as a website. Because of non avilability of API, currently, you need to have two computers with the above mentioned things installed and their own local servers running to test this product.

4.
	i) Creating a blockchain
		First we will create a new blockchain named chain333. On the first server, run these command:
		multichain-util create chain333
		Initialize the blockchain, including mining the genesis block:
		multichaind chain333 -daemon
		You should be told that the server has started and then after a few seconds, that the genesis block was found. You should also be given the node address that others can use to connect to this chain.
		Replace <192.168.0.114:9221> in scripts/getHash.sh by the above generated [ip-address]:[port]

		Run the following command on second server:
			multichaind chain333@[ip-address]:[port]
		You should be told that the blockchain was successfully initialized, but you do not have permission to connect. You should also be shown a message containing an address in this node’s wallet. Note this address

		Back on first server:
			multichain-cli chain555 grant <wallet-address> connect  

	ii) Creating a stream
			Let’s create a stream, which can be used for general data storage and retrieval. On the first server:
			create stream stream1 false
			subscribe stream1
			grant <wallet-address> receive,send
			grant <wallet-address> stream1.write

	iii) Issuing the assets
			On the first server:
			listaddresses
			getaddresses
			This would display a wallet address. Note this address. Let it be <wallet-address_tmp>
			Now on first server only,
			issue <wallet-address_tmp> USD 2000 0.01
			A 64-character hexadecimal transaction ID should be shown for the transaction in which the USD asset was created.
			Now let’s issue another asset to the second node’s address, after granting it the necessary permissions. Still on the first server:
			grant <wallet-address> receive, send
			issue <wallet-address> JPY 50000 1


	ii) On the second server, open your browser and go to localhost:8204. The website is up there.
		Now signup and then login.

	iii) Once you have logged in, there would be many navigation bars which are self-explanatory. 

	iv) In the new transaction tab, you can generate a receipt of the queries which are present there. You can create stream, but remember whenever entering any information about stream, stream name should be of the format stream<some number> (e.g.: stream22), otherwise the app would crash (We realize that we have not handled many error conditions, but given that we have our other projects/assignments, it is somewhat acceptable... or at least we think so). By default, stream of name stream1 is already created, so you can work on tht stream.

	v) No comes the trade part, here, you can initiate a trade by navigating to Initiate Trade bar. Currently, a user initiating a trade can only ask for USD in exchange of rupees (of course, imaginary :P). And the other user (from another computer), can accept tht trade using Accept Trade bar.

	vi) Once the trade is complete, you can check your wallet balance and wallet transactions. 


	A big question, why does the login feature exist if only one user can log in from a computer? Answer is once the APIs are available, and we deploy this website on www, different users can log in using thi feature.

Many of the things are/need to be hard-coded currently. This is beause we were short of time and of course, in the long run, the missing patches can be filled.








