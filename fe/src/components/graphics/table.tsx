import { type sortableValues } from "../../features/products/productsSlics";
import { StacklineSales } from "../../services/products/types";
import { add_commas_and_sign } from "./helpers";
import { TableHeader } from "./table_header";

type TableProps = {
  sales_data: StacklineSales;
};

const table_headers = [
  "WEEK ENDING",
  "RETAIL SALES",
  "WHOLESALE SALES",
  "UNITS SOLD",
  "RETAILER MARGIN",
];

const table_data_names = [
  "weekEnding",
  "retailSales",
  "wholesaleSales",
  "unitsSold",
  "retailerMargin",
];

export const StacklineTable: React.FC<TableProps> = ({ sales_data }) => {
  return (
    <section className="stackline_table">
      <table>
        <thead>
          <tr>
            {table_headers.map((header: string, idx) => {
              return (
                <TableHeader
                  header={header}
                  header_data_name={table_data_names[idx] as sortableValues}
                />
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sales_data.map((sale) => {
            return (
              <tr key={sale.weekEnding}>
                <td>{sale.weekEnding}</td>
                <td>{add_commas_and_sign(sale.retailSales)}</td>
                <td>{add_commas_and_sign(sale.wholesaleSales)}</td>
                <td>{sale.unitsSold}</td>
                <td>{add_commas_and_sign(sale.retailerMargin)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
