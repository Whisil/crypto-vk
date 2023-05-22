import MenuBtn from '@/components/unknown/menuBtn';

import styles from './styles.module.scss';
import classNames from 'classnames';
import SettingsItem from '@/components/profile/settingsItem';
import { useAppSelector } from '@/app/hooks';

const Settings = () => {
  const { username, displayName, bio, websiteURL } = useAppSelector(
    (state) => state.user.user,
  );

  return (
    <div className={classNames(styles.settingsContainer, `container`)}>
      <div className={styles.settingsMenu}>
        <MenuBtn text="Profile" icon="avatar" link="/" large />
      </div>

      <div className={styles.settings}>
        <form className={styles.settingsForm}>
          <SettingsItem
            label="Display Name"
            inputName="displayName"
            initialValue={displayName}
          />
          <SettingsItem
            label="Username"
            inputName="username"
            initialValue={username}
          />
          <SettingsItem
            label="Website"
            inputName="website"
            initialValue={websiteURL}
          />
          <SettingsItem label="Bio" inputName="bio" initialValue={bio} />
        </form>
      </div>
    </div>
  );
};

export default Settings;
