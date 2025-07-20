import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Form, Col} from 'react-bootstrap'
import './Css/Home.css'

const Footer = () => {
  return (
    <>
        <Container className='footer'>
           
            <div className=' d-flex'>
                <ul className='footer-item animate__fadeInDown'>
                    <li>About Us</li>
                    <li>Blog</li>
                    <li>Career</li>
                    <li>News and Update</li>
                    <li>Testimonial</li>
                </ul>

                <ul className='footer-item animate__fadeInDown'>
                    <li>Contact</li>
                    <li>Help</li>
                    <li>Support</li>
                    <li>FAQ</li>
                    <li>Contact</li>
                </ul>

                <ul className='footer-item animate__fadeInDown'>
                    <li>Services</li>
                    <li>Enlightenment</li>
                    <li>Consultation</li>
                    <li>Counselling</li>
                    <li>Educating</li>
                </ul>

                <ul className='footer-item animate__fadeInDown'>
                    <li>Contact</li>
                    <li>Help</li>
                    <li>Support</li>
                    <li>FAQ</li>
                    <li>Contact</li>
                </ul>
                </div>

                 
        </Container>
        
        <div className='container copyright'>
                <p>All rights reserved. Copyright &copy;2023, designed by Janeworld </p>
            </div>
    </>
  )
}

export default Footer