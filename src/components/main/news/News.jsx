import './News.scss';
import { useState } from 'react';
function News() {
	//프로젝트가 처음 구동되면 무조건 메인페이지에 갔다가 커뮤니티 페이지에 넘어가는 구조
	//해당 페이지에 있는 함수가 처음 구동될시 로컬저장소에 값이 없으므로
	//저장소값이 없을때 빈배열이 반환되는 구문을 추가 (중요)
	const getLocalDate = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};
	const [Post] = useState(getLocalDate);
	return (
		<section className='news myScroll'>
			<div className='left'></div>
			<div className='right'>
				<h2>News</h2>
				<div className='postWrap'>
					{Post.map((el, idx) => {
						if (idx >= 4) return null;
						else
							return (
								<article key={idx}>
									<h2>{el.title.length > 10 ? el.title.substr(0, 6) + '...' : el.title}</h2>
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
