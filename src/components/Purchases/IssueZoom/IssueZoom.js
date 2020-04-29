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
    this.props.HandleZoomChange(this.props.Issues[tartgetIndex]);
  }

  exitZoom(){
    this.props.HandleZoomExit();
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
          <Col md="10" className="zoomHeader">{`${this.props.Issue.title} #${this.props.Issue.issueNum}`}</Col>
          <Col md="2" className="clickable" onClick={this.exitZoom}>X</Col>
        </Row>
        <Row>
          <Col sm={7}>
            <img className="img-responsive" src={this.props.Issue.imageUrl} height={400} alt={this.props.Issue.title}/>
          </Col>
          <Col sm={5}>
            <p>Condition: {this.props.Issue.condition}</p>
            <p>Location: {this.props.Issue.locationName}</p>
            <p>Box: {this.props.Issue.boxName}</p>
          </Col>
        </Row>
        <Slider {...settings}>
          {this.props.Issues.map((issue, index) => {
            return (
              <div>
                <img src={issue.imageUrl} data-index={index} height={80} onClick={this.changeZoom}  alt={this.props.Issue.title}/>
              </div>
            )
          })}
        </Slider>
      </Container>
    );
  }
}


export default IssueZoom;
