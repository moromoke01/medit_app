import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row,Col} from 'react-bootstrap'
import './Css/Home.css'
import EachDoc from './EachDoc'
import doc7 from './Pictures/doc7.jpg'
import doc2 from './Pictures/doc2.jpg'
import doc3 from './Pictures/doc3.jpg'
import doc6 from './Pictures/doc6.jpg'

const MeetDoc = () => {
  return (
    <>
       <Container className='meetDoc'>
       <h5 className='meetDoc-head text-center'>Meet Our Specialists</h5>
        <Row className='mx-auto'>
          <Col className='Doc-box' md='3' >
          <EachDoc 
        className='EachDoc-style '
          img={doc7}
          name='Dr Cecilia Adam'
          dept='Physiotherapist'
          contact='070376897872'
        
        />
         
          </Col>
          <Col className='Doc-box' md='3'>
          <EachDoc 
          className='EachDoc-style'
          img={doc2}
          name='Dr Samsom Ebele'
          dept='Dermatologist'
          contact='0807867523827'
        
        />
      
          </Col>
        <Col className='Doc-box' md='3'>
          <EachDoc 
          className='EachDoc-style'
          img={doc3}
          name='Dr Christain Anthony'
          dept='General Medicine'
          contact='070376897872'
        
        />
          </Col>

          <Col md='3'>
          <EachDoc 
          className='EachDoc-style'
          img={doc6}
          name='Dr Juliana Preston'
          dept='Physiologist'
          contact='070376897872'
        
        />
          </Col>
        </Row>
        

        </Container> 
    </>
  )
}

export default MeetDoc