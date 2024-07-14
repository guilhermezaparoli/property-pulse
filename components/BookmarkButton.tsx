import { Property } from "@/@types/PropertyTypes"
import { FaBookmark } from "react-icons/fa"


interface BookMarkButtonProps {
    property: Property
}
const BookmarkButton = ({property}: BookMarkButtonProps) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
    <FaBookmark className="mr-2"/> Bookmark Property
  </button>
  )
}

export default BookmarkButton
