import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
import './Department.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
const path = process.env.PUBLIC_URL;
//1.useEffect로 컴포넌트마운트되자마자 fetch외부데이터 가져옴
//2.데이터가 다 받아지면 useState로 state에 담아줌

export default function Department() {
	const [Department, setDepartment] = useState([]);

	useEffect(() => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setDepartment(json.members);
			});
	}, []);

	return (
		<Layout title={'Department'}>
			<div className='memberBox'>
				{Department.map((member, idx) => {
					return (
						<article
							key={idx}
							onMouseOver={(e) => {
								e.preventDefault();
								e.currentTarget.classList.add('on');
							}}
							onMouseLeave={(e) => {
								e.preventDefault();
								e.currentTarget.classList.remove('on');
							}}
						>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
							</div>
							<h2>{member.name}</h2>
							<p>{member.position}</p>
							<div className='sns'>
								<div className='btn'>
									<a href='http://www.facebook.com'>
										<FontAwesomeIcon icon={faFacebookF} className='facebook' />
									</a>
								</div>
								<div className='btn'>
									<a href='http://www.twitter.com'>
										<FontAwesomeIcon icon={faXTwitter} className='twitter' />
									</a>
								</div>
								<div className='btn'>
									<a href='https://www.instagram.com/'>
										<FontAwesomeIcon icon={faInstagram} className='instagram' />
									</a>
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}
