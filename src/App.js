import './styles/Global.scss';

import { Route, Switch } from 'react-router-dom';
import Header from './components/common/header/Header';
import Department from './components/sub/department/Department';
import Youtube from './components/sub/youtube/Youtube';
import Members from './components/sub/members/Members';
import Gallery from './components/sub/gallery/Gallery';
import Contact from './components/sub/contact/Contact';
import Community from './components/sub/community/Community';
import Main from './components/main/mainwarp/Main';
import Footer from './components/common/footer/Footer';
import { useMedia } from './hooks/useMedia';

function App() {
	return (
		<main className={useMedia()}>
			<Switch>
				<Route exact path='/'>
					<Header isMain={true} />
					<Main />
					<Footer />
				</Route>

				<Route path='/'>
					<Header isMain={false} />
				</Route>
			</Switch>
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/community' component={Community} />
		</main>
	);
}

export default App;
