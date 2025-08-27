import { useParams } from "react-router-dom";
import {Error, Loader, SongCard} from '../components'
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import { useSelector } from "react-redux";
const Search = () => {
  const {searchTerm} = useParams()
  const {activeSong, isPlaying} = useSelector((state) => state.player)
  const {data, isFetching, error} = useGetSongsBySearchQuery(searchTerm)
  if (isFetching) return <Loader title="Loading.."/>
  if (error) {console.log(error.status) ; return <Error/>}
  if (!searchTerm) return <Error title="no search term entered"/>
  if(data.length == 0 || !data) return <Error title="no songs found."/>
  const songs = data
  console.log('songs',songs)
  return (

    <div className="flex flex-col">
        <div className='w-full flex justify-between items-center sm:flex-col flex-col mt-4 mb-10'>
            <h2 className='font-bold text-3xl text-white text-left mb-2'>Search Results for {searchTerm}</h2>
        </div>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
{songs?.map((song, i) => (
    <SongCard key={song.id} song={song} i={i} activeSong={activeSong} isPlaying={isPlaying} data={songs}/>
))}

        </div>
    </div>
  )
}

export default Search;
