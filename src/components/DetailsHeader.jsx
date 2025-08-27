import {Link} from 'react-router-dom'
import artistPics from '../assets/artistPics.json'
const DetailsHeader = ({artistId, artistData, songData}) => {
  if (!songData) console.log('artistdata', artistData)
  const image = artistData? artistPics?.find((pic) => pic.id == artistData[0]?.relationships?.artists?.data[0].id): songData?.attributes?.artwork.url
  // const artistImage = artistPics?.find((pic) => pic.id == artistData[0]?.relationships?.artists?.data[0].id)
console.log(artistData)
  console.log("artistId?", artistId)
  console.log("image:",image)
  // console.log("artistImagge", artistImage)
  return (
  <div className='relative w-full flex flex-col'>
    <div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28'>
      <div className='absolute inset-0 flex items-center'>
        <img className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black' alt="art" src={artistData? image.url: image}/>
      <div className='ml-5'>
        <p className='font-bold sm-text-3xl text-xl text-white'>{artistId? artistData[0]?.attributes?.artistName: songData?.attributes?.name}</p>
        {!artistId && <Link to={`/artists/${songData?.relationships?.artists?.data[0].id}`}><p className='text-base text-gray-400 mt-2 '>{songData?.attributes?.artistName}</p></Link>}
        <p className='text-base text-gray-400 mt-2'>{artistId ? artistData[0]?.attributes?.genreNames[0]: songData?.attributes?.genreNames?.map((genre) => '#' + genre + ' ')}</p>
      </div>
      <div className='w-full sm:h-44 h-24'>

      </div>
      </div>
    </div>
</div>
)
}

export default DetailsHeader;
