import './Menu.scss';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { close } from '../../../redux/menuSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookF,
	faInstagram,
	faXTwitter,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
	faFileContract,
	faNetworkWired,
	faPeopleGroup,
	faTableList,
} from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';

function Menu() {
	const dispatch = useDispatch();
	const { isOpen } = useSelector((store) => store.menu);
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.aside
					className='menu'
					initial={{ x: '-100%' }}
					animate={{ x: '0%' }}
					exit={{ x: '-100%' }}
					transition={{ duration: 0.5 }}
					onClick={() => dispatch(close())}
				>
					<h1
						onMouseEnter={(e) => {
							e.currentTarget.classList.add('on');
						}}
						onMouseLeave={(e) => {
							e.currentTarget.classList.remove('on');
						}}
					>
						<Link to='/'>LOGO</Link>
					</h1>

					<ul className='link'>
						<li
							onMouseEnter={(e) => {
								e.currentTarget.classList.add('on');
							}}
							onMouseLeave={(e) => {
								e.currentTarget.classList.remove('on');
							}}
						>
							<FontAwesomeIcon icon={faTableList} className='icon' />
							<NavLink to='/department' activeClassName='active'>
								Department
							</NavLink>
						</li>
						<li
							onMouseEnter={(e) => {
								e.currentTarget.classList.add('on');
							}}
							onMouseLeave={(e) => {
								e.currentTarget.classList.remove('on');
							}}
						>
							<FontAwesomeIcon icon={faNetworkWired} className='icon' />
							<NavLink to='/community' activeClassName='active'>
								Community
							</NavLink>
						</li>
						<li
							onMouseEnter={(e) => {
								e.currentTarget.classList.add('on');
							}}
							onMouseLeave={(e) => {
								e.currentTarget.classList.remove('on');
							}}
						>
							<FontAwesomeIcon icon={faImages} className='icon' />
							<NavLink to='/gallery' activeClassName='active'>
								Gallery
							</NavLink>
						</li>
						<li
							onMouseEnter={(e) => {
								e.currentTarget.classList.add('on');
							}}
							onMouseLeave={(e) => {
								e.currentTarget.classList.remove('on');
							}}
						>
							<FontAwesomeIcon icon={faYoutube} className='icon' />
							<NavLink to='/youtube' activeClassName='active'>
								Youtube
							</NavLink>
						</li>
						<li
							onMouseEnter={(e) => {
								e.currentTarget.classList.add('on');
							}}
							onMouseLeave={(e) => {
								e.currentTarget.classList.remove('on');
							}}
						>
							<FontAwesomeIcon icon={faPeopleGroup} className='icon' />
							<NavLink to='/members' activeClassName='active'>
								Members
							</NavLink>
						</li>
						<li
							onMouseEnter={(e) => {
								e.currentTarget.classList.add('on');
							}}
							onMouseLeave={(e) => {
								e.currentTarget.classList.remove('on');
							}}
						>
							<FontAwesomeIcon icon={faFileContract} className='icon' />
							<NavLink to='/contact' activeClassName='active'>
								Contact
							</NavLink>
						</li>
					</ul>

					<ul className='sns'>
						<li
							onMouseEnter={(e) => {
								e.currentTarget.classList.add('on');
							}}
							onMouseLeave={(e) => {
								e.currentTarget.classList.remove('on');
							}}
						>
							<a href='http://www.facebook.com'>
								<FontAwesomeIcon icon={faFacebookF} className='facebook' />
							</a>
						</li>
						<li
							onMouseEnter={(e) => {
								e.currentTarget.classList.add('on');
							}}
							onMouseLeave={(e) => {
								e.currentTarget.classList.remove('on');
							}}
						>
							<a href='http://www.twitter.com'>
								<FontAwesomeIcon icon={faXTwitter} className='twitter' />
							</a>
						</li>
						<li
							onMouseEnter={(e) => {
								e.currentTarget.classList.add('on');
							}}
							onMouseLeave={(e) => {
								e.currentTarget.classList.remove('on');
							}}
						>
							<a href='https://www.instagram.com/'>
								<FontAwesomeIcon icon={faInstagram} className='instagram' />
							</a>
						</li>
					</ul>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}

export default Menu;
