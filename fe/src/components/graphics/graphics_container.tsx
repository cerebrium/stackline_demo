import { StacklineSales } from "../../services/products/types";
import { Graph } from "./graph";
import { StacklineTable } from "./table";

interface GraphicsContainerProps {
  sales_data: StacklineSales;
  shouldRerenderTable: boolean;
}

/**
 *
 * Using the d3 library make the line chart
 * Since d3 is a direct dom element, it needs
 * to be a ref.
 *
 */
export const GraphicsContainer: React.FC<GraphicsContainerProps> = ({
  sales_data,
  shouldRerenderTable,
}) => {
  return (
    <section className="graphics_container">
      <Graph
        sales_data={sales_data}
        shouldRerenderTable={shouldRerenderTable}
      />
      <StacklineTable sales_data={sales_data} />
    </section>
  );
};
