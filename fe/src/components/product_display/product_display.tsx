import { MainProductDetails } from "./main_product_details";
import { ProductDetailsTags } from "./tags";

type ProductDisplayprops = {
  title: string;
  image: string;
  subtitle: string;
  tags: string[];
};

export const ProductDisplay: React.FC<ProductDisplayprops> = ({
  title,
  image,
  subtitle,
  tags,
}) => {
  return (
    <section className="product_container">
      <MainProductDetails title={title} image={image} subtitle={subtitle} />
      <ProductDetailsTags tags={tags} />
    </section>
  );
};
