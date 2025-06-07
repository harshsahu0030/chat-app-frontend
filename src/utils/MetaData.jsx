import { Helmet } from "react-helmet-async";
import LOGO from "../assets/logo with name.jpg";

const MetaData = ({ title, description, keywords, url, metaTitle }) => {
  return (
    <Helmet>
      {/* Title & Meta */}
      <meta name="robots" content="index, follow" />
      <title>{title ? title : "Shreeji Tech Solutions"}</title>
      <meta
        name="title"
        content={metaTitle ? metaTitle : "Shreeji Tech Solutions"}
      />
      <meta
        name="description"
        content={description ? description.toLowerCase() : ""}
      />
      <meta name="keywords" content={keywords ? keywords.toLowerCase() : ""} />

      <link ref="canonical" href={url} />

      {/* Open Graph */}
      <meta
        property="og:title"
        content={title ? title : "Shreeji Tech Solutions"}
      />
      <meta
        property="og:description"
        content={description ? description.toLowerCase() : ""}
      />
      <meta property="og:image" content={LOGO} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Other global tags (optional) */}
      <meta charset="UTF-8"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Load Google Analytics library asynchronously */}

      {/* Inline script to initialize GA */}
    </Helmet>
  );
};

export default MetaData;
