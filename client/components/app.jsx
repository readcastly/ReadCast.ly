// {'APP' component is a stateful, top-level component }

import React from 'react';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';

import Title from './Title.jsx';
import LogoutButton from './LogoutButton.jsx';
import LoginButton from './LoginButton.jsx';
import Subtitle from './Subtitle.jsx';
import WhichView from './WhichView.jsx';
// import HeaderNavigation from './Navbar.jsx';
import SignupButton from './SignupButton.jsx';
import SignUpForm from './SignupForm.jsx';
import TransFormEr from './TransFormer.jsx';
import SortableList from './ArticleList.jsx';
import ArticleEntry from './ArticleEntry.jsx';
import TopStories from './TopStories.jsx';
import Player from './Player.jsx';
import Confirm from './confirm.jsx';
import TopStoryAdd from './topStoryAdd.jsx';
import MembersOnly from './MembersOnly.jsx';
import GuestMode from './GuestMode.jsx';
import isValidUrl from '../helpers/urlValidation.js';
import { ErrorAlert } from './Alerts.jsx';
import Loading from 'react-loading';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const exportOptions = {
    voices : [
      {name: '--American English--'},
      {flag: 'us', name: 'Joanna'},
      {flag: 'us', name: 'Salli'},
      {flag: 'us', name: 'Kendra'},
      {flag: 'us', name: 'Kimberly'},
      {flag: 'us', name: 'Ivy'},
      {flag: 'us', name: 'Joey'},
      {flag: 'us', name: 'Justin'},
      {name: '--British English--'},
      {flag: 'uk', name: 'Amy'},
      {flag: 'uk', name: 'Emma'},
      {flag: 'uk', name: 'Brian'},
      {name: '--Australian English--'},
      {flag: 'au', name: 'Nicole'},
      {flag: 'uk', name: 'Russell'},
      {name: '--Indian English--'},
      {flag: 'in', name: 'Raveena'},
      {name: '--Welsh English--'},
      {flag: 'wa', name: 'Geraint'},
      {name: '--Japanese English--'},
      {flag: 'jp', name: 'Mizuki'}
    ],
    methods : [
      {id: "stream", method: 'Stream It'},
      {id: "link", method: 'Link It'}
    ]
  }

let randomId = 10**9;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isGuest: true,
			library: [],
			libraryBackup: [],
			headlines: [],
			gettingHeadlines: false,
			hasErrored: false,
			hasLibrary: true,
			isLoading: false,
			isConverting: false,
			failMessage: '',
			nowPlaying: {url: null, title: null},
      cycle: false, // this is so audio player does not keep replaying a track
			user:{
				id: null,
				stream: 'stream',
				link: 'link',
				email: '',
				phone: '',
				first_name: 'Guest',
				// voice_pref: 'Mama'
				// avatar:,
			},
			showConfirm: false,
			lastMethod: '',
			lastUrl: '',
			lastLink: '',
			topStoryAdd: false,
			topStoryAddMsg: {},
			topStoryMode: false,
			topStoriesSources: [],
			showMembersOnly: false,
			isFiltered: false
		};

	}

  getCurrentUser(){
    console.log('jerry sucks');
    return axios.get('/api/getUserInfo')
    .then((res) => {
      console.log('Here is the current user data! : ');
      console.log(res.data);
      if(res.data !== "") {
        this.setState({
        user: {
          id: res.data.id,
          stream: 'stream',
  				link: 'link',
  				email: res.data.email,
  				phone: res.data.phone,
  				first_name: res.data.first_name,
        	},
        	isGuest: false
       }, function() {
       			this.addDeliveryMethods();
      			this.getReadingList();
       		})
      }
    })
  }

  // showLogoutButton(){
  //   render() {
  //     return (
  //           <div>
  //               <input type="submit" value="Search" onClick={this.onClick} />
  //               { this.state.showResults ? <Results /> : null }
  //           </div>
  //       );
  // }

	addDeliveryMethods(){
		if ((this.state.user.email || this.state.isGuest) && exportOptions.methods.length<4) {
    		exportOptions.methods.push({id: "email", method: 'Email It'});
  	}
		if ((this.state.user.phone || this.state.isGuest) && exportOptions.methods.length<4) {
    		exportOptions.methods.push({id: "phone", method: 'Text It'});
  	}
	}

	// {for getting entire article list}
	getReadingList() {
    console.log('USER: ', this.state.user)
		this.setState({ isLoading: true });
    console.log('this is the user id for libraryyyyy: ' + this.state.user.id)
		axios.get('/getAll', {params: {userId: this.state.user.id} })
			.then((res) => {
				if (res.data !== "empty") {
					res.data.forEach((article) => {
						if (article.publication_date) {article.publication_date = this.cleanDate(article.publication_date)};
						article.est_time = this.cleanTime(article.est_time);
					});
					this.setState({ isLoading: false, library: (res.data.reverse()).slice(0,20), libraryBackup: res.data, hasLibrary: true });
					// console.log('======GET ALL >>> this.state.library: ', this.state.library);
				} else {
					this.setState({ isLoading: false, hasLibrary: false});
				}
			})
			.catch((err) => this.setState({ failMessage: ('Unable to retrieve articles'), hasErrored: true }));
	}

	cleanDate(entry) {
		return !entry ? 'N/A' : (entry.slice(5,7) + '/' + entry.slice(8,10) + '/' + entry.slice(0,4));
	}

	cleanTime(entry) {
		let mins = Math.floor(entry);
		let secs = (entry-mins)*60;
		secs = !(secs < 10) ? (''+secs).slice(0,2) : '0'+(''+secs).slice(0,1);
		return secs === '00' ? mins + ":" + '00' : mins + ":" + secs;
	}

