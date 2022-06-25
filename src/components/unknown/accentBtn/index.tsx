
import styles from './styles.module.scss';

interface Props{
    text: string;
}

const AccentBtn = ({ text }: Props) => {
    return(
        <div className={styles.btn} >
            <span>{text}</span>
        </div>
    )
}

export default AccentBtn;