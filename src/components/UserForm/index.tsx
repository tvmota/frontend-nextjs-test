import { useForm } from "react-hook-form";
import { userSchema, TUserSchema } from "@/types/user.d";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./style.module.css";

export const UserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
  });

  const handleUserSubmit = async (frmData: TUserSchema) => {
    try {
      const userRequest = await fetch("/api/users/create", {
        method: "POST",
        body: JSON.stringify(frmData),
        headers: { "content-type": "application/json" },
      });
      const result = await userRequest.json();
      const { message = "Aconteceu um erro, tente novamente" } = result;

      alert(message);

      if (userRequest.ok) {
        reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className={styles.frm}
      noValidate
      onSubmit={handleSubmit(handleUserSubmit)}
    >
      <div className={styles.frm__field}>
        <input
          className={
            errors.name
              ? styles.frm__field__input__error
              : styles.frm__field__input
          }
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name ? (
          <span
            className={styles.frm__field__error_msg}
          >{`${errors.name.message}`}</span>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.frm__field}>
        <input
          className={
            errors.name
              ? styles.frm__field__input__error
              : styles.frm__field__input
          }
          type="email"
          placeholder="E-mail"
          {...register("email")}
        />
        {errors.email ? (
          <span
            className={styles.frm__field__error_msg}
          >{`${errors.email.message}`}</span>
        ) : (
          <></>
        )}
      </div>
      <button disabled={isSubmitting} type="submit" data-type="confirm">
        Enviar
      </button>
    </form>
  );
};
