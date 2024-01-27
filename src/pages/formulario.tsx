/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */
import { UserForm } from "@/components/UserForm";
import styles from "@/styles/formulario.module.css";

export default function Form() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <UserForm />
      </div>
    </div>
  );
}
