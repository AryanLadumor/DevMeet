import { useDispatch, useSelector } from "react-redux"
import apiCall from "../../utils/axiosInstance"
import { addFeed } from "../../store/feedSlice"
import { useState,useEffect } from "react"
import UserCard from "./UserCard"

const Feed = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    if (feed.length > 0) return;

    const getFeed = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiCall("/user/feed?page=1&limit=10");
        dispatch(addFeed(res.data.feedUsers));
      } catch (err) {
        setError(err?.response?.data?.error || "Something went wrong.");
        console.dir(err);
      } finally {
        setLoading(false);
      }
    };

    getFeed();
  }, [dispatch, feed.length]);

  if (loading) {
    return (
      <div className="w-full flex justify-center px-2 py-4">
        <div
          className="card w-full max-w-sm bg-base-200 border border-base-300 shadow-2xl overflow-hidden shrink-0"
          style={{ height: "540px" }}
        >
          <div className="h-1/2 w-full bg-base-300 skeleton rounded-none" />
          <div className="card-body p-5 flex flex-col justify-between h-1/2 bg-base-200">
            <div className="space-y-3">
              <div className="h-6 w-3/4 bg-base-300 skeleton rounded-lg" />
              <div className="h-4 w-full bg-base-300 skeleton rounded-lg" />
              <div className="h-4 w-5/6 bg-base-300 skeleton rounded-lg" />
            </div>
            <div className="flex gap-3 mt-4 pt-2 border-t border-base-300/40">
              <div className="h-12 flex-1 bg-base-300 skeleton rounded-xl" />
              <div className="h-12 flex-1 bg-base-300 skeleton rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (feed.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[50vh] w-full max-w-md mx-auto px-4 py-8 animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center shadow-lg border border-base-300 mb-6 text-4xl" aria-hidden="true">
          ✨
        </div>
        <h3 className="text-2xl font-serif font-black text-base-content">No More Profiles</h3>
        <p className="text-sm text-base-content/60 mt-3 leading-relaxed">
          You've matched or reviewed all active developer portfolios in your area. Check back later to see who is coding nearby!
        </p>
      </div>
    );
  }

  return (
    <div className="m-3 p-2 flex justify-center">
      {error && (
        <div className="alert alert-error bg-error/10 border-error/20 text-error text-sm rounded-xl py-2.5 px-4 mb-4 flex items-start gap-2" role="alert">
          <span>{error}</span>
        </div>
      )}
      {feed && <UserCard key={feed[0]._id} user={feed[0]} />}
    </div>
  );
};

export default Feed