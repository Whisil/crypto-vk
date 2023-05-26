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
  const { token, user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
        <MenuBtn text="Profile" icon="avatar" large />
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
            rHFRegister={register(`displayName`, {
              required: `Display name is required`,
              minLength: {
                value: 4,
                message: `Must be at least 4 characters long`,
              },
              maxLength: {
                value: 35,
                message: `Must be 35 characters or less`,
              },
            })}
            error={errors.displayName && `${errors.displayName.message}`}
          />
          <SettingsItem
            label="Username"
            inputName="username"
            initialValue={username}
            rHFRegister={register(`username`, {
              required: `Username name is required`,
              minLength: {
                value: 4,
                message: `Must be at least 4 characters long`,
              },
              maxLength: {
                value: 15,
                message: `Must be 15 characters or less`,
              },
            })}
            error={errors.username && `${errors.username.message}`}
          />
          <SettingsItem
            label="Website"
            inputName="websiteURL"
            initialValue={websiteURL}
            rHFRegister={register(`websiteURL`, {
              pattern: {
                value:
                  /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
                message: `Invalid URL`,
              },
            })}
            error={errors.websiteURL && `${errors.websiteURL.message}`}
          />
          <SettingsItem
            label="Bio"
            inputName="bio"
            initialValue={bio}
            rHFRegister={register(`bio`, {
              maxLength: {
                value: 100,
                message: `Must be 200 characters or less`,
              },
            })}
            error={errors.bio && `${errors.bio.message}`}
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
