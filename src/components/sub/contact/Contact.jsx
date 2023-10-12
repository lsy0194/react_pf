import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
	const form = useRef();
	const map = useRef(null);
	const instance = useRef(null);
	const view = useRef(null);
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);
	const { kakao } = window;
	const [IsMap, setIsMap] = useState(true);

	const info = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);

	const marker = new kakao.maps.Marker({
		position: info.current[Index].latlng,
		image: new kakao.maps.MarkerImage(
			info.current[Index].imgSrc,
			info.current[Index].imgSize,
			info.current[Index].imgPos
		),
	});

	const setCenter = () => {
		// 지도 중심을 이동 시킵니다
		instance.current.setCenter(info.current[Index].latlng);
	};

	useEffect(() => {
		//Index값이 변경될때마다 새로운 지도 레이어가 중첩되므로
		//일단은 기존 map안의 모든 요소를 없애서 초기화
		map.current.innerHTML = '';
		//컴포넌트 마운트 되자마자 지도인스턴스 생성
		instance.current = new kakao.maps.Map(map.current, {
			center: info.current[Index].latlng,
			level: 1,
		});
		marker.setMap(instance.current);
		const mapTypeControl = new kakao.maps.MapTypeControl();
		instance.current.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMLEFT);
		window.addEventListener('resize', setCenter);
		//로드뷰관련코드

		new kakao.maps.RoadviewClient().getNearestPanoId(
			info.current[Index].latlng,
			50, //해당 지도의 위치값에서 반경 100미터 안에 제일 가까운 도로 기준으로 로드뷰화면 생성
			(panoId) => {
				new kakao.maps.Roadview(view.current).setPanoId(panoId, info.current[Index].latlng); //panoId와 중심좌표를 통해 로드뷰 실행
			}
		);
	}, [Index]);

	useEffect(() => {
		Traffic
			? instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	const resetFrom = () => {
		const nameform = form.current.querySelector('.nameEl');
		const emailform = form.current.querySelector('.emailEl');
		const msgform = form.current.querySelector('.msgEl');
		nameform.value = '';
		emailform.value = '';
		msgform.value = '';
	};

	const sendEmail = (e) => {
		e.preventDefault();

		const nameform = form.current.querySelector('.nameEl');
		const emailform = form.current.querySelector('.emailEl');
		const msgform = form.current.querySelector('.msgEl');

		if (!nameform.value || !emailform.value || !msgform.value)
			return alert('사용자이름,이메일주소,문의내용은 필수 입력사항입니다.');
		//sendFrom메서드는 각 키값을 문자열로만 인수로 전달되도록 type지정되어 있기 떄문에
		//변수를 `${}`로 감싸서 문자형식으로 전달
		emailjs
			.sendForm(
				`${process.env.REACT_APP_SERVICE_ID}`,
				`${process.env.REACT_APP_TEMPLATE_ID}`,
				form.current,
				`${process.env.REACT_APP_PUBLIC_KEY}`
			)
			.then(
				(result) => {
					alert('문의내용이 메일로 발송되었습니다.');
					console.log(result);
					resetFrom();
				},
				(error) => {
					alert('문의내용 전송에 실패했습니다.');
					console.log(error);
					resetFrom();
				}
			);
	};

	return (
		<Layout title={'Contact'}>
			<div id='mailBox'>
				<div className='left'>
					<form ref={form} onSubmit={sendEmail}>
						<div className='upper'>
							<input type='text' name='user_name' className='nameEl' placeholder='Name' />
							<input type='email' name='user_email' className='emailEl' placeholder='Email' />
						</div>
						<div className='lower'>
							<textarea name='message' className='msgEl' placeholder='Message' />
						</div>
						<div className='btnSet'>
							<input type='reset' value='Cancel' />
							<input type='submit' value='Send' className='send' />
						</div>
					</form>
				</div>
				<div className='right'>
					<h3>phone</h3>
					<p>(255)-385-1239</p>
					<h3>Address</h3>
					<p>서울 마포구 성암로 330</p>
					<h3>Email</h3>
					<p>tktmadltmddu@naver.com</p>
				</div>
			</div>
			<div className='mapbox'>
				{/* <button onClick={() => setTraffic(true)}>주변 교통정보 보기</button>
			<button onClick={() => setTraffic(false)}>주변 교통정보 끄기</button> */}
				<button onClick={() => setTraffic(!Traffic)}>
					{Traffic ? '교통정보 끄기' : '교통정보 켜기'}
				</button>
				<button onClick={setCenter}>지도위치초기화</button>
				<button
					onClick={() => {
						setIsMap(!IsMap);
					}}
				>
					{IsMap ? '지도보기' : '로드뷰보기'}
				</button>
				<div className='container'>
					<div className={`view  ${IsMap ? '' : 'on'}`} ref={view}></div>
					<div className={`map  ${IsMap ? 'on' : ''}`} ref={map}></div>
				</div>
				<ul>
					{info.current.map((el, idx) => (
						<li
							className={Index === idx ? 'on' : ''}
							key={idx}
							onClick={() => {
								setIndex(idx);
								setIsMap(true);
							}}
						>
							{el.title}
						</li>
					))}
				</ul>
			</div>
		</Layout>
	);
}
