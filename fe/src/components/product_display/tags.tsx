type ProductDetailsTagsProps = {
  tags: string[];
};

export const ProductDetailsTags: React.FC<ProductDetailsTagsProps> = ({
  tags,
}) => {
  return (
    <section className="tags_container">
      {tags.map((tag) => {
        return <div className="tag_container">{tag}</div>;
      })}
    </section>
  );
};
