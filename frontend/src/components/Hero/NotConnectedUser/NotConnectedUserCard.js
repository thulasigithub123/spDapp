import React from 'react'
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'; 
import { FaEthereum } from 'react-icons/fa' 
import './NotConnectedUserCard.css'





const NotConnectedUserCard = ( {data}) => {
  
    const tooltip = (
        <Tooltip id="tooltip">
          only for connected Users
        </Tooltip>
      );
    return (
        <div className='.not-connected-user-card'>
            <br></br>
        <Card style={{ width: '18rem'}}>
          <Card.Img variant="top" src={data.image} className='not-connected-user-card-img' />
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">  <span className='ethereum-logo' ><FaEthereum /></span>  {data.price} ETH</Card.Subtitle>

            <Card.Text>
            {data.text}
            </Card.Text>
            <div style={{ display:'flex'}}>
            <Link to={`/explore/${data.id}`}>
              <Button variant="primary" style={{ marginRight: '10px' }}>Explore</Button>
            </Link>
                <OverlayTrigger placement="top" overlay={tooltip}>
         <span>
            <Button variant="danger" disabled>Purchase</Button>
        </span>
        </OverlayTrigger>
            </div>
          </Card.Body>
        </Card>
        </div>
      );
    }
export default NotConnectedUserCard
