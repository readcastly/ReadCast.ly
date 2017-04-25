import React from 'react';
import axios from 'axios';
import { hashHistory } from 'react-router'
import { Button, Form, FormControl, FormGroup, ControlLabel, Col, Row, Carousel } from 'react-bootstrap';
import { Collapse } from 'react-collapse';
// import {Grid, Row, Col, FormGroup, FormControl, Button, Carousel} from 'react-bootstrap';

// const techLogos = ['../images/amazon-polly.jpg', '../images/Bookshelf.png', '../images/bootstrap-logo.png', '../images/express.png','../images/knex.png', '../images/MySQL-Logo.png', '../images/node-js.png', '../images/nodemailer.png', '../images/Passport.png', '../images/Postlight.png', '../images/react-logo.png', '../images/S3.png', '../images/Twilio_logo.png', '../images/webpack.png']


class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  email: '',
                  password: '',
                  isOpened: false,
    }

   this.handleEmailChange = this.handleEmailChange.bind(this);
   this.handlePasswordChange = this.handlePasswordChange.bind(this);
   this.handleLogin = this.handleLogin.bind(this);
   this.handleGuestMode = this.handleGuestMode.bind(this);
   this.handleSignup = this.handleSignup.bind(this);

  }

  handleLogin(e) {
    e.preventDefault();
    console.log("The email is: " + this.state.email);
    console.log("The password is: " + this.state.password);
    axios.post('/api/login', {
      email: this.state.email,
      password: this.state.password,
    })
    .then((res) => {
      console.log("post request hahahahahaha" + res);
      hashHistory.push('/app');
      return;
    });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  componentWillMount() {
    axios.get('/api/getUserInfo')
    .then((res) => {
      if (res.data !== "") {
        hashHistory.push('/app');
      }
    })
    .catch((err) => console.log('SPLASH REDIRECT ERROR: ', err));
  }

  handleSignup(e){
    e.preventDefault();
    console.log('handleddd signuppp');
    hashHistory.push('/signup');
    return;
  }

  handleGuestMode(e){
    e.preventDefault();
    console.log('handleddd guest mode');
    hashHistory.push('/app');
    return;
  }



  render() {
    return (
    <div>
     <link rel="stylesheet" href="css/font-awesome.min.css"/>
     <link rel="stylesheet" href="css/animate.css"/>
    //  <link href='http://fonts.googleapis.com/css?family=Raleway:400,100,200,300,500,600,700,800,900|Montserrat:400,700' rel='stylesheet' type='text/css'/>
    <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet"></link>
     <script src="js/modernizr-2.7.1.js"></script>
     <link rel="stylesheet" href="css/main.css"/>
      <header>
        <div className="container">
          <div className="row">

            <div className="col-xs-6">
              <a href="/"><img src="images/ReadcastlyJoeLogoFull.png" alt="Logo"/></a>
            </div>
          </div>

          <div className="row header-info">
            <div className="col-sm-10 col-sm-offset-1 text-center">

              <h1 className="wow fadeIn">Welcome to ReadCast.ly!</h1>
              <br />
              <p className="lead wow fadeIn" data-wow-delay="0.5s">Your reading backlog solved</p>
              <br />


              <div className="row">
                <div>
                  <div className="row">

                    <Form inline onSubmit={this.handleLogin}>
                      <FormGroup bsSize="small" controlId="formInlineName" className="wow fadeInUp">
                          <FormControl type="email" style={{ width: 180 }} value={this.state.email} onChange={this.handleEmailChange} placeholder="Email" />
                      </FormGroup>
                        {'         '}
                      <FormGroup bsSize="small" controlId="formInlineEmail" className="wow fadeInUp">
                        <FormControl type="password" style={{ width: 180 }} value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />
                      </FormGroup>
                        {'           '}
                      <Button type="submit" bsSize="small" className="btn btn-primary btn-lg scroll wow fadeInUp customLoginButtonSize">Login</Button>
                    </Form>

                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                  <div className="row">

                    <div className="col-xs-6 text-right wow fadeInUp" data-wow-delay="1s">
                      <Button className="btn btn-primary btn-lg scroll" style={{ width: 200 }} onClick={this.handleSignup}>Signup</Button>
                    </div>

                    <div className="col-xs-6 text-left wow fadeInUp" data-wow-delay="1.4s">
                      <Button className="btn btn-secondary btn-lg scroll" onClick={this.handleGuestMode}>Explore as guest</Button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </header>

      <div className="mouse-icon hidden-xs">
  				<div className="scroll"></div>
  		</div>


      <section id="be-the-first" className="pad-xl">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2 text-center margin-30 wow fadeIn" data-wow-delay="0.6s">
              <h1 className="purple-headline">Start your ReadCasts</h1><br></br>
              <h2 className="lead">Give your eyes a break and your ears a treat</h2>
            </div>
          </div>

          <div className="wow fadeInUp" data-wow-delay="1s">
              <Row>
                <Carousel data-ride="carousel" interval={2000}>

                <Carousel.Item className='logo-carousel'>
                  <img width={900} height={500} alt="900x500" className='logo-carousel img-responsive center-block' src="/images/ReadCastly-Top-Stories.png"/>
                </Carousel.Item>

                  <Carousel.Item className='logo-carousel'>
                    <img width={900} height={900} alt="900x500" className='logo-carousel img-responsive center-block' src="/images/ReadCastly-your-readcasts-voices.png"/>
                  </Carousel.Item>
                  <Carousel.Item className='logo-carousel'>
                    <img width={900} height={500} alt="900x500" className='logo-carousel img-responsive center-block' src="/images/Readcastly-new-modal.png"/>
                  </Carousel.Item>
                  <Carousel.Item className='logo-carousel'>
                    <img width={900} height={500} alt="900x500" className='logo-carousel img-responsive center-block' src="/images/ReadCastly-signup.png"/>
                  </Carousel.Item>
                  <Carousel.Item className='logo-carousel'>
                    <img width={900} height={500} alt="900x500" className='logo-carousel img-responsive center-block iphone' src="/images/ReadCastly-mobile.png"/>
                  </Carousel.Item>



                </Carousel>

              </Row>
          </div>

        </div>
      </section>

      <section id="main-info" className="pad-xl">
        <div className="container">
          <div className="row">
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <div className="col-sm-4 wow fadeIn" data-wow-delay="0.4s">

              <hr className="line purple"/>
              <h2>Generate ReadCasts</h2>
              <p>Drop a URL in the text box or click on 'Add to Library' in the Top stories mode and ReadCast.ly will read the article to you with its player at the bottom of the screen. Choose from 16 different voices, with global accents. ReadCast.ly can also give you a link to the ReadCast - or send it to you via email or text. Have lots of ReadCasts in your queue? Use the search box to filter your results.</p>
            </div>
            <div className="col-sm-4 wow fadeIn" data-wow-delay="0.8s">
              <hr  className="line blue"/>
              <h2>Find more articles</h2>
              <p>Have you used ReadCast.ly so much that you no longer have a backlog of articles? Just click the Top stories button and choose from hundreds of stories in our list of 70 news sources from a wide variety of genres including technology, news, business, pop culture, sports, the arts and international. Add as many of them to your library as you like, and they will be available to you as readCasts.</p>
            </div>
            <div className="col-sm-4 wow fadeIn" data-wow-delay="1.2s">
              <hr  className="line yellow"/>
              <h2>Stream, Text, Email</h2>
              <p>While you can browse stories in ReadCast.ly's guest mode and stream ReadCasts, to get the full experience please register. By providing your email and a password you can save ReadCasts in your library. If you choose to include a mobile number as well, you will have the option of texting yourself a link to any ReadCast.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pad-lg">
        <div className="container">
          <div className="row margin-40">
            <div className="col-sm-12 text-center">
              <h1 className="purple-headline">Meet the Team</h1><br></br><br></br><br></br>
              <p className="white team-text">ReadCast.ly was conceived, architected and built in 4 weeks as the thesis product of four full-stack software engineers at Hack Reactor in New York City. The app converts URLs to natural-language "ReadCasts" using the artificial intelligence services of Amazon's Polly (advanced deep-learning technologies to synthesize speech).</p><br></br>

              <p className="white team-text">ReadCast.ly employs 4 APIs to pull data from 70 news sources globally, parse the text, convert to mp3 audio and then store and stream from Amazon S3. Registered users can also receive the audio via URL, email or text.</p><br></br>

              <p className="white team-text">The team also wrote custom algorithms to further cleanse the text and ensure a quality listening experience, and they built a flexible SQL database that enables powerful relational look-ups between users and their preferences, articles and news sources and audio file distribution methods. </p>
            </div>
          </div>

          <div>

            <div className="wow fadeInUp" data-wow-delay="1s">

                <div className="wow fadeInUp teamImg" data-wow-delay="1s">
                  <img className="teamImg" src="images/team-big.JPG"/>
                </div>
            </div>
              <br></br><br></br>
            <div className="wow fadeInUp" className="teamImg" data-wow-delay="1s">
              <p className="white team-name"> </p>
              <p className="white"> </p>
              <p className="white"> </p>

              <div className="col-sm-3">
              <p className="white team-name">Michiya Hibino </p><a href="https://github.com/mhibino"><img height="50" src="./images/github-logo.png" ></img></a>
              <br></ br><br></ br>
              </div>
              <div className="col-sm-3">
              <p className="white team-name">Viswada Yangala </p><a  className="icon-space" href="https://github.com/yangalav"><img height="50" src="./images/github-logo.png" ></img></a>
              <a href="https://www.linkedin.com/in/viswadayangala/"><img height="50" src="./images/linkedin-logo.png" ></img></a>
              <br></ br><br></ br>
              </div>
              <div className="col-sm-3">
              <p className="white team-name">John Packel </p><a className="icon-space" href="https://github.com/john-packel"><img height="50" src="./images/github-logo.png" ></img></a>
              <a className="icon-space" href="www.linkedin.com/in/johnpackel"><img height="50" src="./images/linkedin-logo.png" ></img></a>
              <a href="https://twitter.com/jpackel"><img height="50" src="./images/twitter-logo.png" ></img></a>
              <br></ br><br></ br>
              </div>
              <div className="col-sm-3">
              <p className="white team-name">Andrew Fechner </p><a className="icon-space" href="hhttps://github.com/arfnj"><img height="50" src="./images/github-logo.png" ></img></a>
              <a href="https://www.linkedin.com/in/andrew-fechner/"><img height="50" src="./images/linkedin-logo.png" ></img></a>
              </div>

        </div>
</div>
</div>
      </section>

      <section id="tech" className="pad-lg">
        <div className="container">
          <div className="row margin-40">
            <div className="col-sm-8 col-sm-offset-2 text-center">
            </div>
          </div>

          <div >

            <div className="wow fadeInUp" data-wow-delay="1s">
              <br />
                <div className="wow fadeInUp teamImg" data-wow-delay="1s">
                  <h1 className="purple-headline"> ReadCast.ly tech stack</h1><br></br><br></br>
                  <img className="teamImg" src="images/ReadCastly tech stack - teal.svg"/>



                </div>

            </div>

          </div>

        </div>

      </section>
<section >
<h4 className="footer">copyright 2017, The Arctic Foxes</h4>
  </section>

    </div>

    );
  }
};

