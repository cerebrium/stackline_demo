import { useDispatch } from "react-redux";
import {
  sortableValues,
  sortStacklineProducts,
} from "../../features/products/productsSlics";
import { useState } from "react";

type TableHeaderProps = {
  header: string;
  header_data_name: sortableValues;
};

export const TableHeader: React.FC<TableHeaderProps> = ({
  header,
  header_data_name,
}) => {
  const [order, setOrder] = useState("asc");
  const dispatch = useDispatch();

  const handleClick = () => {
    if (order === "desc") {
      dispatch(sortStacklineProducts(["asc", header_data_name]));
      setOrder("asc");
      return;
    }

    dispatch(sortStacklineProducts(["desc", header_data_name]));
    setOrder(() => "desc");
  };

  return (
    <th className="table_header" onClick={handleClick} key={header}>
      {header}

      <svg
        className={`triangle_icon ${order === "asc" ? "triangle_down" : ""}`}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="16" height="16" id="icon-bound" fill="none" />
        <polygon points="8,5 13,10 3,10" />
      </svg>
    </th>
  );
};
