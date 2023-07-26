import Review from '../review/review';
import { Reviews } from '../../types/review';

type ReviewListProps = {
  reviews: Reviews;
};

function ReviewList({reviews}: ReviewListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review
            key={review.id}
            {...review}
          />)
        )}
      </ul>
    </>
  );
}

export default ReviewList;
