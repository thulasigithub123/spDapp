
import React from 'react';

import NotConnectedUserCard from './NotConnectedUserCard';

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


const NotConnectedUser = () => {

  
  const data=[

{id:'1',name:'Adobe Photoshop',price:'0.01',image:photoshop,text:'Adobe Photoshop is a popular and powerful raster graphics editing software developed by Adobe Inc. It is widely used by photographers, graphic designers, digital artists, and various other professionals to edit and manipulate images.'},
{id:'2',name:'Adobe Illustrator',price:'0.04',image:illustrator,text:'Adobe Illustrator is a widely-used vector graphics editor by Adobe Inc. Ideal for designers and illustrators, it creates scalable artwork with mathematical equations, allowing graphics to be resized without losing quality. '},
{id:'3',name:'Adobe Lightroom',price:'0.01',image:lightroom,text:'Adobe Lightroom is a popular image editing and management software developed by Adobe Inc. It is primarily used by photographers and photography enthusiasts to organize, edit, and enhance their photos. '},
{id:'4',name:'Adobe Audition',price:'0.03',image:audition,text:'Adobe Audition: Professional audio editing software by Adobe. Used for recording, editing, and mixing audio. Ideal for audio engineers, musicians, podcasters, and content creators. Offers effects, noise reduction, and multitrack support.'},
{id:'5',name:'Adobe Muse',price:'0.01',image:muse,text:'Adobe Muse: A discontinued website design tool by Adobe. Allowed designers to create responsive websites without coding. Featured an intuitive drag-and-drop interface for easy layout and design.'},
{id:'6',name:'Adobe CreativeCloud',price:'1.5',image:creativecloud,text:'Adobe Creative Cloud: A subscription-based platform by Adobe. Offers access to a collection of creative software like Photoshop, Illustrator, Provides cloud storage and collaboration tools for seamless workflows.'},
{id:'7',name:'Adobe InDesign',price:'0.01',image:indesign,text:'Adobe InDesign: Professional desktop publishing software by Adobe. Used for creating layouts for print and digital media. Offers tools for typography, graphics, and seamless integration with other Adobe apps'},
{id:'8',name:'Adobe DreamWeaver',price:'0.01',image:dreamweaver,text:'Dreamweaver: Web development software. Allows users to  Web development, design, code, and manage websites visually or through coding. Supports HTML, CSS, JavaScript, and offers live preview and built-in templates.'},
{id:'9',name:'Adobe XD',price:'0.06',image:xd,text:'Adobe XD: User experience (UX) and user interface (UI) design software by Adobe. Used for creating interactive prototypes, wireframes, and designs for websites and mobile apps. collaboration with developers and stakeholders.'},
{id:'10',name:'Adobe Premiere',price:'0.01',image:premiere,text:'Adobe Premiere Pro: Professional video editing software by Adobe. Used for video production, editing, and post-production. Offers advanced tools, effects, and seamless integration with other Adobe Creative Cloud applications for multimedia projects.'},
{id:'11',name:'Adobe Animate',price:'0.11',image:animate,text:'Adobe Animate: a tool for Multimedia authoring software by Adobe. Used for creating interactive animations, games, and web content. Supports vector graphics and animation tools, and allows export to various formats like HTML5.'},
{id:'12',name:'Adobe Express',price:'2.5',image:express,text:'cloud-based media creation application that makes it easy for anyone to create impressive social media graphics, promotional videos, and single-page websites. One of its great features is that it can be accessed from any device with online access.'},
]

  return (


       <>
      <h2>Welcome to the Software Market!</h2>
      <p>Please connect to MetaMask to access more features.</p>

      <div className='user-card-container'>
      { data.map ( (softwares)=>(
        <NotConnectedUserCard key={softwares.id} data={softwares} /> 
      )) }

      </div> 
      <br />

      
      </>
  );
};

export default NotConnectedUser;
