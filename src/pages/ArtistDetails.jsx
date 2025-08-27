import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs, SongBar } from "../components";
import { useGetSongDetailsQuery, useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
const ArtistDetails = () => {
    const {id: artistId} = useParams()
    const {isPlaying, activeSong} = useSelector((state) => state.player)
    // const {data: songData, isFetching, error} = useGetSongDetailsQuery(songid)
    const {data: artistData, isFetching, error} = useGetArtistDetailsQuery(artistId)
    const songs = artistData?.data
    // const {data:songData} = useGetSongDetailsQuery()
    if (isFetching) return <Loader title="Loading artist details.."/>
    if (error) return <Error/>
    console.log('songs of this artist: ', artistData)
    console.log('artistDataLength ', artistData?.data?.length)

    const dispatch = useDispatch()
      const handlePauseClick = () => {
        dispatch(playPause(false))
        console.log('pause')
      }
      const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({song, songs, i}))
    dispatch(playPause(true))
    console.log('play')
      }
    return (
        <div className="flex flex-col">
            <DetailsHeader artistId ={artistId} artistData={artistData}/>
            <div className="mb-10">
                {/* <h2 className="text-white text-3xl font-bold"></h2> */}
                <div className="mt-5">
                <RelatedSongs data={Object.values(artistData)} artistId={artistId} />
                </div>
            </div>
        </div>
    )
}

export default ArtistDetails;
