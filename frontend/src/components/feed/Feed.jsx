import { useDispatch, useSelector } from "react-redux"
import apiCall from "../../utils/axiosInstance"
import { addFeed } from "../../store/feedSlice"
import { useState,useEffect } from "react"
import UserCard from "./UserCard"

const Feed = () => {
    const [error , setError] = useState()

    const feed = useSelector(store=>store.feed)
    const dispatch = useDispatch()
    
    useEffect(()=>{
      if(feed.length>0) return ;


      const getFeed = async()=>{
        try {
          const res = await apiCall("/user/feed?page=1&limit=10")
          dispatch(addFeed(res.data.feedUsers))
        } catch (err) {
          setError(err?.response?.data?.error ||"something went wrong")
          console.dir(err)
        }
      }

      getFeed();
    },[])

  return (
    <div className="m-3 p-2 flex justify-center ">
      {error}
     {feed && <UserCard user={feed[0]} />}
    </div>
  )
}

export default Feed