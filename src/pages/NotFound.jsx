import {Player} from '@lottiefiles/react-lottie-player'
import NOTJSON from '../assets/lottie/codes/network.json'
import { useNavigate } from 'react-router-dom'
export default function NotFound() {
    const navigate = useNavigate()
    return(
        <div className="w-screen min-h-screen pt-4 pb-8 flex flex-col justify-center items-center bg-blue-700">
             <Player
            src={NOTJSON}
            loop
            autoplay
            speed={2}
            style={{ height: "250px", width: "250px" }}
          />
          <h1 className="text-white text-2xl font-bold font-serif cursor-pointer text-center" onClick={()=>{navigate('/home')}}>Page Not Found Want to Redirect?</h1>
        </div>
    )
}
