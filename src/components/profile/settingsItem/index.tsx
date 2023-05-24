import { UseFormRegister } from 'react-hook-form';
import { FieldValues, UseFormRegisterReturn } from 'react-hook-form/dist/types';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface SettingsItemsProps {
  label: string;
  inputName: string;
  initialValue: string | null;
  rHFRegister: UseFormRegisterReturn;
  error?: string | undefined;
}

const SettingsItem = ({
  label,
  inputName,
  initialValue,
  rHFRegister,
  error,
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
    <label className={classNames(styles.label, error && styles.errorLabel)}>
      <span className={styles.label}>{label}</span>
      {inputName === `bio` ? (
        <textarea
          className={styles.textarea}
          defaultValue={initialValue ? initialValue : ``}
          placeholder={placeholder}
          {...rHFRegister}
        />
      ) : (
        <input
          className={styles.input}
          type="text"
          defaultValue={initialValue ? initialValue : ``}
          placeholder={placeholder}
          {...rHFRegister}
        />
      )}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
};

export default SettingsItem;
