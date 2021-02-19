import React from "react";

// REDUX IMPORTS //
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../redux/shop/shop.selectors";

// COMPONENT IMPORTS //
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

const ShopPage = ({ collections }) => (
  <div className="shop-page">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(ShopPage);
