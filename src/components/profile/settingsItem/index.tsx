import styles from './styles.module.scss';

interface SettingsItemsProps {
  label: string;
  inputName: string;
  ref?: React.Ref<HTMLInputElement>;
}

const SettingsItem = ({ label, inputName, ref }: SettingsItemsProps) => {
  return (
    <label>
      <span>{label}</span>
      <input type="text" name={inputName} ref={ref} />
    </label>
  );
};

export default SettingsItem;
