import AccentBtn from '@/components/unknown/accentBtn';
import RippleBtn from '@/components/unknown/rippleBtn';
import { useMoralis } from 'react-moralis';
import classNames from 'classnames';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';

const MoreInfoForm = () => {
  const { setUserData } = useMoralis();

  const formik = useFormik({
    initialValues: {
      username: ``,
      displayName: ``,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, `Must be 15 characters or less`)
        .min(4, `Must be at least 4 characters long`)
        .strict()
        .trim(`Don't start or end with a white-space`)
        .matches(
          /^[a-zA-Z0-9_]+$/,
          `You can only use English letters, numbers and underscores`,
        )
        .required(`Required`),
      displayName: Yup.string()
        .max(35, `Must be 35 characters or less`)
        .min(4, `Must be at least 4 characters long`)
        .strict()
        .trim(`Don't start or end with a white-space`)
        .matches(
          /^([\u0400-\u052Fa-zA-Z0-9_,.-]\s?)+$/,
          `You can only use letters, numbers, dots, commas and underscores`,
        )
        .required(`Required`),
    }),
    onSubmit: (values) => {
      setUserData({
        username: values.username,
        displayName: values.displayName,
      });
    },
  });

  return (
    <>
      <h1 className={styles.heading}>Just a bit more</h1>
      <label htmlFor="displayName" className={styles.inputLabel}>
        <span className={styles.labelText}>Display name</span>
        <input
          id="displayName"
          name="displayName"
          type="text"
          className={classNames(
            styles.input,
            formik.touched.displayName &&
              formik.errors.displayName &&
              styles.errorBorder,
          )}
          placeholder="The one, who knocks"
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.displayName}
        />
        {formik.touched.displayName && formik.errors.displayName ? (
          <span className={styles.errorLabel}>{formik.errors.displayName}</span>
        ) : null}
      </label>

      <label htmlFor="username" className={styles.inputLabel}>
        <span className={styles.labelText}>Username</span>
        <input
          id="username"
          name="username"
          type="text"
          className={classNames(
            styles.input,
            formik.touched.username &&
              formik.errors.username &&
              styles.errorBorder,
          )}
          placeholder="theOne_whoKnocks13"
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <span className={styles.errorLabel}>{formik.errors.username}</span>
        ) : null}
      </label>

      <div
        className={!formik.isValid ? styles.submitBtnDisabled : ``}
        onClick={formik.handleSubmit as any}
      >
        <RippleBtn variant="accent">
          <AccentBtn text="Sign me up!" className={styles.accentBtn} />
        </RippleBtn>
      </div>
    </>
  );
};

export default MoreInfoForm;
