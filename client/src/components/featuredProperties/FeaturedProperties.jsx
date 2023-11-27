import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const fetchUrl = `/movies`;
  const { data, loading, error, reFetch } = useFetch(fetchUrl);
  console.log(`KMJ :: Search - URL: ${fetchUrl}`);
  console.log(`KMJ :: Search - data\n: ${JSON.stringify(data)}`);

  return (
    <div className="fp">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img className="fpImg" src={item.photos[0]} />
              <span className="fpName">{item.title}</span>
              <span className="fpCity">
                {item.certificate} || {item.duration} || {item.release_date}
              </span>
              <span className="fpPrice">${item.price}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
