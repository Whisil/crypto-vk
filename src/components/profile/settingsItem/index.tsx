import { UseFormRegister } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import styles from './styles.module.scss';

interface SettingsItemsProps {
  label: string;
  inputName: string;
  initialValue: string | null;
  rHFRegister: UseFormRegister<FieldValues>;
}

const SettingsItem = ({
  label,
  inputName,
  initialValue,
  rHFRegister,
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
      {inputName === `bio` ? (
        <textarea
          className={styles.textarea}
          defaultValue={initialValue ? initialValue : ``}
          placeholder={placeholder}
          {...rHFRegister(inputName)}
        />
      ) : (
        <input
          className={styles.input}
          type="text"
          defaultValue={initialValue ? initialValue : ``}
          placeholder={placeholder}
          {...rHFRegister(inputName)}
        />
      )}
    </label>
  );
};

export default SettingsItem;
