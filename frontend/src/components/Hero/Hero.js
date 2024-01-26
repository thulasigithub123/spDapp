import React, {  useState } from 'react';
import { Modal,Container, Row, Button, Col, Image } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Hero.css';
import Web3 from 'web3';
import NotConnectedUser from './NotConnectedUser/NotConnectedUser';
import ConnectedUser from './ConnectedUser/ConnectedUser'; 
import HeroImage from "../../assets/Hero.png"
import HeroImage1 from "../../assets/hero1.jpg"
 
const Hero = () => {



  const [userAddress, setUserAddress] = useState(null); 


  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setUserAddress(accounts[0]);
             
        // Greet the user with a toast message
        toast.success(`Hello, ${accounts[0]}! You are connected to MetaMask.`, {
          autoClose: 3000, // 3 seconds
        });

        // Listen for changes in the connected accounts
        window.ethereum.on('accountsChanged', handleAccountsChanged);
      } catch (error) {
       
        console.error('Error connecting to MetaMask:', error);
        if (error.code === 4001) {
          // User denied the request
          toast.error('MetaMask connection denied by the user', {
            autoClose: 3000, // 3 seconds
          });
        }
      }
    } else {
      console.error('MetaMask not found. Please install it and try again.');

        alert( 'MetaMask not found. Please install it and try again')
    }

    
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected the wallet
      setUserAddress(null);
      
      // Show a toast notification for disconnection
      toast.info('Wallet disconnected. Connect to MetaMask to continue.', {
        autoClose: 3000, // 3 seconds
      });
    } else {
      // Update the user's address when it changes
      setUserAddress(accounts[0]);
    }
  };



  
const [showModal, setShowModal] = useState(false);
const handleCloseModal = () => setShowModal(false);
const handleShowModal = () => setShowModal(true);
const handleDisconnect = () => {
  handleCloseModal();
  disconnectMetaMask();
};

  const disconnectMetaMask = async () => {
    setUserAddress(null);
  
    // Show a toast notification for disconnection
    toast.info('Disconnected from MetaMask.', {
      autoClose: 3000, // 3 seconds
    });
  };

 

  return (
    <div className="hero">
      <section>
      <Container>
        <Row>
 
        
      <Col>
          <Image src={HeroImage} className='hero_image2' />
      </Col>
          
          <Col className="d-flex align-items-center">
          
          <div className="hero-content">
              <h1>SOFTWARE PASS</h1>
              <h4>A Decentralized Market Place to own Software Rights</h4>
              <p>Our platform is a revolutionary decentralized marketplace that empowers 
                you to own software rights like never before. Say goodbye to traditional licensing models and embrace a new era of software ownership.</p>
              {userAddress ? (
    <div>
      <p>Your MetaMask Address: {userAddress}</p>
      <Button variant="warning" onClick={handleShowModal}>
        Disconnect
      </Button>
    </div>
  ) : (
    <Button variant="primary" onClick={connectToMetaMask}>
      Connect to MetaMask
    </Button>
  )}
  
  <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Disconnect</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to disconnect from MetaMask?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        No
      </Button>
      <Button variant="danger" onClick={handleDisconnect}>
        Yes
      </Button>
    </Modal.Footer>
  </Modal>
            </div>
  
      </Col>

       


      <Col>

        <div className='image-container'>
        <Image src={HeroImage1} className='hero_image1' />
        </div>
 

        </Col>
        </Row>
      </Container>
      </section>
 
        <section id="section1">
        <Container>
        <Row> 
        <div className="products"> 
 
        {userAddress ? ( 
   
        <ConnectedUser userAddress={userAddress} /> 



        ) : ( 
        <NotConnectedUser /> 
        )} 
        </div> 


        </Row> 
        </Container>  
          </section> 
 
{/* 

      <NotConnectedUser />
      <ConnectedUser userAddress = {userAddress}  />
       */}
 

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Hero;
