@echo off
cls


echo 'cleaning hardhat node'...
start cmd /k "npx hardhat clean & exit" 
 
 

echo starting the local hardhat server / node...
start cmd /k "npx hardhat node"
 

start cmd /k "npx hardhat compile & ping 127.0.0.1 -n 3 > nul & exit"
 

start cmd /k "npx hardhat run --network localhost scripts\deploy.js  & ping 127.0.0.1 -n 3 > nul & exit" 
 

start cmd /k "code ."
 

start notepad "hardhat accounts.txt"
 

echo starting webapp environment
cd frontend
start cmd /k "npm start"

