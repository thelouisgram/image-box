import {useDispatch} from 'react-redux'
import { fetchPhotos } from '../../store/stateAction'

const Error = () => {
    const dispatch = useDispatch()
  return (
    <div>
      An Error occurred
      <button onClick={()=> dispatch(fetchPhotos())}></button>
    </div>
  )
}

export default Error
