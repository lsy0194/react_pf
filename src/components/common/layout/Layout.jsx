import './Layout.scss';
import { useEffect, useRef, useState } from 'react';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout({ title, children }) {
	const [IsOn, setIsOn] = useState(false);
	const frame = useRef(null);
	const tit = useRef(null);

	const splitText = useSplitText();

	useEffect(() => {
		//원하는 위치에서 활성화된 함수 호출
		splitText(tit, 0.1, 1);
		setTimeout(() => setIsOn(true), 300);
	}, []);
	return (
		<section ref={frame} className={`layout ${title}`}>
			<figure></figure>

			<div className='content'>
				<h1 ref={tit}>{title}</h1>
				{children}
			</div>
		</section>
	);
}
