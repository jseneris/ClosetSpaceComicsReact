import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from "react-slick";

class IssueZoom extends Component {
  constructor(props){
    super(props);

    this.changeZoom = this.changeZoom.bind(this);
    this.exitZoom = this.exitZoom.bind(this);
  }

  changeZoom(event){
    var tartgetIndex = event.target.getAttribute('data-index');
    this.props.handleZoomChange(this.props.issues[tartgetIndex]);
  }

  exitZoom(){
    this.props.handleZoomExit();
  }

  render(){
    var settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 12,
      slidesToScroll: 12
    };
    return(
      <Container>
        <Row>
          <Col md="11" className="zoomHeader">{this.props.issue.title}</Col>
          <Col md="1" className="clickable" onClick={this.exitZoom}>X</Col>
        </Row>
        <Row className="zoomBody">
          <Col sm={7}>
            <img className="img-responsive" src={this.props.issue.imageUrl} height={400} alt={this.props.issue.title}/>
          </Col>
          <Col sm={5}>
            <span>{this.props.issue.description}</span>
            <p>Cover Price: {this.props.issue.coverprice}</p>
          </Col>
        </Row>
        <Slider {...settings}>
          {this.props.issues.map((issue, index) => {
            return (
              <div>
                <img src={issue.imageUrl} data-index={index} height={80} onClick={this.changeZoom}  alt={this.props.issue.title}/>
              </div>
            )
          })}
        </Slider>
      </Container>
    );
  }
}


export default IssueZoom;
