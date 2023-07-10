import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
import { adarshbalikaMedia1, bawraBuzzFeedMedia1, bawraBuzzFeedMedia2, bawraBuzzFeedMedia3, bawraBuzzFeedMedia4, bawraBuzzFeedMedia5, emilyFeedMedia1, emilyFeedMedia2, emilyFeedMedia3, johndoeFeedMedia1 } from "./feedmedis";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [

  {
    _id: uuid(),
    content:"",
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    username: "adarshbalika",
    createdAt: "2023-06-09T10:55:01+18:30",
    updatedAt: formatDate(),
    imageUrl:adarshbalikaMedia1,
  },

  {
    _id: uuid(),
    content:
      "",
    likes: {
      likeCount: 7,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    username: "johndoe",
    createdAt: "2022-07-10T10:55:01+18:30",
    updatedAt: formatDate(),
    imageUrl: johndoeFeedMedia1,
  },

  {
    _id: uuid(),
    content:
      "La Vie Est Belle..",
    likes: {
      likeCount: 8,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    username: "Emily",
    createdAt: "2022-07-01T10:55:01+18:30",
    updatedAt: formatDate(),
    imageUrl:emilyFeedMedia1
  },
  {
    _id: uuid(),
    content:
     "La Vie Continue.." ,
    likes: {
      likeCount:14,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    username: "Emily",
    createdAt: "2023-06-12T10:55:01+18:30",
    updatedAt: formatDate(),
    imageUrl:emilyFeedMedia2,
  },
  {
    _id: uuid(),
    content:
      "Je Reve D'un Ete..",
    likes: {
      likeCount: 20,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    username: "Emily",
    createdAt: "2022-03-15T10:55:01+18:30",
    updatedAt: formatDate(),
    imageUrl:emilyFeedMedia3,
  },


  {
    _id: uuid(),
    content:
      "The famous Temple of Lord Shiva in the form of Gaur Bhairav.",
    likes: {
      likeCount: 15,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    username: "bawraBuzz",
    createdAt: "2022-02-16T10:55:01+18:30",
    updatedAt: formatDate(),
    imageUrl: bawraBuzzFeedMedia1,
  },
  {
    _id: uuid(),
    content:
      "The littlest bird sing the prettiest songs.",
    likes: {
      likeCount: 18,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    username: "bawraBuzz",
    createdAt: "2023-01-01T10:55:01+18:30",
    updatedAt: formatDate(),
    imageUrl: bawraBuzzFeedMedia2
  },
  
  {
    _id: uuid(),
    content:
      "Our dreams will touch the sky, if we let them.",
    likes: {
      likeCount: 20,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    username: "bawraBuzz",
    createdAt: "2022-12-25T10:55:01+18:30",
    updatedAt: formatDate(),
    imageUrl:  bawraBuzzFeedMedia3,
  },

  {
    _id: uuid(),
    content:
      "Breathtaking views from the hills  🌄",
    likes: {
      likeCount: 25,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    username: "bawraBuzz",
    createdAt: "2022-12-26T10:55:01+18:30",
    updatedAt: formatDate(),
    imageUrl: bawraBuzzFeedMedia4,
  },

  {
    _id: uuid(),
    content:
      "Finding peace in the beauty of Nature 🌲",
    likes: {
      likeCount: 22,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    username: "bawraBuzz",
    createdAt: "2023-01-02T10:55:01+18:30",
    updatedAt: formatDate(),
    imageUrl:  bawraBuzzFeedMedia5,
  },
];
