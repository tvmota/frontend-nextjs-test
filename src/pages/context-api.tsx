/**
 * Context Api
 *
 * - Criar um contexto para exibir mensagens de sucesso e erro
 * - Criar um componente para exibir as mensagens
 * - Criar um hook para disparar e consumir as mensagens
 * - Disparar as mensagens a partir dos botões abaixo
 */

import styles from "@/styles/context-api.module.css";
import { useToast } from "@/hooks/useToast";

export default function ContextApi() {
  const toast = useToast();

  function handleSuccessButtonClick() {
    toast.success("Method: handleSuccessButtonClick not implemented");
  }

  function handleErrorButtonClick() {
    toast.error("Method: handleErrorButtonClick not implemented", 5000);
  }

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={handleSuccessButtonClick}>
          Disparar mensagem de sucesso
        </button>
        <button type="button" onClick={handleErrorButtonClick}>
          Disparar mensagem de erro
        </button>
      </div>
    </>
  );
}
