import React from 'react';
import '../css/Card.css';

const highlightText = (text, searchText) => {
	if (!searchText || !text) return text;
	const parts = text.split(new RegExp(`(${searchText})`, 'gi'));
	return parts.map((part, i) => (part.toLowerCase() === searchText.toLowerCase() ? <span key={i} style={{ color: 'blue' }}>{part}</span> : part));
  };

const handleItems = (itemsArr, searchText) => {
	if (!searchText) return '';
	const isIncludeSearchText = itemsArr.join('').toLowerCase().includes(searchText.toLowerCase());
	if(isIncludeSearchText) {
		return (
			<React.Fragment>
				<hr />
					<li className='user-items'>
						<span className='user-items-list'>{searchText}</span> found in items
					</li>
				<hr />
			</React.Fragment>
		)
	}
}

const Card = ({ cardInfo, highlightedIndex, index, searchText, ohHoverCard }) => {
	
	return (
		<div 
			className='main-div'
			style={{ backgroundColor: index === highlightedIndex ? '#f4efcd' : 'white' }}
			onMouseEnter={() => ohHoverCard(index)}
			key={index}
		>
			<div>{highlightText(cardInfo.id, searchText)}</div>
			<div className='user-name'>{highlightText(cardInfo.name, searchText)}</div>
			<div>{handleItems(cardInfo.items, searchText)}</div>
			<div className='user-address'>{highlightText(cardInfo.address, searchText)}</div>
			<div>{highlightText(cardInfo.pincode, searchText)}</div>
		</div>
	)
}

export { Card };