import { format } from "date-fns";
import { useEffect, useState } from "react";
import dateFormat from "../util/dateFormat";
const SearchInputDisplay = ({ query }) => {
  const [queryIsEmpty, setQueryIsEmpty] = useState(true);               
  const [formattedDate, setFormattedDate] = useState("");
  const { searchInput, noOfGuests, startDate, endDate } = query;

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      setFormattedDate(dateFormat(startDate, endDate));

      setQueryIsEmpty(false);
    }
  }, []);
  return (
    <>
      {!queryIsEmpty && (
        <div>
          <p className="text-sm">
            {`${formattedDate} stays for ${noOfGuests} guests`}
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-4">
            {searchInput && `Stays in ${searchInput}`}
          </h1>
        </div>
      )}
    </>
  );
};

export default SearchInputDisplay;
