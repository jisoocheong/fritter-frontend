import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Like} from '../like/model';

// Update this if you add a property to the Freet type!
type LikeResponse = {
  _id: string;
  author: string;

};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Freet object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Like>} freet - A freet
 * @returns {FreetResponse} - The freet object formatted for the frontend
 */
 const constructLikeResponse = (user: HydratedDocument<Like>): LikeResponse => {
    const userCopy: Like = {
      ...user.toObject({
        versionKey: false // Cosmetics; prevents returning of __v property
      })
    };
    return {
      ...userCopy,
      _id: userCopy._id.toString(),
      author: user._id.toString()
    };
  };
export {
  constructLikeResponse
};
