import MenuBtn from '@/components/unknown/menuBtn';
import classNames from 'classnames';
import SettingsItem from '@/components/profile/settingsItem';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import AccentBtn from '@/components/unknown/accentBtn';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import styles from './styles.module.scss';
import { setUser } from '@/features/userSlice';

const Settings = () => {
  const { username, displayName, bio, websiteURL } = useAppSelector(
    (state) => state.user.user,
  );
  const { token } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm();

  const handleUpdateSettings = useCallback(
    async (data: FieldValues) => {
      const formData = new FormData();
      formData.append(`username`, data.username);
      formData.append(`displayName`, data.displayName);
      formData.append(`bannerURL`, data.bannerURL);
      formData.append(`avatarURL`, data.avatarURL);
      formData.append(`bio`, data.bio);
      formData.append(`websiteURL`, data.websiteURL);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/settings`, {
        method: `POST`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((user) => dispatch(setUser({ user, token })));
    },
    [token, dispatch],
  );

  return (
    <div className={classNames(styles.settingsContainer, `container`)}>
      <div className={styles.settingsMenu}>
        <MenuBtn text="Profile" icon="avatar" link="/" large />
      </div>

      <div className={styles.settings}>
        <form
          className={styles.settingsForm}
          onSubmit={handleSubmit(handleUpdateSettings)}
        >
          <SettingsItem
            label="Display Name"
            inputName="displayName"
            initialValue={displayName}
            rHFRegister={register}
          />
          <SettingsItem
            label="Username"
            inputName="username"
            initialValue={username}
            rHFRegister={register}
          />
          <SettingsItem
            label="Website"
            inputName="websiteURL"
            initialValue={websiteURL}
            rHFRegister={register}
          />
          <SettingsItem
            label="Bio"
            inputName="bio"
            initialValue={bio}
            rHFRegister={register}
          />

          <AccentBtn
            text="Save"
            containerClassName={styles.settingsFormBtnContainer}
            className={styles.settingsFormBtn}
          />
        </form>
      </div>
    </div>
  );
};

export default Settings;
