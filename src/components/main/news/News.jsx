import './News.scss';
import { useEffect, useRef, useState } from 'react';
function News() {
	const path = process.env.PUBLIC_URL;
	const [Book, setBook] = useState([]);
	const [BIndex, setBIndex] = useState(0);
	const refOn = useRef(null);

	useEffect(() => {
		fetch(`${path}/DB/book.json`)
			.then((data) => data.json())
			.then((json) => {
				setBook(json.item);
			});
	});

	const btnPrev = () => {
		if (BIndex <= 0) setBIndex(9);
		else setBIndex(BIndex - 1);
	};
	const btnNext = () => {
		if (BIndex >= 9) setBIndex(0);
		else setBIndex(BIndex + 1);
	};

	const getLocalDate = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};

	const [Post] = useState(getLocalDate);
	return (
		<section className='news myScroll'>
			<div className='left'>
				<h2 className='Btitle'>Book</h2>
				<div className='bar'></div>
				<div className='booklist' ref={refOn}>
					{Book.map((book, idx) => {
						return (
							<article key={idx} className={idx === BIndex ? 'on' : ''}>
								<div className='pic'>
									<img src={book.cover} alt={book.title} />
								</div>
								<div className='txtBox'>
									<h2>{book.title} </h2>
									<div className='subbar'></div>
									<p>{book.description}</p>
								</div>
							</article>
						);
					})}
					<div className='btn'>
						<button onClick={btnPrev}>prev</button>
						<button onClick={btnNext}>next</button>
					</div>
				</div>{' '}
			</div>

			<div className='centerLine'></div>

			<div className='right'>
				<div className='txtBox'>
					<h2 className='title'>News</h2>
					<div className='bar'></div>
				</div>

				<div className='postWrap'>
					{Post.map((el, idx) => {
						return (
							<article key={idx}>
								<h2 className='subtitle'>
									{el.title.length > 10 ? el.title.substr(0, 6) + '...' : el.title}
								</h2>
								<div className='bars'></div>
								<p>{el.content}</p>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default News;
