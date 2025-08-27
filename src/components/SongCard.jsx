import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
const SongCard = ({key, song, i, activeSong, isPlaying, data}) => {
  const dispatch = useDispatch()
  const handlePauseClick = () => {
    dispatch(playPause(false))
    console.log('pause')
  }
  const handlePlayClick = () => {
// CAKE / SELECTORS FOR PIECES OF CAKE - DISPATCH FOR MAKING CHANGES TO THAT CAKE
//EX DISPATCH(ADD CHOCO DRESSING) DISPATCH(ADD CHOCO POWDER)
dispatch(setActiveSong({song, data, i}))
// console.log(`song: ${song} data: ${data}`)
dispatch(playPause(true))
console.log('play')
  }
  // console.log(activeSong?.attributes?.name)
  return (
  <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <div className="relative w-full h-56 group">
      
      <div className={`absolute inset-0  justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.attributes?.name === song.attributes.name ? 'flex bg-black bg-opacity-70': 'hidden'}`}>
        <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePause={handlePauseClick} handlePlay = {handlePlayClick}/>

      </div>
      <img alt="song-img" src={song.attributes.artwork.url}/>

    </div>
    <div className="mt-4 flex flex-col">
      <p className="font-semibold text-xl text-white truncate">
        <Link to={`/songs/${song?.id}`}>{song.attributes.name}</Link>
      </p>
      <p className="text-lg trucate text-gray-300 mt-1">
        <Link to={`/songs/${song?.relationships.artists.data[0].id}`}>{song.attributes.artistName}</Link>
      </p>

    </div>


  </div>
  )
};

export default SongCard;

//52:00