// {helper function for postUserLink}
	addOne(obj) {
		let result = this.state.library;
		obj.est_time = this.cleanTime(obj.est_time);
		if (obj.publication_date) {
			obj.publication_date = this.cleanDate(obj.publication_date);
		}
		if (this.state.topStoryMode && obj.error) {
			this.setState({topStoryAddMsg: {'result': "Sorry ...", 'message': obj.error}}, function() {
				this.setState({topStoryAdd: true})
			});
		} else if (this.state.topStoryMode) {
			this.setState({topStoryAddMsg: {'result': "Success!", 'message': "The article has been added to your library"}}, function() {this.setState({topStoryAdd: true})
			});
		}
		if (!obj.error) {
			result.unshift(obj)
		};
		return result;
	}

// {for posting new links}
	postUserLink(url) {
		// this.setState({hasErrored: false, failMessage: ''});
		if (!isValidUrl(url)) {
			this.setState({ failMessage: ('Not a valid url: ' + url), hasErrored: true });
			return;
		}
		this.setState({ isLoading: true });
		axios.post('/requrl', {userId: this.state.user.id, requrl: url})
		.then((res) => {
			this.setState({ hasLibrary: true, isLoading: false, library: (this.addOne(res.data)) });
			return;
		})
		.catch((err) => this.setState({ failMessage: (res.data.error || 'Unable to fetch that link'), hasErrored: true }));
	}

	filterArticles(userInput) {
		let target = new RegExp(userInput, 'i'); /* note: 'i' is a RegEx flag, not 'i' for 'index' */
		console.log('==========filterArticles: userInput: ', userInput, ' target: ', target);
		// let lib = this.state.library.slice();
		this.setState({isLoading: true, isFiltered: false, hasErrored: false, failMessage: ''})
		// ...filter through library for articles containing user-provided search terms
		let filtered = this.state.libraryBackup.filter(function(article) {
			// ...for efficiency, check for match in title and excerpt before checking full article text
			if (target.test(article.title) || target.test(article.excerpt) || target.test(article.text)) { return article; }
		});
		console.log('==========filteredArticles -- filtered: ', filtered);
		console.log('========App.jsx - filteredArticles: this.state.isFiltered: ', this.state.isFiltered)
		this.setState({ isLoading: false, library: filtered, isFiltered: true })
	}

	libraryShowAll() {
		this.setState({ library: this.state.libraryBackup.slice(), isFiltered: false });
	}

