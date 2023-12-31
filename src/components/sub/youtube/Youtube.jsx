import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useYoutubeQuery } from '../../../hooks/useYoutube';

export default function Youtube() {
	const { data: Youtube, isSuccess } = useYoutubeQuery();
	console.log(Youtube);
	return (
		<>
			<Layout title={'Youtube'}>
				<div className='container'>
					<div className='left'>
						<h3>Lorem ipsum dolor sit.</h3>
						<p className='subcontainer'>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus vitae, maxime
							veritatis animi dolor tenetur dignissimos, adipisci nihil suscipit, consectetur
							deleniti quod? Architecto cupiditate laborum delectus. Ratione ad fugit ipsam,
							laboriosam adipisci et. Error non fugiat deleniti quos dicta, alias facilis officiis
							et ad recusandae impedit ea quasi dolorum consequatur iste, odio quae, quod ex!
							Fugiat, cumque doloribus amet quae quam quos. Harum ipsum, molestiae officiis, hic,
							repellendus enim nostrum rerum voluptatibus quam impedit aliquid? Alias eligendi illum
							voluptates ullam similique nisi voluptate in eveniet nihil, explicabo quisquam
							repudiandae, inventore unde, recusandae minus iusto ratione autem illo magni nesciunt
							sit?
						</p>
					</div>
					{isSuccess &&
						Youtube.map((data, idx) => {
							if (idx >= 4) return null;
							let tit = data.snippet.title;
							let desc = data.snippet.description;
							let date = data.snippet.publishedAt;
							return (
								<article
									key={idx}
									className='Ycontent'
									onMouseOver={(e) => {
										e.currentTarget.classList.add('on');
									}}
									onMouseLeave={(e) => {
										e.currentTarget.classList.remove('on');
									}}
								>
									<div className='pic'>
										<Link to={`/detail/${data.id}`}>
											<img src={data.snippet.thumbnails.standard.url} alt={data.title} />
										</Link>
									</div>
									<h2>{tit.length > 60 ? tit.substr(0, 60) + '...' : tit}</h2>
									<p>{desc.length > 180 ? desc.substr(0, 180) + '...' : desc}</p>
									<span>{date.split('T')[0].split('-').join('.')}</span>
								</article>
							);
						})}
				</div>
			</Layout>
			{/*IsModal && (
				<Modal setIsModal={setIsModal}>
					<iframe
						src={`https://www.youtube.com/embed/${Youtube[Index].snippet.resourceId.videoId}`}
						title='youtube'
					></iframe>
				</Modal>
			) */}
		</>
	);
}
