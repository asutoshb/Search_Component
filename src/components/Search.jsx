import React, { useState, useEffect, useRef } from 'react';
import { MOCK_DATA } from '../constants/MockData';
import { Card } from './Card';
import '../css/Search.css';

const Search = () => {
	const usersRef = useRef(null);
	const [mockUsers, setMockUsers] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const [isKeyBoardNavigation, setIsKeyBoardNavigation] = useState(false);

	useEffect(() => {
		setMockUsers(MOCK_DATA);
	}, []);

	useEffect(() => {
		filterUsers();
		resetScrollPosition();
	}, [searchText, mockUsers]);

	useEffect(() => {
		scrollHighlightedCardIntoView();
	}, [highlightedIndex]);

	const filterUsers = () => {
		const results = mockUsers.filter(user =>
			Object.values(user).some(value =>
				{
					if(typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())) return true;
					if(typeof value === 'object' && value.join('').toLowerCase().includes(searchText.toLowerCase())) return true;
					return false;
				}
			)
		);
		setSearchResults(results);
		setHighlightedIndex(0);
	};

	const resetScrollPosition = () => {
		if (usersRef.current) {
			usersRef.current.scrollTop = 0;
		}
	};

	const scrollHighlightedCardIntoView = () => {
		if (highlightedIndex !== -1 && usersRef.current) {
			const highlightedCard = usersRef.current.children[highlightedIndex];
			highlightedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	};

	const handleInputChange = (event) => {
		setSearchText(event.target.value);
	};

	const handleKeyDown = (event) => {
		setIsKeyBoardNavigation(true);
		if (event.key === 'ArrowDown') {
			setHighlightedIndex(prevIndex => (prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex));
		} else if (event.key === 'ArrowUp') {
			setHighlightedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
		}
	};

	const handleCardHover = (index) => {
		setIsKeyBoardNavigation(false);
		!isKeyBoardNavigation && setHighlightedIndex(index); // Highlight the clicked card
	};

	return (
		<div tabIndex={0} onKeyDown={handleKeyDown}>
			<input
				type="text"
				placeholder="Search Users By Id, Address, Name ..."
				value={searchText}
				onChange={handleInputChange}
				className="search-box"
				autoFocus
			/>
			<div ref={usersRef} className='search-div' onKeyDown={handleKeyDown}>
				{searchResults.map((user, index) => (
					<Card
						key={index}
						cardInfo={user}
						highlightedIndex={highlightedIndex}
						index={index}
						searchText={searchText}
						ohHoverCard={handleCardHover}
					/>
				))}
				{searchResults.length === 0 && (
					<div className='no-user-found'>
						<p>No User found</p>
					</div>
				)}
			</div>
		</div>
	);
};

export { Search };
