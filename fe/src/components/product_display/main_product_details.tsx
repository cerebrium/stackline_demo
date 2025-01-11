type ProductDisplayprops = {
  title: string;
  image: string;
  subtitle: string;
};

export const MainProductDetails: React.FC<ProductDisplayprops> = ({
  image,
  title,
  subtitle,
}) => {
  return (
    <section className="main_product_details">
      <img src={image} className="product_image" />
      <h3>{title}</h3>
      <h4>{subtitle}</h4>
    </section>
  );
};
