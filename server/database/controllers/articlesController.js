const db = require('../dbConfig');
const Articles = require('../collections/articles');
const Article = require('../models/article');
const ArticlesUsers = require('../collections/articles-users');
const ArticleUser = require('../models/article-user');
const SourceCon = require('./sourcesController')

var exactFind = false;
const exactFindMsg = [{"Has_Already": "This article is already in your library"}];


const create = function(articleData,callback) {
  exactFind = false;
  return new Article({url: articleData.url}).fetch()
    .then(function(found) {
      if (found) {
        console.log('FOUND === ', found.attributes.id);
        console.log('USER === ', articleData.user_id);
        return new ArticleUser({article_id: found.attributes.id,user_id: articleData.user_id}).fetch()
          .then(function(alsoFound) {
            return alsoFound ? exactMatch(callback) : linkArticleUser(found,articleData);
          })
          .catch(function(error) {console.log('ERROR DEALING WITH EXISTING ARTICLE', error);});
      } else {
        return SourceCon.getSource(articleData.domain)
          .then(function(source){return makeArticle(source,articleData);})
          .then(function(article){return linkArticleUser(article,articleData);})
          .catch(function(error) {console.log('ERROR DEALING WITH NEW ARTICLE', error);});
      }
    })
    .then(function(entry) {
      return !exactFind ? getAll(entry.attributes.user_id,callback) : console.log('NO NEED TO GET ALL');
    })
    .catch(function(error) {console.log('ERROR CHECKING URL PASSED IN', error);});
};

const deleteOne = function(articleUser_id,callback) {
  return new ArticleUser({id: articleUser_id})
    .destroy([require=true])
    .then(function(deletedModel) {
      console.log('THIS ARTICLE HAS BEEN DELETED:  ', deletedModel);
      callback(deletedModel);
    })
    .catch(function(error){console.log('ERROR DELETING AN ARTICLE:  ', error);});
};


const exactMatch = function(callback) {
  exactFind = true;
  return callback(exactFindMsg);
};

const linkArticleUser = function(article,articleData) {
  return ArticlesUsers.create({
    article_id: article.id,
    user_id: articleData.user_id
  });
};

const makeArticle = function(source,articleData) {
  console.log('SOURCE ID === ', source);
  return Articles.create({
    url: articleData.url,
    title: articleData.title,
    author: articleData.author,
    publication_date: articleData.publication_date,
    source_id: source.id,
    source_name: source.name,
    text: articleData.text,
    image: articleData.image,
    excerpt: articleData.excerpt,
    word_count: articleData.word_count,
    est_time: articleData.est_time,
    created_by: articleData.user_id
  });
};

// revert back to var getAll after test
const getAll = function(userId,callback) {
  console.log('IN GET ALL userID = ',userId);
  return db.knex('Articles')
    .join('Articles-Users','Articles.id','Articles-Users.article_id')
    .where('Articles-Users.user_id','=', userId)
    .select('*')
    .then(callback);
};

module.exports= {
  create : create,
  getAll : getAll,
  deleteOne : deleteOne
}
