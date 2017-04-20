// ArticleList component (i.e., the container for Articles)
  // - a stateless component

	import React from 'react';
	import ArticleEntry from './ArticleEntry.jsx';

	import {Component} from 'react';
	import {render} from 'react-dom';
	import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

	const SortableItem = SortableElement(({ index, user, value, exportOptions, deleteIt, convertIt, topStoryMode, isConverting, toggleConvert, isGuest, toggleMembersOnly, addIt}) =>
	
	  <ArticleEntry key={index} user={user} headline={value} article={value} exportOptions={exportOptions} deleteIt={deleteIt} convertIt={convertIt} topStoryMode={topStoryMode} isConverting={isConverting} toggleConvert={toggleConvert} isGuest={isGuest} toggleMembersOnly={toggleMembersOnly} addIt={addIt} />
	);

	const SortableList = SortableContainer(({ articles, user, exportOptions, deleteIt, convertIt, topStoryMode, isConverting, toggleConvert, isGuest, toggleMembersOnly, addIt}) => (
			<div className="container sortable-items">
		    <ul>
		      {articles.map((value, index) => (
		        <SortableItem key={`item-${index}`} index={index} value={value} user={user} exportOptions={exportOptions} deleteIt={deleteIt} convertIt={convertIt} topStoryMode={topStoryMode} isConverting={isConverting} toggleConvert={toggleConvert} isGuest={isGuest} addIt={addIt} toggleMembersOnly={toggleMembersOnly}/>
		      ))
				}
				</ul>
			</div>
	  ));

export default SortableList;

// TODO: need to fix drag/drop for topStoryMode; tried adding this to map headlines also but throws err "Uncaught TypeError: Cannot read property '__reactInternalInstance$ad8fzx44r6i' of null"
// <ul>
// 	{headlines.map((value, index) => (
// 		<SortableItem key={`item-${index}`} index={index} value={value} user={user} exportOptions={exportOptions} deleteIt={deleteIt} convertIt={convertIt} topStoryMode={topStoryMode} isConverting={isConverting} toggleConvert={toggleConvert} isGuest={isGuest} addIt={addIt} toggleMembersOnly={toggleMembersOnly}/>
// 	))
// }
// </ul>

// before drag/drop:
	// import React from 'react';
	// import {Grid} from 'react-bootstrap';
	// import ArticleEntry from './ArticleEntry.jsx';
	//
	// function ArticleList(props) {
	//
	// 	return (
	// 		<Grid className='article-list'>
	// 			{props.articles.map((article) => (
	// 				<ArticleEntry key={article.id} article={article} user={props.user} exportOptions={props.exportOptions} deleteIt={props.deleteIt} convertIt={props.convertIt} topStoryMode={props.topStoryMode} toggleConvert={props.toggleConvert} isConverting={props.isConverting} isGuest={props.isGuest} toggleMembersOnly={props.toggleMembersOnly} />
	// 			))}
	// 		</Grid>
	// 	);
	// }
	//
	// export default ArticleList;
