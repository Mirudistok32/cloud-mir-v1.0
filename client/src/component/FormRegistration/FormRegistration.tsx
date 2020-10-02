import React from 'react'
import s from './FormRegistration.module.scss'
import * as Yup from 'yup'
import { FormikConfig, useFormik } from 'formik'

export type FormRegistrationType = {
    email: string
    password: string
}
type PropsType = {
    onSubmit: (values: FormRegistrationType) => void
}

export const FormRegistration: React.FC<PropsType> = React.memo((props) => {

    const { onSubmit } = props

    const validationSchema = Yup.object({
        email: Yup
            .string()
            .required()
            .email()
            .max(60, "Email not should be more than 60 symbols"),
        password: Yup
            .string()
            .required()
            .min(4, "Password not should be less than 4 symbols")
            .max(45, "Password not should be more than 45 symbols"),
    });


    const formikConfig: FormikConfig<FormRegistrationType> = {
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
            resetForm()
        },
        validationSchema
    }

    const formik = useFormik(formikConfig)

    return (
        <form className={s.form} onSubmit={formik.handleSubmit}>
            <span className={s.form__title}>Авторизация</span>

            <div className={s.form__row}>
                <label className={s.form__email}>
                    <span className={s['form__row-title']}>Email</span>
                    <input
                        className={s['form__row-input']}
                        type="text"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {
                        formik.errors.email && <span className={s['form__row-error']}>{formik.errors.email}</span>
                    }
                </label>
            </div>

            <div className={s.form__row}>
                <label className={s.form__password}>
                    <span className={s['form__row-title']}>Password</span>
                    <input
                        className={s['form__row-input']}
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {
                        formik.errors.password && <span className={s['form__row-error']}>{formik.errors.password}</span>
                    }
                </label>
            </div>
            <button className={s.form__btn} type="submit">Регистрация</button>
        </form >
    )
})
