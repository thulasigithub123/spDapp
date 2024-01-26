import React, { useState } from 'react'
import { FaEthereum } from 'react-icons/fa' 
import { FiCopy } from 'react-icons/fi';
import ContractConnection from '../../../ContractConnection'; 
import { Button, Card, Table } from 'react-bootstrap';

import './ConnectedUserCard.css'
 
import photoshop from'../../../assets/photoshop.jpg'
import illustrator from'../../../assets/illustrator.jpg'
import lightroom from'../../../assets/lightroom.jpg'
import audition from '../../../assets/audition.jpg'
import muse from '../../../assets/muse.jpg'
import creativecloud from '../../../assets/creativecloud.jpg'
import indesign from '../../../assets/indesign.jpg'
import dreamweaver from '../../../assets/dreamweaver.jpg'
import xd from '../../../assets/xd.jpg'
import premiere from '../../../assets/premiere.jpg'
import animate from '../../../assets/animate.jpg'
import express from '../../../assets/express.jpg'

const web3 = ContractConnection.web3; 

const ConnectedUserCard = ( {data,onPurchase}) => { 


  const [showCopiedOverlay, setShowCopiedOverlay] = useState(false)
      const nameImageMapping = {
        'Adobe Photoshop':photoshop,
        'Adobe Illustrator':illustrator,
        'Adobe Lightroom':lightroom,
        'Adobe Audition':audition,
        'Adobe Muse':muse,
        'Adobe CreativeCloud':creativecloud,
        'Adobe Indesign':indesign,
        'Adobe Dreamweaver':dreamweaver,
        'Adobe XD':xd,
        'Adobe Premiere':premiere,
        'Adobe Animate':animate,
        'Adobe Express':express,
    
  }

  const getRandomImageURL = (name) => {
    if(nameImageMapping[name])
    {
      return nameImageMapping[name]
    }
    else
    { 
   
    return `https://source.unsplash.com/featured/?${encodeURIComponent(name)}`
    
    }
  };


  const converttimestamp = (timestamp)=>{
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const dateString = date.toDateString(); // Get the date portion
    const timeString = date.toTimeString().split(' ')[0]; // Get the time portion and remove the timezone part
  
    return `${dateString} ${timeString}`;
  }

  const renderpurchasedate=(purchasedTimestamp)=>{
        if(purchasedTimestamp === 0){
          return 'Not purchased';
        } else {
          return converttimestamp(purchasedTimestamp)
        }
  }

  const handleCopyClick = (owner) => {
    navigator.clipboard.writeText(owner).then(() => {
      
      setShowCopiedOverlay(true);
      setTimeout(() => setShowCopiedOverlay(false), 2000); // Hide the overlay after 2 seconds
  
    }).catch((error) => {
      alert('failed to copy');
    });
  };

  const handlePurchase = () => {
    // Call the purchase function passed as a prop
    onPurchase(data.name, data.price);
  };



  return (
    
<div className='.not-connected-user-card'>  
<br></br>
<Card style={{ width: '20rem', overflowY: 'auto'}}> 
 
          <Card.Img variant="top" src={getRandomImageURL(data.name)} className='not-connected-user-card-img' />
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">  <span className='ethereum-logo' ><FaEthereum /></span>  {web3.utils.fromWei(data.price.toString(), "ether")} ETH</Card.Subtitle>

            <Table striped bordered responsive>
                <thead> 
                    <tr>
                      <th style={{ width: '50px' }}>ID</th>
                      <th>{data.id}</th>
                    </tr>
                    <tr>
                      <th>OWNER</th>
                      <th>
                        {data.owner.substring(0,8)} ...
                         
                         
                <Button style={{float:'right',fontSize:'10px'}} variant="primary" onClick={() => handleCopyClick(data.owner)}>
                <FiCopy size={18} />
                </Button>
                {showCopiedOverlay && <div className="overlay active">Copied</div>}
              
                         </th>
                    </tr>
                    <tr>  
                      <th>ADDED</th>
                      <th style={ { fontSize:'12px'}} >{converttimestamp(data.addedTimestamp)}</th>
                    </tr>
                    <tr>
                      <th>PURCHASED</th>
                      <th style={ { fontSize:'12px'}}> { renderpurchasedate(data.purchasedTimestamp)} </th>
                    </tr>
                    <tr>
                      <th>STATUS</th>
                      { 
                      data.status ==='Settled' ? ( <th className='bg-success text-white '>{data.status}</th> ) : ( <th className='text-primary'>{data.status}</th>)
                      }
                    </tr>
                  </thead>
 
            </Table>  
         
         
            <Card.Text>
            Adobe Photoshop is a popular and powerful raster graphics editing software developed by Adobe Inc. It is widely used by photographers, graphic designers, digital artists, and various other professionals to edit and manipulate images.
            </Card.Text>
                <div style={{ display:'flex'}}>
                    <Button variant="warning" style={{ marginRight: '10px' }}>Explore</Button>
                    <Button variant="outline-success" 
                    disabled={data.status === 'Settled'} 
                    onClick={handlePurchase} >Purchase</Button> 
                </div>
          </Card.Body>
        </Card>    
        <br /> 
    </div>
  )
}

export default ConnectedUserCard;

    