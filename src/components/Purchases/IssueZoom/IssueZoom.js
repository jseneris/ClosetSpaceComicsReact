import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from "react-slick";

class IssueZoom extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedBox: this.props.Issue.boxId,
      selectedLocation: this.props.Issue.locationId,
      showButtons: false,
      issues: this.props.Issues
    }

    this.changeZoom = this.changeZoom.bind(this);
    this.exitZoom = this.exitZoom.bind(this);
    this.handleBoxChange = this.handleBoxChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.resetLocation = this.resetLocation.bind(this);
    this.saveBook = this.saveBook.bind(this);
  }

  componentWillReceiveProps (newProps) {
    if( newProps.Issue !== this.props.Issue ){
      this.setState({selectedBox: newProps.Issue.boxId, selectedLocation: newProps.Issue.locationId, showButtons: false, issues: newProps.Issues});
    }
  }

  changeZoom(event){
    var tartgetIndex = event.target.getAttribute('data-index');
    this.props.HandleZoomChange(this.state.issues[tartgetIndex]);
  }

  exitZoom(){
    this.props.HandleZoomExit();
  }

  handleBoxChange(event){
    var showButton = this.props.Issue.boxId != event.target.value;
    this.setState({selectedBox: event.target.value, showButtons: showButton});
  }

  handleLocationChange(event){
    var showButton = this.props.Issue.LocationId != event.target.value;
    this.setState({selectedLocation: event.target.value, showButtons: showButton});
  }

  saveBook(){
    this.props.HandleBookChange(this.props.Issue, this.state.selectedBox);
  }

  resetLocation(){
    this.setState({selectedBox: this.props.Issue.boxId, showButtons: false});
  }

  renderBoxOptions() {
    var targetLocation = this.props.Locations.find(loc => loc.id === parseInt(this.state.selectedLocation));
    return targetLocation.boxes.map(box => {
      return (<option key={box.id} value={box.id}>{box.name}</option>)
    });
  }

  renderLocationOptions() {
    return this.props.Locations.map(locations => {
      return (<option key={locations.id} value={locations.id}>{locations.name}</option>)
    });
  }

  renderButtons(){
    if (this.state.showButtons){
      return(
        <div className="divButtons">
          <button onClick={this.resetLocation}>Cancel</button>
          <button onClick={this.saveBook}>Save</button>
        </div>
      );
    }
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
            <p>Location:
              <select id="locationSelect" value={this.state.selectedLocation} onChange={this.handleLocationChange}>
                { this.renderLocationOptions()}
              </select>
            </p>
            <p>Box:
              <select id="boxSelect" value={this.state.selectedBox} onChange={this.handleBoxChange}>
                { this.renderBoxOptions()}
              </select>
            </p>
            {this.renderButtons()}
          </Col>
        </Row>
        <Slider {...settings}>
          {this.state.issues.map((issue, index) => {
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
