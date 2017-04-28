import React from 'react';
import axios from 'axios';
import { hashHistory } from 'react-router'
import { Carousel } from 'react-bootstrap';

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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Dosis" / >
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="css/animate.css" />
        <link rel="stylesheet" href="css/splash.css" />

        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="logo fadeIn"><img src="images/readcastly.png" alt="Readcastly" className="img-responsive"/></div>
                <h2 className="white fadeIn"><em>Your reading backlog solved</em></h2>
              </div>
            </div>
            <form className="fadeInUp" onSubmit={this.handleLogin}>
              <fieldset>
                <div className="row">
                  <div className="form-group">
                    <label className="sr-only" htmlFor="email">Email</label>
                    <div className="col-sm-5">
                      <input id="email" name="email" type="email" placeholder="Email" className="form-control input-lg" value={this.state.email} onChange={this.handleEmailChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="sr-only" htmlFor="password">Password</label>
                    <div className="col-sm-5">
                      <input id="password" name="password" type="password" placeholder="Password" className="form-control input-lg" value={this.state.password} onChange={this.handlePasswordChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="sr-only" htmlFor="login">Login</label>
                    <div className="col-sm-2">
                      <button id="login" name="login" type="submit" className="btn btn-primary btn-lg btn-block fadeInUp">Login</button>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
            <div className="clearfix" style={{ height: 30 }}></div>
            <div className="row">
              <div className="col-sm-3 col-sm-offset-3 col-xs-6 fadeInUp">
                <button className="btn btn-secondary btn-block btn-lg" onClick={this.handleSignup}>Signup</button>
              </div>
              <div className="col-sm-3 col-xs-6 fadeInUp">
                <button className="btn btn-tertiary btn-block btn-lg" onClick={this.handleGuestMode}>Explore</button>
              </div>
            </div>
          </div>
        </header>
        <section id="app-demo">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 fadeIn">
                <h1>Start your ReadCasts</h1>
                <h2 className="white">Give your eyes a break and your ears a treat</h2>
              </div>
            </div>
            <div className="row">
              <div className="fadeInUp">
                <Carousel data-ride="carousel" interval={2000}>
                  <Carousel.Item className='logo-carousel'> <img width={900} height={500} alt="Stories" className='logo-carousel img-responsive center-block' src="/images/ReadCastly-Top-Stories.png"/> </Carousel.Item>
                  <Carousel.Item className='logo-carousel'> <img width={900} height={900} alt="Voices" className='logo-carousel img-responsive center-block' src="/images/ReadCastly-your-readcasts-voices.png"/> </Carousel.Item>
                  <Carousel.Item className='logo-carousel'> <img width={900} height={500} alt="New" className='logo-carousel img-responsive center-block' src="/images/Readcastly-new-modal.png"/> </Carousel.Item>
                  <Carousel.Item className='logo-carousel'> <img width={900} height={500} alt="Sign Up" className='logo-carousel img-responsive center-block' src="/images/ReadCastly-signup.png"/> </Carousel.Item>
                  <Carousel.Item className='logo-carousel'> <img width={900} height={500} alt="Mobile" className='logo-carousel img-responsive center-block iphone' src="/images/ReadCastly-mobile.png"/> </Carousel.Item>
                </Carousel>
              </div>
            </div>
          </div>
        </section>
        <section id="main-info">
          <div className="container">
            <div className="row">
              <div className="col-sm-4 fadeIn">
                <hr className="purple-bg"/>
                <h2 className="purple">Generate ReadCasts</h2>
                <p>Drop a URL in the text box or click on 'Add to Library' in the Top stories mode and ReadCast.ly will read the article to you with its player at the bottom of the screen. Choose from 16 different voices, with global accents. ReadCast.ly can also give you a link to the ReadCast - or send it to you via email or text. Have lots of ReadCasts in your queue? Use the search box to filter your results.</p>
              </div>
              <div className="col-sm-4 fadeIn">
                <hr className="blue-bg"/>
                <h2>Find more articles</h2>
                <p>Have you used ReadCast.ly so much that you no longer have a backlog of articles? Just click the Top stories button and choose from hundreds of stories in our list of 70 news sources from a wide variety of genres including technology, news, business, pop culture, sports, the arts and international. Add as many of them to your library as you like, and they will be available to you as readCasts.</p>
              </div>
              <div className="col-sm-4 fadeIn">
                <hr className="yellow-bg"/>
                <h2>Stream, Text, Email</h2>
                <p>While you can browse stories in ReadCast.ly's guest mode and stream ReadCasts, to get the full experience please register. By providing your email and a password you can save ReadCasts in your library. If you choose to include a mobile number as well, you will have the option of texting yourself a link to any ReadCast.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="team">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="purple">Meet the Team</h1>
                <p className="white">ReadCast.ly was conceived, architected and built in 4 weeks as the thesis product of four full-stack software engineers at Hack Reactor in New York City. The app converts URLs to natural-language "ReadCasts" using the artificial intelligence services of Amazon's Polly (advanced deep-learning technologies to synthesize speech).</p>
                <p className="white">ReadCast.ly employs 4 APIs to pull data from 70 news sources globally, parse the text, convert to mp3 audio and then store and stream from Amazon S3. Registered users can also receive the audio via URL, email or text.</p>
                <p className="white">The team also wrote custom algorithms to further cleanse the text and ensure a quality listening experience, and they built a flexible SQL database that enables powerful relational look-ups between users and their preferences, articles and news sources and audio file distribution methods. </p>
              </div>
            </div>
            <div className="clearfix" style={{ height: 30 }}></div>
            <div className="row">
              <div className="col-md-12">
                <div className="fadeInUp">
                  <div className="fadeInUp"> <img className="img-responsive" src="images/team-big.jpg"/> </div>
                </div>
              </div>
              <div className="fadeInUp portfolio">
                <div className="col-sm-3 col-xs-6">
                  <h3 className="white">Michiya Hibino </h3>
                  <a href="https://github.com/mhibino"><i className="fa fa-github-square fa-3x"></i></a> </div>
                <div className="col-sm-3 col-xs-6">
                  <h3 className="white">Viswada Yangala </h3>
                  <a className="icon-space" href="https://github.com/yangalav"><i className="fa fa-github-square fa-3x"></i></a> <a href="https://www.linkedin.com/in/viswadayangala/"><i className="fa fa-linkedin-square fa-3x"></i></a> </div>
                <div className="col-sm-3 col-xs-6">
                  <h3 className="white">John Packel </h3>
                  <a className="icon-space" href="https://github.com/john-packel"><i className="fa fa-github-square fa-3x"></i></a> <a className="icon-space" href="www.linkedin.com/in/johnpackel"><i className="fa fa-linkedin-square fa-3x"></i></a> <a href="https://twitter.com/jpackel"><i className="fa fa-twitter-square fa-3x"></i></a> </div>
                <div className="col-sm-3 col-xs-6">
                  <h3 className="white">Andrew Fechner </h3>
                  <a className="icon-space" href="hhttps://github.com/arfnj"><i className="fa fa-github-square fa-3x"></i></a> <a href="https://www.linkedin.com/in/andrew-fechner/"><i className="fa fa-linkedin-square fa-3x"></i></a> </div>
              </div>
            </div>
          </div>
        </section>
        <section id="tech">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="fadeInUp">
                  <h1>ReadCast.ly Tech Stack</h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 col-xs-6">
                <img src="images/stack/react.png" alt="React" className="img-responsive" />
              </div>
              <div className="col-sm-3 col-xs-6">
                <img src="images/stack/node.png" alt="Node" className="img-responsive" />
              </div>
              <div className="col-sm-3 col-xs-6">
                <img src="images/stack/express.png" alt="Express" className="img-responsive" />
              </div>
              <div className="col-sm-3 col-xs-6">
                <img src="images/stack/mysql.png" alt="MySQL" className="img-responsive" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-2 col-xs-4">
                <img src="images/stack/aws.png" alt="Amazon Web Services" className="img-responsive" />
              </div>
              <div className="col-sm-2 col-xs-4">
                <img src="images/stack/polly.png" alt="Amazon Polly" className="img-responsive" />
              </div>
              <div className="col-sm-2 col-xs-4">
                <img src="images/stack/twilio.png" alt="Twilio" className="img-responsive" />
              </div>
              <div className="col-sm-2 col-xs-4">
                <img src="images/stack/bookshelf.png" alt="Bookshelf" className="img-responsive" />
              </div>
              <div className="col-sm-2 col-xs-4">
                <img src="images/stack/knex.png" alt="Knex" className="img-responsive" />
              </div>
              <div className="col-sm-2 col-xs-4">
                <img src="images/stack/postlight.png" alt="Postlight" className="img-responsive" />
              </div>
              <div className="col-sm-2 col-xs-3">
                <img src="images/stack/node-mailer.png" alt="Node Mailer" className="img-responsive" />
              </div>
              <div className="col-sm-2 col-xs-3">
                <img src="images/stack/passport.png" alt="Passport" className="img-responsive" />
              </div>
              <div className="col-sm-2 col-xs-3">
                <img src="images/stack/webpack.png" alt="Webpack" className="img-responsive" />
              </div>
              <div className="col-sm-2 col-xs-3">
                <img src="images/stack/bootstrap.png" alt="Bootstrap" className="img-responsive" />
              </div>
            </div>
          </div>
        </section>
        <footer>
          <h4>&copy; 2017, The Arctic Foxes</h4>
        </footer>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      </div>
    );
  }
}

export default Splash;
