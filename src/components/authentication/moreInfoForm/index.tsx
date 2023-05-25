import { useAppDispatch, useAppSelector } from '@/app/hooks';
import AccentBtn from '@/components/unknown/accentBtn';
import { setUser } from '@/features/userSlice';
import classNames from 'classnames';
import { FieldValues, useForm } from 'react-hook-form';

import styles from './styles.module.scss';

const MoreInfoForm = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const {
    register,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();

  const handleSignUp = async (data: FieldValues) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: `POST`,
          headers: { 'Content-Type': `application/json` },
          body: JSON.stringify({
            ethAddress: user.ethAddress,
            username: data.username,
            displayName: data.displayName,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const userInfo = await response.json();
      dispatch(setUser(userInfo));
    } catch (err: any) {
      setError(`username`, {
        type: `manual`,
        message: err.message,
      });
    }
  };

  return (
    <>
      <h1 className={styles.heading}>Just a bit more</h1>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <label htmlFor="displayName" className={styles.inputLabel}>
          <span className={styles.labelText}>Display name</span>
          <input
            id="displayName"
            type="text"
            className={classNames(
              styles.input,
              errors.displayName && styles.errorBorder,
            )}
            placeholder="Joe Biden"
            autoComplete="off"
            {...register(`displayName`, {
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
          />
          {errors.displayName ? (
            <span
              className={styles.errorLabel}
            >{`${errors.displayName.message}`}</span>
          ) : null}
        </label>

        <label htmlFor="username" className={styles.inputLabel}>
          <span className={styles.labelText}>Username</span>
          <input
            id="username"
            type="text"
            className={classNames(
              styles.input,
              errors.username && styles.errorBorder,
            )}
            placeholder="JoeBiden322"
            autoComplete="off"
            {...register(`username`, {
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
          />
          {errors.username ? (
            <span
              className={styles.errorLabel}
            >{`${errors.username.message}`}</span>
          ) : null}
        </label>

        <div className={!isValid ? styles.submitBtnDisabled : ``}>
          <AccentBtn
            text="Sign me up!"
            className={styles.accentBtn}
            containerClassName={styles.accentBtnContainer}
          />
        </div>
      </form>
    </>
  );
};

export default MoreInfoForm;
