import { DetailOffer } from '../../types/offer';

type GalleryOfferProps = {
  offer: DetailOffer;
}

function GalleryOffer({offer}: GalleryOfferProps) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {offer.images.map((item, i) => {
          const keyValue = `${item}-${i}`;
          return (
            <div className="offer__image-wrapper" key={keyValue}>
              <img className="offer__image" src={item} alt="Photo studio" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GalleryOffer;
