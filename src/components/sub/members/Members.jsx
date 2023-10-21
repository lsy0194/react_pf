import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

export default function Members() {
	console.log('member');
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: '',
		interests: [],
		comments: '',
	};
	const refCheckGroup = useRef(null);
	const refRadioGroup = useRef(null);
	const refSelGroup = useRef(null);
	const [Val, setVal] = useState(initVal);
	const [Errs, setErrs] = useState({});
	const DebouncedVal = useDebounce(Val);
	const [Mounted, setMounted] = useState(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name, checked } = e.target;
		setVal({ ...Val, [name]: checked });
	};

	const handleCheck = (e) => {
		const { name } = e.target;
		let checkArr = [];
		const inputs = e.target.parentElement.querySelectorAll('input');
		//checkbox요소를 반복돌면서 해당 요소가 체크되어 있다면 해당 value값을 배열에 담아주고
		//배열을 state에 담아줌
		inputs.forEach((input) => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	const check = (value) => {
		const num = /[0-9]/; //0-9까지의 모든 값을 정규표현식으로 범위지정
		const txt = /[a-zA-Z]/; //대소문자 구분없이 모든 문자 범위지정
		const spc = /[!@#$%^*()_]/; //모든 특수문자 지정
		const errs = {};
		if (value.userid.length < 5) {
			errs.userid = '아이디는 최소 5글자 이상 입력하세요.';
		}
		//비밀번호 인증 (5글자 이상, 문자, 숫자, 특수문자 모두 포함)
		if (
			value.pwd1.length < 5 ||
			!num.test(value.pwd1) ||
			!txt.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 = '비밀번호는 5글자이상, 문자,숫자,특수문자를 모두 포함하세요';
		}

		//비밀번호 재확인 인증
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '2개의 비밀번호를 같게 입력하세요.';
		}

		//이메일 인증
		if (!value.email || !/@/.test(value.email)) {
			errs.email = '이메일은 무조건 @를 포함해야 합니다.';
		} else {
			const [forward, backward] = value.email.split('@');
			if (!forward || !backward) {
				errs.email = '이메일에 @앞뒤로 문자값이 있어야 합니다.';
			} else {
				const [forward, backward] = value.email.split('.');
				if (!forward || !backward) {
					errs.email = '이메일 . 앞뒤로 문자값이 있어야 합니다.';
				}
			}
		}

		//성별인증
		if (!value.gender) {
			errs.gender = '성별은 필수체크 항목입니다. ';
		}
		//관심사 인증
		if (value.interests.length === 0) {
			errs.interests = '취미를 하나이상 체크해주세요.';
		}
		//학력인증
		if (!value.edu) {
			errs.edu = '학력을 선택하세요';
		}
		//남기는말
		if (value.comments.length < 10) {
			errs.comments = '남기는 말은 10글자 이상입력해주세요';
		}
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(check(Val)).length === 0) {
			alert('인증통과');
		} else {
			setErrs(check(Val));
		}
	};

	const resetFrom = (e) => {
		e.preventDefault();
		setVal(initVal);
		// const checks = refCheckGroup.current.querySelectorAll('input');
		// const radios = refRadioGroup.current.querySelectorAll('input');
		// checks.forEach((input) => (input.checked = false));
		// radios.forEach((input) => (input.checked = false));
		[refCheckGroup, refRadioGroup].forEach((el) => {
			el.current.querySelectorAll('input').forEach((input) => (input.checked = false));
		});
		refSelGroup.current.value = '';
	};
	const showCheck = () => {
		Mounted && setErrs(check(DebouncedVal));
	};

	useEffect(() => {
		showCheck();
		console.log(DebouncedVal);
		return () => setMounted(false);
	}, [DebouncedVal]);

	return (
		<Layout title={'Members'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table border='1'>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>ID</label>
								</th>
								<td>
									<input
										type='text'
										id='userid'
										name='userid'
										value={Val.userid}
										onChange={handleChange}
										placeholder='아이디를 입력하세요'
									/>
									{Errs.userid && <p>{Errs.userid}</p>}
								</td>
							</tr>
							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>password</label>
								</th>
								<td>
									<input
										type='password'
										id='pwd1'
										name='pwd1'
										value={Val.pwd1}
										onChange={handleChange}
										placeholder='비밀번호를 입력하세요'
									/>
									{Errs.pwd1 && <p>{Errs.pwd1}</p>}
								</td>
							</tr>
							{/* re password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>re-password</label>
								</th>
								<td>
									<input
										type='password'
										id='pwd2'
										name='pwd2'
										value={Val.pwd2}
										onChange={handleChange}
										placeholder='비밀번호를 한번 더 입력하세요'
									/>
									{Errs.pwd2 && <p>{Errs.pwd2}</p>}
								</td>
							</tr>
							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>e-mail</label>
								</th>
								<td>
									<input
										type='text'
										id='email'
										name='email'
										value={Val.email}
										onChange={handleChange}
										placeholder='이메일을 입력하세요'
									/>
									{Errs.email && <p>{Errs.email}</p>}
								</td>
							</tr>
							{/* gender */}
							<tr>
								<th>gender</th>
								<td ref={refRadioGroup}>
									<label htmlFor='female'>female</label>
									<input
										type='radio'
										name='gender'
										id='female'
										defaultValue='female'
										onChange={handleChange}
									/>

									<label htmlFor='male'>male</label>
									<input
										type='radio'
										name='gender'
										id='male'
										defaultValue='male'
										onChange={handleChange}
									/>
									{Errs.gender && <p>{Errs.gender}</p>}
								</td>
							</tr>
							{/* interests */}
							<tr>
								<th>interests</th>
								<td ref={refCheckGroup}>
									<label htmlFor='sports'>sports</label>
									<input
										type='checkbox'
										id='sports'
										name='interests'
										defaultValue='sports'
										onChange={handleCheck}
									/>

									<label htmlFor='game'>game</label>
									<input
										type='checkbox'
										id='game'
										name='interests'
										defaultValue='game'
										onChange={handleCheck}
									/>

									<label htmlFor='music'>music</label>
									<input
										type='checkbox'
										id='music'
										name='interests'
										defaultValue='music'
										onChange={handleCheck}
									/>

									{Errs.interests && <p>{Errs.interests}</p>}
								</td>
							</tr>
							{/* education */}
							<tr>
								<th>
									<label htmlFor='edu'>education</label>
								</th>
								<td>
									<select name='edu' id='edu' onChange={handleChange} ref={refSelGroup}>
										<option value=''>최종학력을 선택하세요</option>
										<option value='elementary-school'>초등학교 졸업</option>
										<option value='middle-school'>중학교 졸업</option>
										<option value='high-school'>고등학교 졸업</option>
										<option value='college'>대학교 졸업</option>
									</select>
									{Errs.edu && <p>{Errs.edu}</p>}
								</td>
							</tr>
							{/* comments */}
							<tr>
								<th>
									<label htmlFor='comments'>comments</label>
								</th>
								<td>
									<textarea
										name='comments'
										id=''
										cols='30'
										rows='3'
										value={Val.comments}
										onChange={handleChange}
										placeholder='남기는 말을 입력하세요'
									></textarea>
									{Errs.comments && <p>{Errs.comments}</p>}
								</td>
							</tr>
							{/* btnSet */}
							<tr>
								<th colSpan='2' className='btnSet'>
									<input type='reset' value='cancel' onClick={resetFrom} />
									<input type='submit' value='send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}
