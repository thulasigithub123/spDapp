

import { useState,useEffect } from 'react'; 
import ContractConnection from '../../../ContractConnection'; 
import { Table } from 'react-bootstrap';
import ConnectedUserCard from './ConnectedUserCard'; 
const ContractInstance = ContractConnection.ContractInstance


const ConnectedUser =({userAddress} )=> {
      const [manager, setManager] = useState(null)
      const [sample, setSample] = useState(null)
      const [totalsoftwarecount, setTotalsoftwarecount] = useState(null)
      const [getAllSoftwareNamesAndIds, setgetAllSoftwareNamesAndIds] = useState([]);
      const [DssoftwareDetails, setDssoftwareDetails ] = useState([]);

      

     
  const callManager = async () => {
    try {
      const data = await ContractInstance.methods.manager().call();
      
      setManager(data);
     
    } catch (error) {
      // Handle error if necessary
      console.error("Error fetching manager:", error)
      
    }
  };

  const callSample = async () =>{
    
    try {
      const data = await ContractInstance.methods.sample().call();
       setSample(parseInt(data));
    } catch (error) {
          console.error("error fetching CallSample :",error)
    }

  }

  const getTotalSoftwareCount = async() =>{

      try{
        const data = await ContractInstance.methods.getTotalSoftwareItems().call()
       
       setTotalsoftwarecount(parseInt(data))
      }catch(error){
        console.error("error fetching getTotalSoftwareCount method : ",error)
      }


  };

  const callgetAllSoftwareNamesAndIds =async ()=>{
    try{
      
    const data = await ContractInstance.methods.getAllSoftwareNamesAndIds().call();
    const names = data['0'];
    const ids = data['1'];
     const softwareData = [];
    for (let i = 0; i < names.length; i++) {
      softwareData.push({ name: names[i], id: ids[i].toString() }) 
    }
    setgetAllSoftwareNamesAndIds(softwareData);
    }catch(error){
      console.error("error fetching getTotalSoftwareCount method : ",error)
    }

    
  }

  const callDssoftwareDetails = async()=>{
    
    const data = await ContractInstance.methods.getAllSoftwareItems().call();
    const allsoftwaredata=[];
    for(let i=0; i<data.length; i++){
      const item = data[i]
      allsoftwaredata.push({
        name: item[0],
        id: parseInt(item[1]),
        owner: item[2],
        price: parseInt(item[3]),
        status: parseInt(item[4]) === 0 ? "Submitted" : "Settled",
        addedTimestamp: parseInt(item[5]),
        purchasedTimestamp: parseInt(item[6])
      })
      
    } 
    setDssoftwareDetails(allsoftwaredata)
      
  }
 

  const handlePurchase = async (softwareName, softwarePrice) => {
    try {

      if(userAddress===manager){
        alert("manager not allowed")
        return 0;
      }
      // Call the Solidity function to purchase the software item using the user's MetaMask account
      
                await ContractInstance.methods.buySoftware(softwareName).send({
                  value: softwarePrice,
                  from:userAddress
                });
      
      // Handle the purchase success
      callDssoftwareDetails();

    } catch (error) {
            // Handle the purchase error

       console.error('Error purchasing software:', error);
      alert(error);
 
    }
  };




  const resetMethod = () =>{
        setManager(null);
        setSample(null);
        setTotalsoftwarecount(null)
        setgetAllSoftwareNamesAndIds(null);
        setDssoftwareDetails(null)
      }
      
      

      useEffect(() => {
         
         if(userAddress) { 

                      
              const fetchMethod = () =>{
               
                callManager();
                callSample();
                getTotalSoftwareCount();
                callgetAllSoftwareNamesAndIds();
                callSample();
                callDssoftwareDetails();
              }
              fetchMethod();
               
        } else {
          
          resetMethod();
        }
      }, [userAddress]); // Add userAddress to the dependency array
    

  return(
    <>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'40px' }}>
           <h2>SOFTWARE MARKET PLACE</h2>
      </div>
          
          {/* <p>Manager Address: {manager}</p> */}
          {/* <p>Sample from contract: {sample}</p> */}

          <Table striped bordered style={{ width: '50%', maxWidth: '600px' }}>
          <tbody>
            <tr>
              <td><b>Connected User Address</b></td>
              <td> <i>{userAddress}</i> </td>
            </tr>
            <tr>
              <td><b>Total Softwares</b></td>
              <td style={{background:'pink',fontSize:22,fontWeight:'bolder'}}><b><i>{totalsoftwarecount}</i></b></td>
            </tr>
          </tbody>
        </Table>

        {/* <div>
          <h2>Software Data ( just name and ids):</h2>
                  {
                    !getAllSoftwareNamesAndIds ? ( <p>loading</p>

                    ) : (
                      <ul>
            { getAllSoftwareNamesAndIds.map((software, index) => (
              <li key={index}>
                {software.name} - {software.id} 
              </li>
            )) }
          </ul>
                    )
                  }
        </div> */}




         
  <h2>All Software Items</h2>

                   
                   

            { 
            !DssoftwareDetails ? (
            <p>loading</p>
            ) 

            : ( 
             
                     
      <div className='user-card-container'>
      { DssoftwareDetails.map ( (softwares)=>(
        <ConnectedUserCard key={softwares.id} data={softwares} onPurchase={handlePurchase}/> 
      )) }

      </div> 
             )

            } 

      </>


  )
        
    
     
}

export default ConnectedUser;
