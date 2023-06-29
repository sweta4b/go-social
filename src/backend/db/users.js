import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshbalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio1:"It's never too late. Start to code today!.",
    bio2:"",
    displayProfile:"https://res.cloudinary.com/da5x335p3/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1687947257/Avatar/lovepik-girl-avatar-png-image_401573261_wh1200_tjdo0a.png",
  },
  {
    _id: uuid(),
    firstName: "Jone",
    lastName: "Dae",
    username: "shubhamsoni",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio1:"Hey Developers..",
    bio2:"Let's Code..",
    displayProfile:"https://res.cloudinary.com/da5x335p3/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1687947209/Avatar/cute-boy-avatar-illustration_637684-30_giztmz.jpg"
  },
  {
    _id: uuid(),
    firstName: "Bawra ",
    lastName: "Buzz",
    username: "bawraBuzz",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio1:"Freezing memories with my camera 📷❤️",
    bio2:"Photography is my passion, my escape, my art",
    displayProfile:"https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
  }
];
