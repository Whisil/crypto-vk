import classNames from 'classnames';

import styles from './styles.module.scss';

interface Props{
    text: string;
    className?: string | boolean;
    onClick?: any;
}

const AccentBtn = ({ text, onClick, className }: Props) => {
    return(
        <div className={classNames(styles.btn, className)} onClick={onClick} >
            <span>{text}</span>
        </div>
    )
}

export default AccentBtn;