// {helper function for helper, deleteOne}
	findIndex(array, url) {
		let found = false
		let index;
		let count = 0
		while (found === false) {
			if (array[count].url === url) {
		    found = true;
		    index = count;
		  }
		  count++;
		}
		return index;
	}

// {helper function for deleteArticle}
	deleteOne(resObj) {
		let result = this.state.library;
		let index = this.findIndex(result, resObj.deleted);
		result.splice(index, 1);
		if (result.length === 0) {
			this.setState({hasLibrary: false});
		}
		return result;
	}

// {for deleting a single article}
	deleteArticle(url) {
    console.log('in app.js l. 214. deleteArticle invoked...');
		// {this.setState({ isLoading: true });}
		axios.post('/deleteOne', { userId: this.state.user.id, url: url })
		.then((res) => {
			this.setState({ isLoading: false, library: (this.deleteOne(res.data)) });
			// {=> TODO: figure out how to alert user that article was deleted}
		})
		.catch((err) => this.setState({ hasErrored: true, failMessage: (res.data.error ||'Unable to delete that article') }));
	}
// req.body.payload = {
//     userId: /*user id number*/,
//     destination: e-mail address if e-mail, phone number if phone, 'stream' if stream, 'link' if link ,
//     voice: /*name of voice*/,
//     article: { /* complete article object */ }
// };
	convertArticle(articleObject) {
    console.log('in app.js l. 230. convertArticle invoked...');
		let exportObj = {
			userId: this.state.user.id,
			destination: this.state.user[articleObject.method],
			voice: articleObject.voice || 'Joanna',
			article: articleObject.article
		};
		let route = '/'+ articleObject.method; //**************
		this.setState({lastMethod: articleObject.method, lastUrl: articleObject.article.url});

		// console.log('FRONT-A->>>EXPORT-OBJ: ', exportObj);  /* MH: DEBUGGING */
		console.log('ROUTE: ', route);

		axios.post(route, {payload: exportObj})
		.then((res) => {
			// console.log('FRONT-B->>>RES: ', res.data.url)  /* MH: DEBUGGING */
			if (articleObject.method === "stream") {
				this.setState({nowPlaying: {url: res.data.url, title: res.data.title}, isConverting: false});

			} else {
				// console.log('Message successfully sent to ' + res.data.destination + '.');
				this.setState({lastLink: res.data.url, showConfirm: true, isConverting: false});
			}
		})
		.catch((err) => this.setState({ hasErrored: true, failMessage: ('Error in conversion to speech: ' + err)}));
	}

	quickStream(url) {
		this.toggleLoading();
		axios.post('/quickStream', {url: url})
		.then((res) => {
			this.setState({nowPlaying: {url: res.data.url, title: res.data.title}, isLoading: false});
		})
	}

	getTopStoriesSources() {
    console.log('GETTING SOURCES')
		axios.get('https://newsapi.org/v1/sources?language=en')
			.then((res) => {
				let options = res.data.sources.filter((source) => source.sortBysAvailable.indexOf("top") !== -1)
				this.setState({topStoriesSources: options})
			})
			.catch ((err) => console.log('ERROR GETTING TOP STORIES SOURCES', err))
	}

  componentWillMount() {
    this.getCurrentUser();
    this.getTopStoriesSources();
    this.getHeadlines('google-news');
    this.addDeliveryMethods();
  }

  // componentDidMount() {
  //   this.getTopStoriesSources();
  //   this.getHeadlines('google-news');
  // }

	toggleView() {
		let currentState = this.state.topStoryMode;
		this.setState({topStoryMode: !currentState});
	}

	toggleConfirm() {
		let currentState = this.state.showConfirm;
		this.setState({showConfirm: !currentState});
	}

	toggleLoading() {
		let currentState = this.state.isLoading;
		this.setState({isLoading: !currentState});
	}

	toggleConvert() {
		this.setState({isConverting: true});
	}

	toggleMembersOnly() {
		let currentState = this.state.showMembersOnly;
		this.setState({showMembersOnly: !currentState});
	}

	toggleHeadlines() {
		this.setState({gettingHeadlines: true});
	}

	toggleFiltered() {
		let currentState = this.state.isFiltered;
		console.log('========App.jsx - inside toggleFiltered-PRE: this.state.isFiltered: ', this.state.isFiltered)
		this.setState({isFiltered: !currentState });
	}

	toggleTopStoryAdd() {
		this.setState({topStoryAdd: false});
	}

	getHeadlines(source) {
    console.log('GETTING HEADLINES')
    axios.post('/topStories', {source: source, headlineMode: true})
      .then((res) => {
        res.data.forEach((article) => {
          if (article.publication_date) {
            article.publication_date = this.cleanDate(article.publication_date);
          }
          article.est_time = this.cleanTime(article.est_time);
           randomId++
           article.id = randomId;
         });
        this.setState({ headlines: res.data}, function() {
          this.setState({gettingHeadlines: false});
        });
      })
      .catch((err) => console.log('Unable to retrieve headlines', err));
  }

	// componentDidMount() {
		// this.addDeliveryMethods();
		// this.getReadingList();
		// this.getTopStoriesSources();
		// this.getHeadlines('google-news');
	// }

  onSortEnd ({oldIndex, newIndex}) {
    console.log('app.jsx. onSortEnd, l 400');
    if(this.state.isGuest || this.state.topStoryMode) {
      console.log('app.jsx. in conditional, l 402');
      this.setState({
        headlines: arrayMove(this.state.headlines, oldIndex, newIndex),
      });
    }
    else {
        this.setState({
        library: arrayMove(this.state.library, oldIndex, newIndex),
        });
      };
   };

	render() {
      console.log('this.state = ', this.state);
		return(
			<div className="modal-container">
			  <br></br>
          { this.state.isGuest ? null : <LogoutButton /> }
          { this.state.isGuest ? <LoginButton /> : null }
          { this.state.isGuest ? <SignupButton /> : null }
				<Subtitle getCurrentUser={this.getCurrentUser.bind(this)} user={this.state.user} subtitle='your reading backlog solved.'/>
				{this.state.hasErrored && <ErrorAlert errorMessage={this.state.failMessage}/>}
				<TransFormEr postIt={this.postUserLink.bind(this)} isLoading={this.state.isLoading} toggleLoading={this.toggleLoading.bind(this)} isGuest={this.state.isGuest} quickStream={this.quickStream.bind(this)} />

				<ToggleDisplay show={!this.state.isGuest}>

					<WhichView isLoading={this.state.isLoading} isFiltered={this.state.isFiltered} toggleLoading={this.toggleLoading.bind(this)} toggleView={this.toggleView.bind(this)} topStoryMode={this.state.topStoryMode} searchForIt={this.filterArticles.bind(this)} showAll={this.libraryShowAll.bind(this)} />
					{/*this.state.isLoading && <Loading />*/}

					<ToggleDisplay show={!this.state.topStoryMode}>
						{!this.state.hasLibrary &&
							<div id='empty-library'>
								<h2>Your library is empty!</h2>
								<h3>Head over to Top Stories mode to grab recent headlines</h3>
								<h3>or feed your own links into the form above</h3>
							</div>}
						<SortableList articles={this.state.library} user={this.state.user} deleteIt={this.deleteArticle.bind(this)} convertIt={this.convertArticle.bind(this)} exportOptions={exportOptions} topStoryMode={this.state.topStoryMode} toggleConvert={this.toggleConvert.bind(this)} isConverting={this.state.isConverting} isGuest={this.state.isGuest} toggleMembersOnly={this.toggleMembersOnly.bind(this)} onSortEnd={this.onSortEnd.bind(this)} addIt={this.postUserLink.bind(this)} />

					</ToggleDisplay>

					<ToggleDisplay show={this.state.topStoryMode}>
						<TopStories user={this.state.user} isGuest={this.state.isGuest} cleanDate={this.cleanDate.bind(this)} cleanTime={this.cleanTime.bind(this)} topStoriesSources={this.state.topStoriesSources} deleteIt={this.deleteArticle.bind(this)} convertIt={this.convertArticle.bind(this)} exportOptions={exportOptions} topStoryMode={this.state.topStoryMode} toggleConvert={this.toggleConvert.bind(this)} isConverting={this.state.isConverting} toggleMembersOnly={this.toggleMembersOnly.bind(this)} addIt={this.postUserLink.bind(this)} headlines={this.state.headlines} toggleHeadlines={this.toggleHeadlines.bind(this)} getHeadlines={this.getHeadlines.bind(this)} />
						{this.state.gettingHeadlines &&
          			<div id="loadingOverlay">
            			<Loading type="spin" color="red" />
          			</div>}
					</ToggleDisplay>
				</ToggleDisplay>

				<ToggleDisplay show={this.state.isGuest}>
						<GuestMode isGuest={this.state.isGuest} cleanDate={this.cleanDate.bind(this)} cleanTime={this.cleanTime.bind(this)} topStoriesSources={this.state.topStoriesSources} deleteIt={this.deleteArticle.bind(this)} convertIt={this.convertArticle.bind(this)} exportOptions={exportOptions} topStoryMode={this.state.topStoryMode} toggleConvert={this.toggleConvert.bind(this)} isConverting={this.state.isConverting} toggleMembersOnly={this.toggleMembersOnly.bind(this)} addIt={this.postUserLink.bind(this)} headlines={this.state.headlines} toggleHeadlines={this.toggleHeadlines.bind(this)} getHeadlines={this.getHeadlines.bind(this)} />
						{this.state.gettingHeadlines &&
          		<div id="loadingOverlay">
            		<Loading type="spin" color="red" />
          		</div>}
				</ToggleDisplay>

				<div id="player_container">
					<Player track={this.state.nowPlaying} cycle={false}/>
				</div>
				{this.state.isLoading &&
          		<div id="loadingOverlay">
            		<Loading type="spin" color="red" />
          		</div>}
				<Confirm deleteArticle={this.deleteArticle.bind(this)} user={this.state.user} method={this.state.lastMethod} link={this.state.lastLink} toggleConfirm={this.toggleConfirm.bind(this)} url={this.state.lastUrl} showConfirm={this.state.showConfirm} isGuest={this.state.isGuest}/>
				<TopStoryAdd showModal={this.state.topStoryAdd} toggleTopStoryAdd={this.toggleTopStoryAdd.bind(this)} toggleView={this.toggleView.bind(this)} topStoryAddMsg={this.state.topStoryAddMsg} />
				<MembersOnly showMembersOnly={this.state.showMembersOnly} toggleMembersOnly={this.toggleMembersOnly.bind(this)} />
			</div>
		);
	}
}

