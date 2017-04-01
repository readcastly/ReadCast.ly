const db = require('../dbConfig');
const Promise = require('bluebird');
const Articles = require('../collections/articles');
const Article = require('../models/article');
const ArticlesUsers = require('../collections/articles-users'); // got error because this was 'article-users'
const ArticleUser = require('../models/article-user'); // got error because this was 'articles-user'
const SourceCon = require('./sourcesController')

var getSource = Promise.promisify(SourceCon.getSource);

exports.create = function(articleData) {
  new Article({url: articleData.url}).fetch()
    .then(function(found) {
      if (found) {
        new ArticleUser({article_id: found.id,user_id: articleData.user_id}).fetch()
          .then(function(alsoFound) {
            if (alsoFound) {
              console.log("ARTICLE ALREADY IN USER'S LIBRARY - NEED TO FIGURE OUT HOW TO PASS ERROR UP TO FRONT END");
            } else {
              ArticlesUsers.create({
                article_id: found.id,
                user_id: articleData.user_id
              })
              .then(function(articleUserEntry) {
                console.log('EXISTING ARTICLE FOUND, NEW ENTRY CREATED', articleUserEntry);
              })
              .catch(function(error) {
                console.log('ERROR CREATING NEW ENTRY FOR EXISTING ARTICLE', error);
              })
            }
          })
          .catch(function(error) {
            console.log("ERROR CHECKING IF ARTICLE ALREADY IN USER'S LIBRARY", error)
          })
      } else {
        getSource(articleData.domain)
          .then(function(source) {
            Articles.create({
              url: articleData.url,
              title: articleData.title,
              author: articleData.author,
              publication_date: articleData.publication_date,
              source_id: SourceCon.sourceId,
              text: articleData.text,
              image: articleData.image,
              excerpt: articleData.excerpt,
              word_count: articleData.word_count,
              est_time: articleData.est_time,
              created_by: articleData.user_id
            })
          })
          .then(function(article) {
            ArticlesUsers.create({
              article_id: article.id,
              user_id: article.created_by
            })
          })
          .catch(function(error) {
            console.log('ERROR CREATING NEW ARTICLE', error);
          })
      }
    })
    .catch(function(error) {
      console.log('ERROR CHECKING FOR EXISTING ARTICLE', error);
    })
}
