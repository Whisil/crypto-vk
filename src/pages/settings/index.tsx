import MenuBtn from '@/components/unknown/menuBtn';

import styles from './styles.module.scss';
import classNames from 'classnames';
import SettingsItem from '@/components/profile/settingsItem';

const Settings = () => {
  return (
    <div className={classNames(styles.settingsContainer, `container`)}>
      <div className={styles.settingsMenu}>
        <MenuBtn text="Profile" icon="avatar" link="/" large />
      </div>

      <div className={styles.settings}>
        <form>
          <SettingsItem label="Name" inputName="name" />
        </form>
      </div>
    </div>
  );
};

export default Settings;