export default App;

	// <ReadcastTopstories readcast='Your Read.casts'/>
	// => TODO: // get player scroll to work. Test text: Last word is "initially". This is a song by the legendary Badfinger, who were on Apple Records. Apple Computer told the Beatles they would never be in music so that settled the court case initially

		// <Title title='Read.Cast.ly'/>

					// <div id="navbar"></div>



	// getTopStories(){
 //    console.log('app.js getTopStories, l 102. about to make GET req...');
	// 	this.setState({ isLoading: true });
	// 	axios.get('/topStories', {params: {sources: this.state.sources}})
	// 	.then((res) => {
 //      console.log('app.js getTopStories, l 105. res from BE = ', res.data);
	// 			res.data.forEach((article) => {
	// 				if (article.publishedAt) {article.publishedAt = this.cleanDate(article.publishedAt)};
	// 				article.est_time = this.cleanTime(article.est_time);
	// 			});
	// 			this.setState({ isLoading: false, headlines: (res.data) });
 //        console.log('app.js getTopStories, l 112. cleaned date data =', res.data);
 //        console.log('app.js getTopStories, l 112. [0]description =', res.data[0].description);
	// 		})
	// 		.catch((err) => this.setState({ failMessage: ('Unable to retrieve headlines'), hasErrored: true }));
	// }
