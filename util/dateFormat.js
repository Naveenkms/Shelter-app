import { format } from "date-fns";

const dateFormat = (startDate, endDate) => {
    return  `${format(
        new Date(startDate),
        "dd MMMM yy"
      )} - ${format(new Date(endDate), "dd MMMM yy")}`;

}

export default dateFormat;

