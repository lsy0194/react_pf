import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCcAmazonPay,
	faCcMastercard,
	faCcPaypal,
	faCcVisa,
	faFacebookF,
} from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.scss';
export default function Footer() {
	return (
		<footer>
			<div className='left'>
				<h1>
					<Link to='/'>DCODELAB</Link>
				</h1>
				<p>Portfolio</p>

				<ul>
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
			</div>
			<div className='center'>
				<ul>
					<li>
						<NavLink to='/department' activeClassName='active'>
							Department
						</NavLink>
					</li>
					<li>
						<NavLink to='/gallery' activeClassName='active'>
							Gallery
						</NavLink>
					</li>
					<li>
						<NavLink to='/Community' activeClassName='active'>
							Community
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeClassName='active'>
							Youtube
						</NavLink>
					</li>
					<li>
						<NavLink to='/members' activeClassName='active'>
							Members
						</NavLink>
					</li>
					<li>
						<NavLink to='/contact' activeClassName='active'>
							Contact
						</NavLink>
					</li>
				</ul>
			</div>
			<div className='right'>
				<div className='txtBox'>
					<h2>Lorem ipsum dolor sit.</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia necessitatibus adipisci
						sint consequatur saepe.
					</p>
				</div>
				<div className='cardBox'>
					<a href='none'>
						<FontAwesomeIcon icon={faCcVisa} />
					</a>
					<a href='none'>
						<FontAwesomeIcon icon={faCcMastercard} />
					</a>
					<a href='none'>
						<FontAwesomeIcon icon={faCcPaypal} />
					</a>
					<a href='none'>
						<FontAwesomeIcon icon={faCcAmazonPay} />
					</a>
				</div>
			</div>
		</footer>
	);
}
