import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import lyrics from '../mock/songLyrics'
const SongDetails = () => {
    const {songid} = useParams()
    const dispatch = useDispatch()
    const {isPlaying, activeSong} = useSelector((state) => state.player)
    const {data: songData, isFetching} = useGetSongDetailsQuery(songid)
    const songLyrics = lyrics.find((section) => section.id == songid)
    console.log('songdata ', songData)
    console.log('compare' , songLyrics)
    console.log("lyrics: ",songLyrics)
    console.log("isFetching: ",isFetching)
    return (
        <div className="flex flex-col">
            <DetailsHeader songData={songData}/>
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
                <div className="mt-5">
                {songLyrics?.text? songLyrics?.text.map((line, i) => (
                    <p className="text-gray-400 text-base my-1">{line}</p>
                )): <p className="text-gray-400 text-base my-1">Sorry, no lyrics found.</p>}
                </div>
            </div>
        </div>
    )
}

export default SongDetails;