// <Grid/>
//   <Row>
//     <Col md={6} mdOffset={3}>
//       <h1>Welcome to Readcast.ly</h1>
//     </Col>
//   </Row>
//   <Row>
//     <div>
//     <Col md={6} mdOffset={3}>
//       <FormGroup id='username' onSubmit={this.goLogin.bind(this)}>
//         <FormControl name='username' type='text' placeholder="E-mail address" onChange={this.handleEmailChange} required />
//         <FormControl name='password' type='password' placeholder="Password" onChange={this.handlePasswordChange} required />
//         <Button type="submit" bsStyle="success" onClick={!this.state.islogging ? this.goLogin.bind(this) : null}>LOG IN</Button>
//       </FormGroup>
//     </Col>
//     </div>
//   </Row>
//   <Row>
//     <Col md={6} mdOffset={3}>
//       <Button type="submit" bsStyle="warning" onClick={this.goSignup.bind(this)}>SIGN UP</Button>
//     </Col>
//   </Row>
//   <Row>
//     <Col md={6} mdOffset={3}>
//       <Button type="submit" bsStyle="primary" onClick={this.goGuest.bind(this)}>Explore as a guest!</Button>
//     </Col>
//   </Row>
//   <Row>
//     <Carousel data-ride="carousel" interval={2000}>
//       {techLogos.map((logo,i) =>
//         <Carousel.Item className='logo-carousel' key={i} >
//           <img className='logo-carousel img-responsive center-block' width={517} height={115} alt="517x115" src={logo}/>
//         </Carousel.Item>
//       )}
//     </Carousel>
//   </Row>
// </Grid>

export default Splash;
