import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Row,Col } from "react-bootstrap";
import "./Css/Home.css";
import heartdisease from "../Images/heartattack.png";

const medupdate = () => {
  return (
    <>
      <Container className="med-edu-box">
        <h3 className="text-center">Stay abreast of Health Information</h3>
        {/* <div className="d-flex"> */}
        <Row className="med-blog-cont">
          <Col>
          <div className="med-blog">
            <h4>
              <b>Cardiovascular Diseases</b>
            </h4>
            <p>
              The most reported symptoms of six cardiovascular diseases (CVDs):
              heart attack, heart failure, valve disease, stroke, heart rhythm
              disorders, and peripheral artery and vein disease (PAD and PVD).
              <br />
              <br/>
              <b>Depression</b> may influence a person’s ability to detect
              changes in symptoms. Effective methods of monitoring and measuring
              symptoms over time are critical to managing cardiovascular disease
              well and preventing or delaying its progression.
              <br />
              <br />
              Chest pain is the most common and recognisable symptom of a heart
              attack. Less familiar symptoms, however, include shortness of
              breath, fatigue, sweating, nausea and lightheadedness. 
            </p>
          </div>
          </Col>

          <Col>
          <div className="med-blog" id="med-blog-pic">
            <img src={heartdisease} alt="heart-disease-man"  />
          </div>
          </Col>
        </Row>
          
          
        
        {/* </div> */}
        <p className="text-center text-primary">Read more...</p>
      </Container>
    </>
  );
};

export default medupdate;
