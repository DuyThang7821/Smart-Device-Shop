import icons from './icons';
const {AiOutlineStar, AiFillStar} = icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');
export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (number, size) =>{
    if (!Number(number)) return
    const stars = [];
    for (let i = 0; i < +number; i++) stars.push(<AiFillStar color='orange' size={size || 16} />);
    for (let i = 5; i > +number; i--) stars.push(<AiOutlineStar color='orange' size={size || 16} />);
    return stars;
}