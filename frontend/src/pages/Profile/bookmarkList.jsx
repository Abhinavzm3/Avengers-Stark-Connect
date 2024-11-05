import { useSelector } from "react-redux";
import axios from "axios";
import { BookmarkPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { BOOK_MARK_END_POINT } from "@/lib/utils/constant";
import { Link } from "react-router-dom";
const BookMarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const { user } = useSelector((store) => store.auth);


  const deletHandler=async(job_id)=>{

    try {

        const response = await axios.post(`${BOOK_MARK_END_POINT}/remove`,{jobId:job_id,userId:user._id})

            setBookmarks(response.data.data)


        
    } catch (error) {
        console.log(error)
    }

  }
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.post(`${BOOK_MARK_END_POINT}/get`, { userId: user._id });
        setBookmarks(response.data.data);
      } catch (error) {
        console.log("Error fetching bookmarks:", error);
      }
    };

    fetchBook();
  }, [user._id]);

  return (
    <div>
        <div className="flex gap-5 mt-7 text-3xl items-center">        <BookmarkPlus />Bookmarked Jobs
        </div>
      {bookmarks.length > 0 ? (
        bookmarks.map((book) => (
          <div key={book._id} className="p-4 border-b border-gray-600  items-center">
            <h2 className="text-lg font-semibold">{book.title}</h2>
           <div className="flex gap-4 ml-10 text-center justify-center items-center"> <img src={book?.company?.logo} alt="logo" className="rounded-full w-10 "/>
            <p>{ book?.company.name}</p></div>
            <button className="ml-10 rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 shadow-lg transition duration-300 ease-in-out">
  <Link to={`/description/${book._id}`}>Get Details</Link>
</button>



            <button onClick={()=>{deletHandler(book._id)}} className="ml-10 rounded-lg bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 shadow-lg transition duration-300 ease-in-out">
  Remove
</button>



          </div>
        ))
      ) : (
        <p>No bookmarked jobs.</p>
      )}
    </div>
  );
};

export default BookMarkList;
