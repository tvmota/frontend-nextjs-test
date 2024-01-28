/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import { GetStaticProps, InferGetStaticPropsType } from "next";

import styles from "@/styles/lista.module.css";
import { ICity } from "@/types/city.d";

export const getStaticProps = (async (context) => {
  let cities: ICity[] = [
    {
      id: new Date().getTime().toString(),
      name: "São Paulo",
    },
  ];
  try {
    const response = await fetch(`${process.env.URL}/api/cities/10`);
    cities = await response.json();
  } catch (err) {
    console.error("There was a problem fetching the data:", err);
  } finally {
    return {
      props: {
        list: cities,
      },
      revalidate: 10,
    };
  }
}) satisfies GetStaticProps<{
  list: ICity[];
}>;

export default function Lista({
  list,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Lista de cidades</h2>

        <div data-list-container>
          {list.map((city) => (
            <div data-list-item key={city.id}>
              {city.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
