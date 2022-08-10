import MaticIcon from '@/public/images/icons/matic.svg';

import styles from './styles.module.scss';

interface MenuNftCardProps {
  image: string;
  price: number;
}

const MenuNftCard = ({ image, price }: MenuNftCardProps) => {
  return (
    <div className={styles.card} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.price}>
        <MaticIcon />
        <span className={styles.priceNumber}>{price}</span>
      </div>
    </div>
  );
};

export default MenuNftCard;
