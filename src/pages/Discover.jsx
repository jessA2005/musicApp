import { useDispatch, useSelector } from 'react-redux';
import {Error, Loader, SongCard} from '../components';
import {genres} from '../assets/constants'
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';
/*
ex state
CAKE = {
CHOCO : MUSIC PLAYER FUNCTIONALITY
VANILLA SLICE : SHAZAM CORE FUNCTIONALITY

SELECTOR TO SELECT A PIECE OF THE CAKE
select piece of state
dispatch to modify state
dispatch action to store
const {} = useSelector((CAKE) => CAKE.VANILLA
}
*/
const Discover = () => {
const dispatch = useDispatch()
const {activeSong, isPlaying, genreListId} = useSelector((state) => state.player)
const {data, isFetching, error} = useGetSongsByGenreQuery(genreListId || 'all');
if (isFetching) return <Loader title="Loading Songs.."/>
if(error) return <Error/>
console.log(data);
const genreTitle = genres.find(({value}) => value == genreListId)?.title
console.log(genreTitle)
return (
    <div className="flex flex-col">
        <div className='w-full flex justify-between items-center sm:flex-col flex-col mt-4 mb-10'>
            <h2 className='font-bold text-3xl text-white text-left mb-2'>Discover {genreTitle? genreTitle: 'all'}</h2>
<select onChange={(e) => dispatch(selectGenreListId(e.target.value))} value={genreListId || 'all'} className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'>

{genres.map(genre => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
<option key="all" value="all">all</option>
</select>
        </div>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
{data?.map((song, i) => (
    <SongCard key={song.key} song={song} i={i} activeSong={activeSong} isPlaying={isPlaying} data={data}/>
))}

        </div>
    </div>
)};

export default Discover;
