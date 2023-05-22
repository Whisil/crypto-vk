import styles from './styles.module.scss';

interface SettingsItemsProps {
  label: string;
  inputName: string;
  initialValue: string | null;
  ref?: React.Ref<HTMLInputElement>;
}

const SettingsItem = ({
  label,
  inputName,
  initialValue,
  ref,
}: SettingsItemsProps) => {
  const placeholder =
    inputName === `displayName`
      ? `Joe Biden`
      : inputName === `username`
      ? `joe_biden`
      : inputName === `website`
      ? `https://cryptovk.xyz/`
      : inputName === `bio`
      ? `Bio`
      : ``;

  return (
    <label className={styles.label}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.input}
        type="text"
        name={inputName}
        ref={ref}
        defaultValue={initialValue ? initialValue : ``}
        placeholder={placeholder}
      />
    </label>
  );
};

export default SettingsItem;
