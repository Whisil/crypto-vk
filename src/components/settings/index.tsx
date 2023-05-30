import MenuBtn from '@/components/unknown/menuBtn';
import classNames from 'classnames';
import SettingsInput from '@/components/settings/settingsInput';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import AccentBtn from '@/components/unknown/accentBtn';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import styles from './styles.module.scss';
import { setUser } from '@/features/userSlice';
import useMediaBlob from '@/hooks/useMediaBlob';

const SettingsScreen = () => {
  const { username, displayName, bio, websiteURL } = useAppSelector(
    (state) => state.user.user,
  );
  const { token, user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    reset,
  } = useForm();

  const { mediaURL, handleFileChange } = useMediaBlob();

  const handleUpdateSettings = useCallback(
    async (data: FieldValues) => {
      const formData = new FormData();
      formData.append(`username`, data.username);
      formData.append(`displayName`, data.displayName);
      if (data.banner && data.banner[0]) {
        formData.append(`file`, data.banner[0]);
      }
      if (user.bannerURL) {
        formData.append(`oldBanner`, user.bannerURL);
      }
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
    [token, dispatch, user.bannerURL],
  );

  const handleBannerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      if (files[0].size > 1024 * 1024 * 5) {
        reset({ banner: `` });
        setError(`banner`, {
          type: `manual`,
          message: `File size should be less than 5MB`,
        });
      } else {
        handleFileChange(e);
      }
    }
  };

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
          <SettingsInput
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
          <SettingsInput
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
          <SettingsInput
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
          <SettingsInput
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
          <img
            src={
              mediaURL
                ? mediaURL
                : user.bannerURL
                ? user.bannerURL
                : `/images/banner-placeholder.webp`
            }
            alt="profile banner"
            className={styles.banner}
          />
          <div className={styles.bannerInputContainer}>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .gif, .webp"
              className={styles.bannerInput}
              {...register(`banner`, {
                onChange: (e) => {
                  handleBannerInputChange(e);
                },
              })}
            />
          </div>
          {errors.bannerURL && (
            <span className={styles.error}>
              {errors.bannerURL.message as string}
            </span>
          )}
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

export default SettingsScreen;
